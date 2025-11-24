// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./AiOracleConsumer.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Consumer is AiOracleConsumer {
    IERC20 public aiToken;
    
    // Store decoded response for testing
    string public ticker;
    string public name;
    uint256 public supply;
    string public description;

    event ReceivedResponse(uint256 requestId, string ticker, string name, uint256 supply, string description);

    constructor(address _oracle, address _aiToken) AiOracleConsumer(_oracle) {
        aiToken = IERC20(_aiToken);
    }

    function requestAI(string memory model, string memory prompt, string memory responseAbi) external {
        // Approve oracle to spend tokens if not already approved (in production, approval might be done separately)
        // Check current allowance
        uint256 currentAllowance = aiToken.allowance(address(this), address(aiOracle));
        if (currentAllowance == 0) {
             aiToken.approve(address(aiOracle), type(uint256).max);
        }

        _askAi(model, prompt, responseAbi);
    }

    function fulfillAiResponse(uint256 requestId, bytes calldata data) external override onlyOracle {
        // Decode response: (string ticker, string name, uint256 supply, string description)
        (string memory _ticker, string memory _name, uint256 _supply, string memory _description) = 
            abi.decode(data, (string, string, uint256, string));
            
        ticker = _ticker;
        name = _name;
        supply = _supply;
        description = _description;
        
        emit ReceivedResponse(requestId, _ticker, _name, _supply, _description);
    }
}
