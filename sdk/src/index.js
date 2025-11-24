const abi = require('./IAiOracle.json');

const AI_ORACLE_ADDRESSES = {
    // Monad Testnet placeholder
    "monad-testnet": "0x5718680B413F1BdB27A3c4Fb520FE6c73D3617B3",
    "monad-mainnet": "0x5718680B413F1BdB27A3c4Fb520FE6c73D3617B3",
    "local": "0x5FbDB2315678afecb367f032d93F642f64180aa3" // Default Hardhat deployment address
};

// Helper to get contract instance
function getAiOracle(signerOrProvider, network = "monad-mainnet") {
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
