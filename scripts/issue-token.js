const DecentralBank = artifacts.require("DecentralBank");
module.exports = async function issuerRewards(callback) {
  let decentralBank = await DecentralBank.deployed();
  await decentralBank.issutoken();
  console.log("token has been issued successfully");
  callback();
};
