// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./IAiOracle.sol";

abstract contract AiOracleConsumer {
    IAiOracle public aiOracle;

    error OnlyOracle();

    modifier onlyOracle() {
        if (msg.sender != address(aiOracle)) {
            revert OnlyOracle();
        }
        _;
    }

    constructor(address _aiOracle) {
        aiOracle = IAiOracle(_aiOracle);
    }

    // Internal function to make requests easier
    function _askAi(string memory model, string memory prompt, string memory responseAbi) internal returns (uint256) {
        return aiOracle.ask(model, prompt, responseAbi);
    }

    // Abstract function that must be implemented by the consumer
    function fulfillAiResponse(uint256 requestId, bytes calldata data) external virtual;
}
