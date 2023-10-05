const {expect} = require('chai');
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3("https://eth-sepolia.g.alchemy.com/v2/UGiOLu6ECp1vgYyelZNHwJeZGYPXHcAc");
const contractAbi = require("../artifacts/contracts/RandomFoundersNFT.sol/RandomFoundersNFT.json");

describe('RandomNFTTests', function() {
    let Random, randomNFTContract, owner;
    let contractAddress = "0xC296b73804816FBbd15f5b5548944763cd955181";

    beforeEach(async function()
    {
        Random = await ethers.getContractFactory("RandomFoundersNFT");
        [owner] = await ethers.getSigners()

        randomNFTContract = new web3.eth.Contract(contractAbi.abi, contractAddress, 
            {from: "0x0B5567aAC287541Cfae02a86956064D2bDA286A4"});
    
    });

    describe('CurrentSupply', function() {
        it('Total number of tokens on the network allowed', async function() {
            let totalSupply = await randomNFTContract.maxSupply();
            console.log(totalSupply);

            //await expect(totalSupply == 2)
        })
    })

    describe('IPFSUrl', function() {
        it('Correct mapping of IPFS from an address', async function() {
            let tokenURL = await randomNFTContract.tokenURI(35);
            console.log(tokenURL);
        })
    })

});