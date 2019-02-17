pragma solidity ^0.5.0;

import "./EtherToken.sol";
import "./Ownable.sol";
import "./SafeMath.sol";

contract Etherradio is Ownable, EtherToken {
    using SafeMath for uint;

    // Total ether collected
    uint bank;
    // Subscription price
    mapping (address => bool) public subscribedUsers;
    mapping (address => mapping (uint => Song)) public addressToSongs;
    uint numberOfSongs;

    struct Song {
        address songOwner;
        string songName;
        address payable[] artists;
        uint[] royalties;
    }

    Song[] songs;

    event AddedSong(string _songName);

    constructor(string memory name, string memory symbol, uint8 decimals)
    EtherToken(name, symbol, decimals)
    public {

    }

    function () external payable {
        //convert();
    }

    function addSong(string memory _songName, address payable[] memory _artists, uint[] memory _royalties) onlyOwner public {
        Song memory songsTemp;
        songsTemp.songOwner = msg.sender;
        songsTemp.songName = _songName;
        songsTemp.artists = _artists;
        songsTemp.royalties = _royalties;
        songs.push(songsTemp);

        addressToSongs[msg.sender][numberOfSongs] = songsTemp;
        numberOfSongs++;

        emit AddedSong(songsTemp.songName);
    }

    function listen() public {
        require(balanceOf(msg.sender) >= 1);
        Song memory temp = songs[0];
        _transfer(msg.sender, temp.songOwner, 10);
    }

}