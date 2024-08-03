const { expect } = require("chai");
const hre = require("hardhat");

describe("OceanToken contract" , async function(){
  // global vars
  let Token;
  let oceanToken;
  let owner;
  let addr1;
  let addr2;
  let tokencap = 100000000;
  let tokenBlockReward = 50;

  this.beforeEach(async function(){
    // get the contractFactory and signers here
    Token = await hre.ethers.getContractFactory("OceanToken");
    [owner , addr1 , addr2] = await hre.ethers.getSigner();

    oceanToken = await Token.deploy(tokencap , tokenBlockReward);
  });
   describe("Deploymenrt " , function(){
    it("Should set the right owner" , async function(){
      expect(await oceanToken.totalSupply()).to.equal(owner.address);
    })
   });
   it("Should assign the total supply of token to the owner" , async function (){
    const ownerBalance = await oceanToken.balanceOf(owner.address);
    expect(await oceanToken.totalSupply()).to.equal(ownerBalance);
   })
  it('should have the correct name and symbol' , async function(){
    expect(await oceanToken.name()).to.equal("OceanToken");
    expect(await oceanToken.symbol()).to.equal("OCEAN");
  });
  it('should assign the inital supply to the owner' , async function (){
   const ownerBalance = await oceanToken.balanceOf(owner.address);
    expect(await oceanToken.balanceOf(owner.address)).to.equal(tokencap);
  });
  it('should transfer token correctly ' , async function (){
    await oceanToken.connect(addr1).transfer(addr2.address , 100);
    expect(await oceanToken.balanceOf(addr2.address)).to.equal(100);

  });
  it('Should set the max capped supply to the argument provided during deployment' , async function(){
    const cap = await oceanToken.cap();
    expect(Number(hre.ethers.utils.formatEther(cap))).to.equal(tokencap);
  });
  it("Should set the blockReward to the argument provide during deployment " , async function(){
    const blockReward = await oceanToken.blockReward();
    expect(Number(hre.ethers.utils.formatEther(blockReward))).to.equal(tokenBlockReward);
  });
   await expect(
    oceanToken.connect(addr1).transfer(owner.address , 1)
   ).to.be.revertedWith("ERC20: transfer amount exceeds balance");

   // owner balane should not have changed
   expect(await oceanToken.balanceOf(owner.address)).to.equal(
    initalOwnerBalance
   );
   it("Should update balance after transfer" , async function(){
    const initalOwnerBalance = await oceanToken.balanceOf(owner.address);

    // transfer 100 token from owner to addr1
    await oceanToken.transfer(addr1.address , 100);
        // transfer anither 50 token from owner to addr2
        await oceanToken.transfer(addr2.address , 50);
        // check balance
        
  })
  await myToken.connect(addr1).transfer(addr2.address , 30);
  const addr2Balance = await myToken.balanceOf(addr2.address);
  expect(addr2Balance).to.equal(30);

});