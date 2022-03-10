require('@nomiclabs/hardhat-web3');
require('dotenv').config();

const { abi } = require('../artifacts/contracts/Donations.sol/Donations');
const Web3 = require('web3');
const web3 = new Web3(
  new Web3.providers.HttpProvider(
    process.env.PROVIDER_URL || 'http://127.0.0.1:8545/'
  )
);
const DonationContract = new web3.eth.Contract(
  abi,
  process.env.CONTRACT_ADDRESS || '0x5FbDB2315678afecb367f032d93F642f64180aa3'
);

task('makeDonation', 'send funds to Donations contract')
  .addParam('account', 'Account address from which you want to pay')
  .addParam('amount', 'Amount of funds')
  .setAction(async (taskArgs) => {
    await DonationContract.methods
      .makeDonation()
      .send({ from: taskArgs.account, value: taskArgs.amount });
  });

task('getContractBalance', "Prints an contract's balance").setAction(
  async () => {
    await DonationContract.methods
      .getContractBalance()
      .call()
      .then((balance) => console.log(balance));
  }
);

task('getDonatersList', 'Prints all donators addresses').setAction(async () => {
  await DonationContract.methods
    .getDonatersList()
    .call()
    .then((result) => console.log(result));
});

// I wasted a lot of time, but could not figure out how to pass arguments from the command line to a contract function
// So I hardcoded them :(
task('withdraw', 'Wiwthdraw some amount of funds') // npx hardhat withdraw
  .setAction(async (taskArgs) => {
    await DonationContract.methods
      .withdraw('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266', 300)
      .send({ from: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266' });
  });

task('withdrawAll', 'Wiwthdraw some amount of funds') // npx hardhat withdraw
  .addParam('to', 'The account to which you want to send funds')
  .setAction(async (taskArgs) => {
    await DonationContract.methods.withdrawAll().send({ to: taskArgs.to });
  });

// I wasted a lot of time, but could not figure out how to pass arguments from the command line to a contract function
// So I hardcoded them :(
task('donatedByAddress', 'donated by specific address') // npx hardhat donatedByAddress
  .setAction(async (taskArgs) => {
    await DonationContract.methods
      .donatedByAddress('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266')
      .call({ from: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266' })
      .then((result) => console.log(result));
  });
