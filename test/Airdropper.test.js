const Airdropper = artifacts.require("Airdropper");

contract("Airdropper test", async (accounts) => {
  let contract;

  beforeEach(async () => {
    contract = await Airdropper.new(100);
  });

  describe("deployment", async () => {
    it("deploys successfully", async () => {
      const address = contract.address;
      console.log(address);
      assert.notEqual(address, 0x0);
      assert.notEqual(address, "");
      assert.notEqual(address, null);
      assert.notEqual(address, undefined);

      const name = await contract.name();
      assert.equal(name, "Airdropper");
      const symbol = await contract.symbol();
      assert.equal(symbol, "ADRP");
    });
  });

  describe("sending", async () => {
    it("transfer works", async () => {
      await contract.transfer(accounts[1], 1);
      let balance1 = await contract.balanceOf(accounts[1]);
      assert.equal(balance1, 1);
    });

    it("transfer triggers airdrops", async () => {
      // Make first transfer
      await contract.transfer(accounts[1], 1);
      let balance1 = await contract.balanceOf(accounts[1]);
      assert.equal(balance1, 1);

      // Make second transfer, account 1 should receive extra +1
      await contract.transfer(accounts[2], 1);
      balance1 = await contract.balanceOf(accounts[1]);
      let balance2 = await contract.balanceOf(accounts[2]);
      assert.equal(balance2, 1);
      assert.equal(balance1, 2);

      // Make third transfer, accounts 1 and 2 should receive extra +1
      await contract.transfer(accounts[3], 1);
      balance1 = await contract.balanceOf(accounts[1]);
      balance2 = await contract.balanceOf(accounts[2]);
      balance3 = await contract.balanceOf(accounts[3]);
      assert.equal(balance3, 1);
      assert.equal(balance2, 2);
      assert.equal(balance1, 3);
    });
  });
});
