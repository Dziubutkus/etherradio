pragma solidity ^0.5.0;

import "./erc20/ERC20Mintable.sol";
import "./erc20/ERC20Detailed.sol";
import "./erc20/ERC20Burnable.sol";
import "./SafeMath.sol";


contract EtherToken is ERC20Mintable, ERC20Detailed, ERC20Burnable {
    using SafeMath for uint;
    constructor(string memory name, string memory symbol, uint8 decimals)
        ERC20Detailed(name, symbol, decimals)
    public
    {

    }

    // exchange ether to tokens
    function convert() public payable {
        require(msg.value > 0);
        uint tokensToMint = (msg.value).sub(1000000);
        _mint(msg.sender, tokensToMint);
    }

    function convertBack(uint tokenAmount) public payable {
        require(balanceOf(msg.sender) >= tokenAmount, "You don't have that many tokens");
        uint amountToSend = tokenAmount.mul(1000000);
        burn(tokenAmount);
        msg.sender.transfer(amountToSend);
    }



    

}