const abi = require('./IAiOracle.json');

const AI_ORACLE_ADDRESSES = {
    // Monad Testnet placeholder
    "monad-testnet": "0x7f000000000000000000000000000000000003a9",
    "local": "0x5FbDB2315678afecb367f032d93F642f64180aa3" // Default Hardhat deployment address
};

// Helper to get contract instance
function getAiOracle(signerOrProvider, network = "monad-testnet") {
    const { ethers } = require("ethers");
    const address = AI_ORACLE_ADDRESSES[network];
    if (!address) {
        throw new Error(`Network ${network} not supported`);
    }
    return new ethers.Contract(address, abi, signerOrProvider);
}

module.exports = {
    abi,
    AI_ORACLE_ADDRESSES,
    getAiOracle
};
