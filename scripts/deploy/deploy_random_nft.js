const { ethers } = require("hardhat");

require("dotenv").config()

const PUBLIC_KEY = process.env.WALLET_ADDRESS
const PRIVATE_KEY = process.env.PRIVATE_KEY
const CONTRACT_ADDRESS = process.env.RANDOM_NFT

async function deploy()
{
    const randomNFT = await ethers.getContractFactory("RandomCDFoundersNFT");

    // This gas price is for FUJI newtork
    contract = await randomNFT.deploy(50,     {
        gasPrice: 25000000000
    });

    console.log("Contract deployed (random) at:", contract.address);
}

deploy().then(() => process.exit(0)).catch(error =>
{
    console.error(error);
    process.exit(1);
});
