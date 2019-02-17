pragma solidity ^0.5.0;

import "./Ownable.sol";
import "./SafeMath.sol";

contract Etherradio is Ownable {
    using SafeMath for uint;

    // Total ether collected
    uint bank;
    // Subscription price
    uint subscriptionPrice = 1 ether;
    // Array of artists
    address payable[] public artists;
    mapping (address => bool) public allowedArtists;
    mapping (address => bool) public subscribedUsers;
    //mapping (address => Song) public songsToAddress;
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
    event NewSubscriber(address subscriber);

    constructor() public {

    }

    function () external payable {
        subscription();
    }

    function subscription() public payable {
        require(msg.value == subscriptionPrice, "Not enough ether to buy a subscription");
        require(!subscribedUsers[msg.sender], "You have already subscribed");
        bank = bank.add(msg.value);
        subscribedUsers[msg.sender] = true;

        emit NewSubscriber(msg.sender);
    }

    function addSong(string memory _songName, address payable[] memory _artists, uint[] memory _royalties) onlyOwner public {
        Song storage songsTemp = songs[numberOfSongs];
        songsTemp.songOwner = msg.sender;
        songsTemp.songName = _songName;
        songsTemp.artists = _artists;
        songsTemp.royalties = _royalties;
        songs.push(songsTemp);

        //songsToAddress[msg.sender] = songsTemp;
        addressToSongs[msg.sender][numberOfSongs] = songsTemp;
        numberOfSongs++;

        emit AddedSong(songsTemp.songName);
    }

    function withdraw(uint _songId) public {
        require(songs[_songId].songOwner == msg.sender, "You are not the song owner");
        Song memory songTemp = songs[_songId];
        uint amountToDistribute = 1 ether;
        for(uint i = 0; i < songTemp.artists.length; i++) {
            uint forArtist = amountToDistribute.mul(songTemp.royalties[i]).div(100);
            songTemp.artists[i].transfer(forArtist);
        }
    }

}
