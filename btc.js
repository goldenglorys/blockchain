const SHA256 = require('crypto-js/sha256') 

let date = new Date()
let dateSend = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear()
let timeSend = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()

class Transaction{
    constructor(fromAddress, toAddress, amount){
        this.fromAddress = fromAddress
        this.toAddress = toAddress
        this.amount = amount
    }
}

class Block{
    constructor(index, timestamp, formatedDate, formatedTime, transactionData, prevHash=''){
        this.index = index
        this.timestamp = timestamp
        this.formatedDate = formatedDate
        this.formatedTime = formatedTime
        this.transactionData = [transactionData]
        this.prevHash = prevHash
        this.hash = this.calculateHash()
        this.nonce = 0
    } 

    calculateHash(){
        return SHA256(this.index + this.prevHash  + this.timestamp + this.formatedDate + this.formatedTime + JSON.stringify(this.transactionData)+ this.nonce).toString()
    }

    validate(difficulty){
        let result = this.hash.substring(0, difficulty)
        console.log("Proof of work result : ", this.hash, "is invalid! Trying again...")
        return result
    }

    mineBlock(difficulty){
        while(true){
            if(this.validate(difficulty) !== Array(difficulty + 1 ).join('0')){
                this.nonce++
                this.hash = this.calculateHash()
            }else{
                break
            } 
        }
        console.log("Proof reached and block mined with hash : ", this.hash)
    }
}

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()]
        this.difficulty = 4
        this.pendingTransactions = []
        this.miningReward = 100
    }

    createGenesisBlock(){
        return new Block(0, Date.now(), dateSend, timeSend, {fromAddress : 'Genesis Mining', toAddress : "Genesis Miner-address", amount: '400'}, "previous hash is none")
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1]
    }
    
    pushToPendingTransactions(transaction){
        this.pendingTransactions.push(transaction)
        console.log("Transaction is added to the pool of unconfirmed transactions...")
    }
    
    minePendingTransactions(miningRewardAddress){
        let block = new Block(this.index, Date.now(), dateSend, timeSend, this.pendingTransactions)
        block.index = this.getLatestBlock().index + 1
        block.prevHash = this.getLatestBlock().hash
        block.mineBlock(this.difficulty)
        console.log("Difficulty solved and block in inserted to this node ledger. Broadcasting to other node now...")
        this.pendingTransactions = new Transaction(null, miningRewardAddress, this.miningReward)
        this.chain.push(block)
    }

    getBalanceofAddress(address){
        let balance = 0
        for(const block of this.chain){
            for(const trans of block.transactionData){
                if(trans.fromAddress == address){
                    balance -= trans.amount
                }
                if(trans.toAddress == address){
                    balance += trans.amount
                }

            }
        }
        return balance
    }

    validateChain(){
        for(let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i]
            const prevBlock = this.chain[i - 1]

            if(currentBlock.hash !== currentBlock.calculateHash()){
                return 'Negative'
            }

            if(currentBlock.prevHash !== prevBlock.hash){
                return 'Negative'
            }
        }
        return 'Positive'
    }
}

let jsCoin = new Blockchain();

jsCoin.pushToPendingTransactions(new Transaction('fromAddress1', 'toAddress2', 10))
// jsCoin.pushToPendingTransactions(new Transaction('fromAddress2', 'toAddress1', 50))
// jsCoin.pushToPendingTransactions(new Transaction('fromAddress1132', 'toAddress112', 500))


console.log("\n Starting miner...")
jsCoin.minePendingTransactions('miner-address')

console.log(JSON.stringify(jsCoin ,1, 1))
