var Web3 = require('web3')

//using infura as the api sender and picking addresss from etherscan
var web3Public = new Web3('http://mainnet.infura.io/E5WpJBGNnhJYUFLBattT')
var pAddress = '0x9De63c3d53E0Ea396845b7a03ec7548B70014A91'
web3Public.eth.getBalance(pAddress, (err, bal) => {
    pBalance = bal
    eth = web3Public.utils.fromWei(pBalance, 'ether')
    gwei = web3Public.utils.fromWei(pBalance, 'Gwei')
    createAcct = web3Public.eth.accounts.create()
    console.log(eth)
})

//local ethereum network with ganache which communicate with the locally JSONRPC server
var web3Local = new Web3('http://127.0.0.1:745')
var address = '0x627306090abaB3A6e1400e9345bC60c78a88Ef57'
web3Local.eth.getBalance(address, (err, wei) => {
    balance = web3Local.utils.fromWei(wei, 'ether')
    console.log(balance)
}) 