const hre = require("hardhat");
const axios = require("axios");

// Configuration from environment or defaults
const API_URL = process.env.AI_API_URL || "https://ai.api.4everland.org/api/v1/chat/completions";
const API_KEY = process.env.AI_API_KEY || "fd44b063d8faf8b59dda6e668039d568";
const POLL_INTERVAL = 5000; // 5 seconds
const BATCH_SIZE = 10;

async function main() {
    const contractAddress = process.env.AI_ORACLE_ADDRESS;
    if (!contractAddress) {
        console.error("Error: AI_ORACLE_ADDRESS not set in .env");
        return;
    }

    // Get contract instance
    const AiOracle = await hre.ethers.getContractFactory("AiOracle");
    const aiOracle = AiOracle.attach(contractAddress);
    const [signer] = await hre.ethers.getSigners();

    console.log(`🤖 Oracle Node started`);
    console.log(`   Address: ${signer.address}`);
    console.log(`   Contract: ${contractAddress}`);
    console.log(`   API Endpoint: ${API_URL}`);

    // Track processed IDs to avoid duplicates in a single poll cycle
    // (Though the contract removes them from pending, good for safety)
    const processingIds = new Set();

    while (true) {
        try {
            // 1. Fetch pending requests
            // console.log("Polling for pending requests...");
            const requests = await aiOracle.getPendingRequests(0, BATCH_SIZE);

            if (requests.length > 0) {
                console.log(`Found ${requests.length} pending requests.`);
            }

            for (const req of requests) {
                const requestId = req.id;
                
                if (processingIds.has(requestId)) continue;
                processingIds.add(requestId);

                console.log(`\n[Request #${requestId}] Processing...`);
                console.log(`   Model: ${req.model}`);
                console.log(`   Prompt: "${req.prompt.substring(0, 50)}${req.prompt.length > 50 ? "..." : ""}"`);

                processRequest(aiOracle, req, requestId).finally(() => {
                    processingIds.delete(requestId);
                });
            }

        } catch (err) {
            console.error("Error in polling loop:", err.message);
        }

        // Wait before next poll
        await new Promise(resolve => setTimeout(resolve, POLL_INTERVAL));
    }
}

async function processRequest(aiOracle, req, requestId) {
    try {
        // 2. Call AI API
        const completion = await callAiApi(req.model, req.prompt);
        console.log(`   AI Response: "${completion.substring(0, 50)}"...`);

        // 3. Encode Response
        const encodedData = encodeResponse(completion, req.responseAbi);
        
        // 4. Fulfill on-chain
        console.log(`   Submitting transaction...`);
        const tx = await aiOracle.fulfill(requestId, encodedData);
        await tx.wait();
        console.log(`   ✅ Request #${requestId} fulfilled. Tx: ${tx.hash}`);

    } catch (error) {
        console.error(`   ❌ Failed to process request #${requestId}:`, error.message);
        // Optional: You could implement a 'fail' method on contract to mark it as failed/refund
    }
}

async function callAiApi(model, prompt) {
    try {
        const response = await axios.post(
            API_URL,
            {
                model: model,
                messages: [{ role: "user", content: prompt }],
                // max_tokens: 1024, // Optional: limit output
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${API_KEY}`
                }
            }
        );

        if (response.data && response.data.choices && response.data.choices.length > 0) {
            return response.data.choices[0].message.content;
        } else {
            throw new Error("Invalid API response format");
        }
    } catch (error) {
        if (error.response) {
            throw new Error(`API Status ${error.response.status}: ${JSON.stringify(error.response.data)}`);
        }
        throw error;
    }
}

function encodeResponse(responseText, responseAbi) {
    const coder = hre.ethers.AbiCoder.defaultAbiCoder();
    
    // Simple Heuristic: 
    // If ABI is just "string", return the text directly.
    // If ABI has multiple types (e.g., "string, uint256"), assume the LLM returned JSON.
    
    const types = responseAbi.split(",").map(t => t.trim());
    
    if (types.length === 1 && types[0] === "string") {
        return coder.encode(["string"], [responseText]);
    }

    // Try parsing JSON for complex types
    try {
        // Clean up markdown code blocks if present (common in LLM output)
        const jsonStr = responseText.replace(/```json\n|\n```/g, "").replace(/```/g, "");
        const parsed = JSON.parse(jsonStr);
        
        // Expecting parsed to be an array of values matching the ABI order
        // OR an object. If object, this simple script might fail unless we map keys.
        // Let's assume the prompt asked for an array or we try to map values.
        
        let values = [];
        if (Array.isArray(parsed)) {
            values = parsed;
        } else if (typeof parsed === 'object') {
            // Naive object-to-values: assume object keys are irrelevant and just take values? 
            // No, that's risky. Let's assume the values are just [responseText] if parsing fails/is complex
            // but for "string, uint256", we really need specific extraction.
            // For this script, let's assume the LLM returns an array [summary, score]
            values = Object.values(parsed);
        } else {
            values = [parsed];
        }

        return coder.encode(types, values);

    } catch (e) {
        console.warn(`   ⚠️ Could not parse JSON for complex ABI "${responseAbi}". Falling back to string encoding if compatible.`);
        // Fallback: If ABI is (string), we are good. If not, this will likely fail.
        // For the demo purpose, we might just try to encode the whole string as the first argument 
        // and defaults for the rest, or just fail.
        
        if (types.length > 0 && types[0] === "string") {
            const defaults = types.slice(1).map(t => (t.includes("int") ? 0 : ""));
            return coder.encode(types, [responseText, ...defaults]);
        }
        
        throw new Error(`Failed to encode response for ABI: ${responseAbi}. Response was not valid JSON.`);
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});