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
        this.hash = this.calculateBlockHash()
    } 
    calculateBlockHash(){
        return SHA256(this.index + this.prevHash  + this.timestamp + this.formatedDate + this.formatedTime + JSON.stringify(this.transactionData)+ this.nonce).toString()
    } 
    computateProofOfWork(proof){
        let result = this.hash.substring(0, proof)
        console.log("Proof of work : ", result, "is invalid! Trying again...")
        return result
    }
    blockReadyToBeMineToTheChain(proof){
        while(true){
            if(this.validate(proof) !== Array(proof + 1 ).join('0')){
                this.nonce++
                this.hash = this.calculateBlockHash()
            }else{
                break
            }   
        }
        console.log("Proof reached and block mined with proof of : ", this.hash)
    }
}

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()]
        this.proofOfWork = 3
        this.pendingTransactions = []
        this.miningReward = 100
    }

    createGenesisBlock(){
        return new Block(0, Date.now(), dateSend, timeSend, {fromAddress : 'Genesis Mining', toAddress : "Genesis Miner-address", amount: 400}, "previous hash is none")
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1]
    }
    
    modelTransactionToBlock(newBlock){
        // newBlock.index = this.getLatestBlock().index + 1
        newBlock.prevHash = this.getLatestBlock().hash
        newBlock.hash = newBlock.calculateBlockHash()
        this.pushBlockModelToPendingTransactions(newBlock)
        // this.chain.push(newBlock)
    }

    pushBlockModelToPendingTransactions(transaction){
        this.pendingTransactions.push(transaction)
        console.log("Transaction is successfully added to the pending lists...")
    }
    // minePendingTransactions(miningRewardAddress){
    //     let block = new Block(this.index, Date.now(), dateSend, timeSend, this.pendingTransactions)
    //     block.index = this.getLatestBlock().index + 1
    //     block.prevHash = this.getLatestBlock().hash
    //     block.mineBlock(this.difficulty)
    //     console.log("Block Successfully mined!")
    //     this.pendingTransactions = new Transaction(null, miningRewardAddress, this.miningReward)
    //     this.chain.push(block)
    // }
}

let testCoin = new Blockchain()

console.log("Modelling transaction to block...")
testCoin.modelTransactionToBlock(new Block('', Date.now(), dateSend, timeSend, {fromAddress : "Evesdropper", toAddress : "Alice", amount: 10}))
testCoin.modelTransactionToBlock(new Block('', Date.now(), dateSend, timeSend, {fromAddress : "Alice", toAddress : "Bob", amount: 8}))


console.log(JSON.stringify(testCoin,1, 1))
// console.log(testCoin.difficulty)
// console.log(testCoin.pendingTransactions[0])
// console.log(testCoin.chain[0].prevHash)
// console.log(testCoin.chain[0].transactionData[0].fromAddress)
// console.log(testCoin.chain[1].transactionData[0].fromAddress)