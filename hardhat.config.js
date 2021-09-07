require("@nomiclabs/hardhat-waffle");
require('dotenv').config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});


//const RINKEBY_PRIVATE_KEY = '2333ea062ec0d5dde3d0a950bfb977c85f4b94a3656ab822b0c92dc5f4ee6d94';

module.exports = {
  solidity: "0.8.4",
  networks: {
    rinkeby: {
      url: 'https://eth-rinkeby.alchemyapi.io/v2/FW8jDUxRH9FTnQ1uleWA6JaiccrG4fa_',
      accounts: [`0x${process.env.RINKEBY_PRIVATE_KEY}`]
    }
  }
};
