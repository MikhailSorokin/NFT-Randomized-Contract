require("dotenv").config()
const SEPOLIA_API_URL = process.env.SEPOLIA_API_URL
const GOERLI_API_URL = process.env.GOERLI_API_URL
const MUMBAI_API_URL = process.env.MUMBAI_API_URL
const FUJI_API_URL = process.env.FUJI_API_URL

const PUBLIC_KEY = process.env.WALLET_ADDRESS
const PRIVATE_KEY = process.env.PRIVATE_KEY
const CONTRACT_ADDRESS = process.env.RANDOM_NFT

const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(SEPOLIA_API_URL)

const contract = require("../artifacts/contracts/RandomFoundersNFT.sol/RandomFoundersNFT.json")
const randomMintContract = new web3.eth.Contract(contract.abi, CONTRACT_ADDRESS, {
  from: PUBLIC_KEY
});

// tools for overloaded function calls
const web3Abi = require('web3-eth-abi');
const web3Utils = require('web3-utils');

async function redoneFunctionMintRandom(amount) {
      

  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'pending') //get latest nonce

  const txParams = {
    from: PUBLIC_KEY
  };

  web3.eth.estimateGas(txParams)
  .then((estimateGas) => {

      // Calculate a higher gas price (e.g., 20% higher than current gas price)
      const multipliedGas = web3.utils.toBN(estimateGas).mul(web3.utils.toBN(1500000));
      console.log("Gas: " + multipliedGas)

      // Val as a parameter simply does not work for sepolia
      const ethAmount = 0.001
      const weiAmount = web3.utils.toWei(ethAmount.toString(), 'ether');

      const tx = {
        nonce: nonce,
        from: PUBLIC_KEY,
        to: CONTRACT_ADDRESS,
        gas: estimateGas,
        gasLimit: 15000000,
        value: weiAmount,
        data: randomMintContract.methods.randomMint(amount, weiAmount).encodeABI()
      };

      web3.eth.accounts.signTransaction(tx, PRIVATE_KEY).then((signedTx) => {
        web3.eth.sendSignedTransaction(signedTx.rawTransaction)
            .on('transactionHash', (hash) => {
                console.log(
                    "The hash of your transaction is: ",
                    hash,
                    "\nCheck Alchemy's Mempool to view the status of your transaction!"
                );
            })
            .on('receipt', (receipt) => {
                console.log("Transaction receipt:", receipt);
            })
            .on('error', (error) => {
                console.error("Something went wrong when submitting your transaction:", error);
            });
      });
  })
  .catch((error) => {
      console.error('Error estimating gas:', error);
  });

}

redoneFunctionMintRandom(1)