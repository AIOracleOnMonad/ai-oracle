const hre = require("hardhat");

async function main() {
    const contractAddress = process.env.AI_ORACLE_ADDRESS;
    const newFeeToken = process.env.NEW_FEE_TOKEN;

    if (!contractAddress || !newFeeToken) {
        throw new Error("Missing AI_ORACLE_ADDRESS or NEW_FEE_TOKEN env vars");
    }

    const AiOracle = await hre.ethers.getContractFactory("AiOracle");
    const aiOracle = AiOracle.attach(contractAddress);

    console.log(`Updating fee token to ${newFeeToken}...`);
    // Note: This requires setFeeToken to be implemented in the contract
    const tx = await aiOracle.setFeeToken(newFeeToken);
    await tx.wait();
    console.log("Fee token updated");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
