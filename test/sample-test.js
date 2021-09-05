const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CLIPArt paint", function () {
  let CLIPArt;
  let hardhatContract;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  beforeEach(async function() {
    CLIPArt = await ethers.getContractFactory("CLIPArt");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    hardhatContract = await CLIPArt.deploy(5);
  });

  describe("Deployment", function() {
    it("Deployment should set max number of pieces.", async function() {
      expect(await hardhatContract._maxNumberOfPieces()).to.equal(5);
    });
  });


  describe("Minting", function() {
    it("Balance should increment after painting.", async function() {
      await hardhatContract.paint();
      let balance = await hardhatContract.balanceOf(owner.address);
      expect(balance).to.equal(1);
      let paintingOwner = await hardhatContract.ownerOf(1);
      expect(paintingOwner).to.equal(owner.address);

      // Mint 2nd painting
      await hardhatContract.paint();
      balance = await hardhatContract.balanceOf(owner.address);
      expect(balance).to.equal(2);
      paintingOwner = await hardhatContract.ownerOf(2);
      expect(paintingOwner).to.equal(owner.address);
    });

    it("Should set tokenURI correctly.", async function() {
      await hardhatContract.paint();
      let id = 1;
      let tokenURI = await hardhatContract.tokenURI(1);
      expect(tokenURI).to.equal("http://localhost:8080/test/1");
    });

    it("Should not allow more than the max number of mints.", async function() {
      await hardhatContract.paint();
      await hardhatContract.paint();
      await hardhatContract.paint();
      await hardhatContract.paint();
      await hardhatContract.paint();

      await expect(
        hardhatContract.paint()
      ).to.be.revertedWith("All pieces have already been minted.");
    });
  });
});
