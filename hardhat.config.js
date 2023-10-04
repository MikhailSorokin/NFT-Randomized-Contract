/**
* @type import('hardhat/config').HardhatUserConfig
*/
require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
const { MAINNET_API_URL, GOERLI_API_URL, SEPOLIA_API_URL, MUMBAI_API_URL, PRIVATE_KEY } = process.env;
module.exports = {
   solidity: "0.8.1",
   defaultNetwork: "hardhat",
   networks: {
      hardhat: {},
      mainnet: {
         url: MAINNET_API_URL,
         accounts: {
            mnemonic: "source entire squeeze wire vanish fitness release casual top tone turkey cheese",
         },
         chainId: 1,
      },
      goerli: {
         url: GOERLI_API_URL,
         accounts: [`0x${PRIVATE_KEY}`]
      },
      sepolia: {
         url: SEPOLIA_API_URL,
         accounts: [`0x${PRIVATE_KEY}`]
      },
      fuji: {
         url: 'https://api.avax-test.network/ext/bc/C/rpc',
         chainId: 43113,
         accounts: [`0x${PRIVATE_KEY}`]
      },
      mumbai: {
         url: MUMBAI_API_URL,
         accounts: [`0x${PRIVATE_KEY}`]
      }
   },
}
