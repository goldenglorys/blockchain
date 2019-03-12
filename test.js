const SHA256 = require('crypto-js/sha256') 

class Transaction{
    constructor(fromAddress, toAddress, amount){
        this.fromAddress = fromAddress
        this.toAddress = toAddress
        this.amount = amount
    }
}

class Block{
    constructor(timestamp, transactionData, prevHash=''){
        this.timestamp = timestamp
        this.transactionData = transactionData
        this.prevHash = prevHash
        this.hash = this.calculateHash()
        this.nounce = 0
    } 
    calculateHash(){
        return SHA256(this.prevHash  + this.timestamp + JSON.stringify(this.transactionData)+ this.nounce).toString()
    } 
    mineBlock(difficulty){
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1 ).join('0')){
            this.nounce++
            this.hash = this.calculateHash()
        }
        console.log("Block mined : ", this.hash)
    }
}

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()]
        this.difficulty = 2
        this.pendingTransactions = []
        this.miningReward = 100
    }

    createGenesisBlock(){
        return new Block(Date.now(), "Genesis Minning Token", "0")
    }
    getLatestBlock(){
        return this.chain[this.chain.length - 1]
    }
    
    minePendingTransactions(miningRewardAddress){
        let block = new Block(Date.now(), this.pendingTransactions)
        block.mineBlock(this.difficulty)
        console.log("Block Successfully mined!")
        this.chain.push(block)
        this.pendingTransactions = [
            new Transaction(null, miningRewardAddress, this.miningReward)
        ]
    }
    createTransaction(transaction){
        this.pendingTransactions.push(transaction)
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

    addBlock(newBlock){
        newBlock.prevHash = this.getLatestBlock().hash
        newBlock.mineBlock(this.difficulty)
        this.chain.push(newBlock)
    }
}

let jsCoin = new Blockchain();
// console.log("Mining Block 1...")
// jsCoin.addBlock(new Block(Date.now(), { amount: "10BTC", sender : "Evesdropper", recipient : "Alice" }))
// console.log("Mining Block 2...")
// jsCoin.addBlock(new Block(Date.now(), { amount: "8BTC" , sender : "Bob", recipient : "Alice"}))

jsCoin.createTransaction(new Transaction('fromAddress1', 'toAddress2', 10))
jsCoin.createTransaction(new Transaction('froomAddress2', 'toAddress1', 50))
// console.log(new Transaction().amount)
console.log("\n Starting miner...")
jsCoin.minePendingTransactions('miner-address')
console.log("\n Miner balance is :", jsCoin.getBalanceofAddress('miner-address'))

console.log("\n Starting miner again...")
jsCoin.minePendingTransactions('miner-address')
console.log("\n Miner balance is :", jsCoin.getBalanceofAddress('miner-address'))