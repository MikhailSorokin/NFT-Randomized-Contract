const {expect} = require('chai');
const {ethers} = require('hardhat');

describe('RandomNFTTests', function() {

    let Transfer, transferNFTContract, ownerOne;
    let Random, randomNFTContract, ownerTwo;

    beforeEach(async function()
    {
        Transfer = await ethers.getContractFactory("CDFoundersNFT721");
        [ownerOne] = await ethers.getSigners()
        transferNFTContract = await Transfer.deploy()

        Random = await ethers.getContractFactory("RandomCDFoundersNFT");
        [ownerTwo] = await ethers.getSigners()
        randomNFTContract = await Random.deploy()
    });

    /*describe('DeployContracts', function() {
        it ('Should set the right owner', async function() {
            console.log('Owner is: ' + ownerOne.address)
            expect(await transferNFTContract.owner()).to.equal(ownerOne.address)
        })
    })

    describe('MaxSupply', function() {
        it('Max number of tokens on the network allowed', async function() {
            let name = await randomNFTContract.name();
            console.log(name);
            let maxSupply = await randomNFTContract.maxSupply();
            console.log(maxSupply);

            await expect(maxSupply == 2)
        })
    })*/

    describe('CurrentSupply', function() {
        it('Total number of tokens on the network allowed', async function() {
            let totalSupply = await randomNFTContract.totalSupply();
            console.log(totalSupply);

            await expect(totalSupply == 2)
        })
    })

});