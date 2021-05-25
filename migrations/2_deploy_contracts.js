var Airdropper = artifacts.require("Airdropper");

module.exports = function (deployer) {
  // deployment steps
  deployer.deploy(Airdropper, 100);
};
