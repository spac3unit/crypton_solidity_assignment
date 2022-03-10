require("@nomiclabs/hardhat-web3");
require('dotenv').config();

const {abi} = require('../artifacts/contracts/Donations.sol/Donations');
const Web3 = require('web3');
const web3 = new Web3 (new Web3.providers.HttpProvider(process.env.PROVIDER_URL));
const DonationContract = new web3.eth.Contract(abi, process.env.CONTRACT_ADDRESS);

// CONTRACT_ADDRESS: 0x5FbDB2315678afecb367f032d93F642f64180aa3

task("donate", "send funds to Donations contract")
    .addParam("account", "")
    .addParam("amount", "")
    .setAction(async (taskArgs) => {
        const amount = web3.utils.toWei(taskArgs.amount);
        await DonationContract.methods.makeDonation().send({from:taskArgs.account, value:amount})
            .on('receipt', function(receipt) {
                console.log(receipt)
            })
        });

task("getContractBalance", "Prints an contract's balance")
	.setAction(async () => {
		await DonationContract.methods.getContractBalance()
            .call()
            .then(balance => console.log(balance.toString()))
			
	});

task("getDonatersList", "Prints all donators addresses who donated to contract")
    .setAction(async () => {
    	await DonationContract.methods.getDonatersList()
			.call()
			.then(result => console.log(result));
    });

module.exports = {};
