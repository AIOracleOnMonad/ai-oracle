const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  // 1. Deploy AI Token
  const AiToken = await hre.ethers.getContractFactory("AiToken");
  const aiToken = await AiToken.deploy();
  await aiToken.waitForDeployment();
  const aiTokenAddress = await aiToken.getAddress();
  console.log("AiToken deployed to:", aiTokenAddress);

  // 2. Deploy AiOracle
  // Constructor arguments: (address _aiToken, address _oracleNode)
  // We use the deployer as the initial oracle node
  const AiOracle = await hre.ethers.getContractFactory("AiOracle");
  const aiOracle = await AiOracle.deploy(aiTokenAddress, deployer.address);
  await aiOracle.waitForDeployment();
  const aiOracleAddress = await aiOracle.getAddress();
  console.log("AiOracle deployed to:", aiOracleAddress);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
