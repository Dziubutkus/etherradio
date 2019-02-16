var SongUpload = artifacts.require("./SongUpload.sol");

module.exports = function(deployer) {
  deployer.deploy(SongUpload);
};
