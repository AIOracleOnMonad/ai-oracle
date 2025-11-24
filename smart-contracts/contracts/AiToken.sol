// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract AiToken is ERC20, Ownable {
    constructor() ERC20("AI Oracle", "AI") Ownable(msg.sender) {
        _mint(msg.sender, 100000000 * 10 ** decimals()); // 100 Million supply
    }
}
