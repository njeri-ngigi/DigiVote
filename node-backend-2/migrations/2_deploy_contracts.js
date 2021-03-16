const Candidates = artifacts.require("./Candidates.sol");

module.exports = function(deployer) {
  deployer.deploy(Candidates);
};
