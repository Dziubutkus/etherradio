pragma solidity ^0.5.0;

import "./erc20/ERC20Mintable.sol";
import "./erc20/ERC20Detailed.sol";
//import "./erc20/ERC20Burnable.sol";
import "./SafeMath.sol";

contract EtherToken is ERC20Mintable, ERC20Detailed {
    using SafeMath for uint;

    uint rate = 1000000;

    constructor(string memory name, string memory symbol, uint8 decimals)
        ERC20Detailed(name, symbol, decimals)
    public
    {

    }

    // exchange ether to tokens
    function convert() public payable {
        require(msg.value > 0);
        uint tokensToMint = msg.value.mul(rate);
        _mint(msg.sender, tokensToMint);
    }



}