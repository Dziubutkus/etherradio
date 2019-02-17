pragma solidity ^0.5.0;

import "./erc20/ERC20Mintable.sol";
import "./erc20/ERC20Detailed.sol";
import "./SafeMath.sol";


contract EtherToken is ERC20Mintable, ERC20Detailed {
    using SafeMath for uint;
    constructor(string memory name, string memory symbol, uint8 decimals)
        ERC20Detailed(name, symbol, decimals)
    public
    {

    }

    // exchange tokens
    function exchange() public payable {
        require(msg.value > 0);
        uint tokensToMint = (msg.value).sub(1000000);
        _mint(msg.sender, tokensToMint);
    }

}