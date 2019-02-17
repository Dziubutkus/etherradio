var Etherradio = artifacts.require("./Etherradio.sol");
var EtherToken = artifacts.require("./EtherToken.sol");

const name = "Ether Radio Token";
const symbol = "ERT";
const decimals = 18;

module.exports = function(deployer) {
  deployer.deploy(Etherradio).then( function() {
    deployer.deploy(EtherTokne, name, symbol, decimals)
  });
};
