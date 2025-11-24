// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IAiOracle {
    struct Request {
        uint256 id;
        address requester;
        string model;
        string prompt;
        string responseAbi;
    }

    event RequestAiResponse(uint256 requestId, address requester, string model, string prompt, string responseAbi);
    event AiResponseReceived(uint256 requestId, address requester, bytes data);

    function ask(string calldata model, string calldata prompt, string calldata responseAbi) external returns (uint256);
    function fulfill(uint256 requestId, bytes calldata data) external;
    function batchFulfill(uint256[] calldata requestIds, bytes[] calldata data) external;
    function getPendingRequests(uint256 offset, uint256 limit) external view returns (Request[] memory);
}
