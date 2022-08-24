const RWD = artifacts.require("RWD");
const Tether = artifacts.require("Tether");
const DecentralBank = artifacts.require("DecentralBank");

require("chai")
  .use(require("chai-as-promised"))
  .should();
//owner = address[0],customer = address[1]
contract("DecentralBank", ([owner, customer]) => {
  //All code goes here

  let tether, rwd, decentralBank;

  function token(number) {
    return web3.utils.toWei(number, "ether");
  }
  before(async () => {
    //load contracts
    tether = await Tether.new();
    rwd = await RWD.new();
    decentralBank = await DecentralBank.new(rwd.address, tether.address);

    //Tarnsfer all token to decentral bank
    await rwd.transfer(decentralBank.address, token("1000000"));

    //Transfer some amount to the customers
    await tether.transfer(customer, token("100"), { from: owner });
  });

  describe("Mock Tether Deployment", async () => {
    it("matches name successfully", async () => {
      const name = await tether.name();

      assert.equal(name, "Mock Tether Token");
    });
  });

  describe("Reward token Deployment", async () => {
    it("matches name successfully", async () => {
      const name = await rwd.name();

      assert.equal(name, "Reward token");
    });
  });
  describe("DecentralBank token deployment", async () => {
    it("matches name successfully", async () => {
      const name = await decentralBank.name();

      assert.equal(name, "Decentral bank");
    });
    it("contract has tokens", async () => {
      balance = await rwd.balanceof(decentralBank.address);

      assert.equal(balance, token("1000000"));
    });
    describe("Yield farming", async () => {
      it("rewards token for staking", async () => {
        let result;

        //check investors balance
        result = await tether.balanceof(customer);

        assert.equal(
          result.toString(),
          token("100"),
          "customer mock wallet balance before staking ",
        );

        //check staking for cusotmers to have 100 tokens
        await tether.approve(decentralBank.address, token("100"), {
          from: customer,
        });
        await decentralBank.depositTokens(token("100"), { from: customer });

        //check updated balance of customer
        result = await tether.balanceof(customer);

        assert.equal(
          result.toString(),
          token("0"),
          "customer mock wallet balance after staking ",
        ),
          //check updated balance of decentralbank
          (result = await tether.balanceof(decentralBank.address));

        assert.equal(
          result.toString(),
          token("100"),
          "decentralbank balance before staking should be 100 ",
        );

        //is staking balance
        result = await decentralBank.isStaking(customer);

        assert.equal(
          result.toString(),
          "true",
          "customer staking status after staking",
        ),
          //issue tokens
          await decentralBank.issutoken({ from: owner }),
          //ENsure only the owner can issue token
          await decentralBank.issutoken({ from: customer }).should.be.rejected,
          //unstake tokens
          await decentralBank.unstakeTokens({ from: customer }),
          //check unstaking balance

          (result = await tether.balanceof(customer)),
          assert.equal(
            result.toString(),
            token("100"),
            "customer mock wallet balance after unstaking ",
          ),
          //check updated balance of decentralbank
          (result = await tether.balanceof(decentralBank.address));

        assert.equal(
          result.toString(),
          token("0"),
          "decentralbank balance after staking should be 0 ",
        );

        //is staking update
        result = await decentralBank.isStaking(customer);

        assert.equal(
          result.toString(),
          "false",
          "customer is no more staking after unstaking",
        );
      });
    });
  });
});
