pragma solidity ^0.5.0;

import "./Ownable.sol";
import "./SafeMath.sol";

contract SongUpload is Ownable {
    using SafeMath for uint;
    string public songName;
    address payable[] public artists;
    mapping (address => bool) public allowedUsers;
    mapping (address => uint) public royalties;
    uint public moneyCollected;

    constructor(string memory _songName, address payable[] memory _artists, uint[] memory _royalties) public {
        songName = _songName;
        artists = _artists;
        for(uint i = 0; i < _artists.length; i++) {
            royalties[_artists[i]] = _royalties[i];
            allowedUsers[_artists[i]] = true;
        }
    }

    function () external payable {
        require(msg.value > 0);
        moneyCollected = moneyCollected.add(msg.value);
    }

    function withdrawAll() public {
        require(allowedUsers[msg.sender]);
        uint moneyToTransfer = moneyCollected.mul(royalties[msg.sender]).div(100);
        msg.sender.transfer(moneyToTransfer);
    }


}
