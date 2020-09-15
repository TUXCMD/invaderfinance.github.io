/* eslint-disable */

//https://docs.metamask.io/guide/ethereum-provider.html#using-the-provider
const tokenContractABI = require('../contracts/ERC20ABI.json')
const config = require('./config-0xbtc.js')


var helper = {

  init(){
    console.log('init web3 helper')

    /**********************************************************/
    /* Handle chain (network) and chainChanged (per EIP-1193) */
    /**********************************************************/

    // Normally, we would recommend the 'eth_chainId' RPC method, but it currently
    // returns incorrectly formatted chain ID values.
    let currentChainId = window.ethereum.chainId;

    window.ethereum.on('chainChanged', handleChainChanged);

    function handleChainChanged(_chainId) {
      // We recommend reloading the page, unless you must do otherwise
      window.location.reload();
    }
  },

  ethereumChainID()
  {
    return 0x1
  },
  maticChainID()
  {
    return 0x89
  },

  async getConnectedAccounts()
  {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    return accounts;
  },

  async getProviderNetworkID()
  {
    var net_id = await  window.ethereum.chainId;
    console.log('net id is', net_id)
    return net_id;
  },

  async getTokensAllowance(tokenAddress, spender, ownerAddress)
  {
    var Web3 = require('web3');
    var web3 = new Web3(config.root.RPC);


    var tokenContract = new web3.eth.Contract(tokenContractABI, tokenAddress, {});


    var allowance = await tokenContract.methods.allowance(spender,ownerAddress).call();

    return allowance;
  },

  async getTokensBalance(tokenAddress, ownerAddress)
  {
    var Web3 = require('web3');
    var web3 = new Web3(config.root.RPC);


    var tokenContract = new web3.eth.Contract(tokenContractABI, tokenAddress, {});


    var allowance = await tokenContract.methods.balanceOf(ownerAddress).call();

    return allowance;
  },

  rawAmountToFormatted(amount,decimals)
  {
    console.log('formatting',amount,decimals)
    return (amount * Math.pow(10,-1 * decimals)).toFixed(decimals);
  },

  formattedAmountToRaw(amountFormatted,decimals)
  {

    return (amountFormatted * Math.pow(10,decimals));
  },

  async connect()
  {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    return accounts
  },

  async disconnect()
  {
    console.log('disconnecting')
    const accounts = await window.ethereum.request({
     method: "eth_requestAccounts",
     params: [
       {
         eth_accounts: {}
       }
     ]
   });
   window.location.reload();
  }
}

export default helper