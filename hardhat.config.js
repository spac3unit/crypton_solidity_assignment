require("dotenv").config();
require("@nomiclabs/hardhat-waffle");

dotenv.config();

task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});


/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  defaultNetwork: 'rinkeby',
  networks: {
    rinkeby: {
      url: process.env.RINKEBY_URL || '',
      accounts: [
        process.env.PRIVATE_KEY!,
        process.env.CONTRIBUTOR_PRIVATE_KEY!,
      ],
    },
  },
};
