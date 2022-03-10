// require("dotenv").config();
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-web3");

require ("./tasks/index.js");

// dotenv.config();

task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});



module.exports = {
  solidity: "0.8.4",
  networks: {
    hardhat: {
      chainId: 1337
    }
  }
}