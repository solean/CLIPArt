const { expect } = require("chai");
const { ethers } = require("hardhat");


function getValue() {
  return {
    value: ethers.utils.parseEther("0.1")
  };
}


describe("CLIPArt paint", function () {
  let CLIPArt;
  let contract;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  beforeEach(async function() {
    CLIPArt = await ethers.getContractFactory("CLIPArt");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    const maxTotal = 5;
    const maxPerAddress = 2;

    contract = await CLIPArt.deploy(maxTotal, maxPerAddress);
  });

  describe("Deployment", function() {
    it("Deployment should set max number of pieces.", async function() {
      expect(await contract._maxNumberOfPieces()).to.equal(5);
      expect(await contract._maxNumberOfPiecesPerAddress()).to.equal(2);
    });
  });


  describe("Minting", function() {
    it("Balance should increment after painting.", async function() {
      await contract.paint(getValue());
      let balance = await contract.balanceOf(owner.address);
      expect(balance).to.equal(1);
      let paintingOwner = await contract.ownerOf(1);
      expect(paintingOwner).to.equal(owner.address);

      // Mint 2nd painting
      await contract.paint(getValue());
      balance = await contract.balanceOf(owner.address);
      expect(balance).to.equal(2);
      paintingOwner = await contract.ownerOf(2);
      expect(paintingOwner).to.equal(owner.address);
    });

    it("Should set tokenURI correctly.", async function() {
      await contract.paint(getValue());
      let id = 1;
      let tokenURI = await contract.tokenURI(1);
      expect(tokenURI).to.equal("http://localhost:8080/test/1");
    });

    it("Should not allow a mint without sending any ether.", async function() {
      await expect(
        contract.paint()
      ).to.be.revertedWith("You did not send enough ether to interest the painter. Please send at least 0.1 ether.");
    });

    it("Should not allow a mint without sending at least 0.1 ether.", async function() {
      let overrides = {
        value: ethers.utils.parseEther("0.01")
      };
      await expect(
        contract.paint(overrides)
      ).to.be.revertedWith("You did not send enough ether to interest the painter. Please send at least 0.1 ether.");
    });

    it("Should allow a mint when sending 0.1 ether.", async function() {
      await contract.paint(getValue());
      let balance = await contract.balanceOf(owner.address);
      expect(balance).to.equal(1);
    });

    it("Should not allow more than the max number of total mints.", async function() {
      await contract.paint(getValue());
      await contract.connect(addr1).paint(getValue());
      await contract.connect(addr2).paint(getValue());
      await contract.connect(addrs[0]).paint(getValue());
      await contract.connect(addrs[1]).paint(getValue());
      await expect(
        contract.connect(addrs[2]).paint(getValue())
      ).to.be.revertedWith("All pieces have already been minted.");
    });

    it("Should not allow more than the max number of mints per address.", async function() {
      await contract.paint(getValue());
      await contract.paint(getValue());

      await expect(
        contract.paint(getValue())
      ).to.be.revertedWith("You have already minted the max number of pieces per address.");
    });
  });
});
