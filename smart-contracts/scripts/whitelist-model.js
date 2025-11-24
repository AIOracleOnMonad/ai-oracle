const hre = require("hardhat");

async function main() {
  const contractAddress = process.env.AI_ORACLE_ADDRESS;
  if (!contractAddress) {
    throw new Error("AI_ORACLE_ADDRESS not set in .env");
  }

  const AiOracle = await hre.ethers.getContractFactory("AiOracle");
  const aiOracle = AiOracle.attach(contractAddress);

  // Models from docs.vue
  const models = [
    { id: "google/gemini-3-pro-preview", fee: hre.ethers.parseEther("1.0") },
    { id: "openai/gpt-4o", fee: hre.ethers.parseEther("2.5") },
    { id: "meta/llama-3-70b-instruct", fee: hre.ethers.parseEther("0.5") }
  ];

  for (const model of models) {
    console.log(`Whitelisting ${model.id} with fee ${hre.ethers.formatEther(model.fee)} AI...`);
    const tx = await aiOracle.setModelFee(model.id, model.fee);
    await tx.wait();
    console.log(`Whitelisted ${model.id}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
