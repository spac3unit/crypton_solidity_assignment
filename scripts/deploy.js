const hre = require('hardhat');
const ethers = hre.ethers;

async function main() {
  const [signer] = await ethers.getSigners();

  const Donations = await ethers.getContractFactory('Donations', signer);
  const donations = await Donations.deploy();
  await donations.deployed();

  console.log('Donations deployed to:', donations.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
