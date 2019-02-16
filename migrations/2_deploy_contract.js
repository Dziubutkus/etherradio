var Mock = artifacts.require("./Mock.sol");

module.exports = function(deployer) {
  deployer.deploy(Mock);
};
