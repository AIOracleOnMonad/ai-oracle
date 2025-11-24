# AI-Oracle SDK

Official SDK for interacting with the AI-Oracle on Monad.

## Installation

```bash
npm install @ai-oracle/sdk ethers
```

## Usage

```javascript
const { getAiOracle, AI_ORACLE_ADDRESSES } = require('@ai-oracle/sdk');
const { ethers } = require('ethers');

async function main() {
    const provider = new ethers.JsonRpcProvider("https://rpc-devnet.monadinfra.com/rpc/...");
    const wallet = new ethers.Wallet("PRIVATE_KEY", provider);
    
    const oracle = getAiOracle(wallet, "monad-testnet");
    
    // Check pending requests
    const pending = await oracle.getPendingRequests(0, 10);
    console.log(pending);
}
```

## Contracts

Solidity interfaces are available in `contracts/`.

```solidity
import "@ai-oracle/sdk/contracts/IAiOracle.sol";
```
