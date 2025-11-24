// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./IAiOracle.sol";

interface IConsumer {
    function fulfillAiResponse(uint256 requestId, bytes calldata data) external;
}

contract AiOracle is IAiOracle, Ownable {
    IERC20 public aiToken;
    mapping(string => uint256) public modelFees;
    mapping(string => bool) public isModelSupported;
    address public oracleNode;
    
    uint256 private _nextRequestId;
    
    // Request storage and tracking
    mapping(uint256 => Request) private _requests;
    uint256[] private _pendingIds;
    mapping(uint256 => uint256) private _pendingIdToIndex;

    constructor(address _aiToken, address _oracleNode) Ownable(msg.sender) {
        aiToken = IERC20(_aiToken);
        oracleNode = _oracleNode;
        _nextRequestId = 1;
    }

    function setModelFee(string calldata model, uint256 fee) external onlyOwner {
        modelFees[model] = fee;
        isModelSupported[model] = true;
    }

    function setOracleNode(address _oracleNode) external onlyOwner {
        oracleNode = _oracleNode;
    }

    function ask(string calldata model, string calldata prompt, string calldata responseAbi) external override returns (uint256) {
        require(isModelSupported[model], "Model not supported");
        
        uint256 fee = modelFees[model];
        
        // Charge fee
        require(aiToken.transferFrom(msg.sender, address(this), fee), "Fee transfer failed");

        uint256 requestId = _nextRequestId++;
        
        // Store request details
        Request storage req = _requests[requestId];
        req.id = requestId;
        req.requester = msg.sender;
        req.model = model;
        req.prompt = prompt;
        req.responseAbi = responseAbi;
        
        // Track pending
        _pendingIds.push(requestId);
        _pendingIdToIndex[requestId] = _pendingIds.length - 1;

        emit RequestAiResponse(requestId, msg.sender, model, prompt, responseAbi);

        return requestId;
    }

    function fulfill(uint256 requestId, bytes calldata data) external override {
        require(msg.sender == oracleNode, "Only oracle node can fulfill");
        _fulfill(requestId, data);
    }

    function batchFulfill(uint256[] calldata requestIds, bytes[] calldata data) external override {
        require(msg.sender == oracleNode, "Only oracle node can fulfill");
        require(requestIds.length == data.length, "Length mismatch");
        
        for (uint256 i = 0; i < requestIds.length; i++) {
            _fulfill(requestIds[i], data[i]);
        }
    }

    function _fulfill(uint256 requestId, bytes calldata data) internal {
        Request memory req = _requests[requestId];
        require(req.requester != address(0), "Request not found");
        
        // Cleanup Pending Array (Swap and Pop)
        uint256 index = _pendingIdToIndex[requestId];
        uint256 lastIndex = _pendingIds.length - 1;
        
        if (index != lastIndex) {
            uint256 lastRequestId = _pendingIds[lastIndex];
            _pendingIds[index] = lastRequestId;
            _pendingIdToIndex[lastRequestId] = index;
        }
        _pendingIds.pop();
        delete _pendingIdToIndex[requestId];
        delete _requests[requestId];

        emit AiResponseReceived(requestId, req.requester, data);

        // Call back the consumer
        try IConsumer(req.requester).fulfillAiResponse(requestId, data) {
            // Success
        } catch {
            // Failure in callback
        }
    }

    function getPendingRequests(uint256 offset, uint256 limit) external view override returns (Request[] memory) {
        if (offset >= _pendingIds.length) {
            return new Request[](0);
        }
        
        uint256 end = offset + limit;
        if (end > _pendingIds.length) {
            end = _pendingIds.length;
        }
        
        uint256 count = end - offset;
        Request[] memory result = new Request[](count);
        
        for (uint256 i = 0; i < count; i++) {
            result[i] = _requests[_pendingIds[offset + i]];
        }
        
        return result;
    }
    
    // Withdraw collected fees
    function withdraw() external onlyOwner {
        uint256 balance = aiToken.balanceOf(address(this));
        require(aiToken.transfer(msg.sender, balance), "Transfer failed");
    }
}
