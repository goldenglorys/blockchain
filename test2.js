const SHA256 = require('crypto-js/sha256') 

let date = new Date()
let dateSend = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear()
let timeSend = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()


class Block{
    constructor(index, timestamp, formatedDate, formatedTime, transactionData, prevHash=''){
        this.index = index
        this.timestamp = timestamp
        this.formatedDate = formatedDate
        this.formatedTime = formatedTime
        this.transactionData = [transactionData]
        this.prevHash = prevHash
        this.hash = this.calculateHash()
    } 
    calculateHash(){
        return SHA256(this.index + this.prevHash  + this.timestamp + this.formatedDate + this.formatedTime + JSON.stringify(this.transactionData)+ this.nonce).toString()
    } 
}

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()]
        this.difficulty = 3
        this.pendingTransactions = []
        this.miningReward = 100
    }

    createGenesisBlock(){
        return new Block(0, Date.now(), dateSend, timeSend, {fromAddress : 'Genesis Mining', toAddress : "Genesis Miner-address", amount: '400'}, "previous hash is none")
    }
    getLatestBlock(){
        return this.chain[this.chain.length - 1]
    }
    
    modelTransactionToBlock(newBlock){
        newBlock.index = this.getLatestBlock().index + 1
        newBlock.prevHash = this.getLatestBlock().hash
        newBlock.hash = newBlock.calculateHash()
        this.chain.push(newBlock)
    }
}

let testCoin = new Blockchain()

console.log("Modelling transaction to block...")
testCoin.modelTransactionToBlock(new Block('', Date.now(), dateSend, timeSend, {fromAddress : "Evesdropper", toAddress : "Alice", amount: "10BTC",}))


console.log(JSON.stringify(testCoin,1, 1))
// console.log(testCoin.difficulty)
// console.log(testCoin.pendingTransactions[0])
// console.log(testCoin.chain[0].prevHash)
// console.log(testCoin.chain[0].transactionData[0].fromAddress)
// console.log(testCoin.chain[1].transactionData[0].fromAddress)