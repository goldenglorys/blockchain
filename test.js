const SHA256 = require('crypto-js/sha256') // Hash algorithms module needed to power the (C)onfidentiality (I)ntegrity (A)uthenticity


class Block{
    constructor(index, timestamp, transactionData, prevHash=''){
        this.index = index
        this.timestamp = timestamp
        this.transactionData = [transactionData]
        this.prevHash = prevHash
        this.hash = this.calculateHash()
        this.nounce = 0
    } 
    calculateHash(){
        return SHA256(this.index + this.prevHash  + this.timestamp + JSON.stringify(this.transactionData)+ this.nounce).toString()
    } 
    mineBock(difficulty){
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
    }

    createGenesisBlock(){
        return new Block(0, Date.now(), { amount : "100BTC", sender : "Genesis Minning Token", recipient : "Bob" },"0")
    }
    getLatestBlock(){
        return this.chain[this.chain.length - 1]
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
        newBlock.mineBock(this.difficulty)
        this.chain.push(newBlock)
    }
}

let jsCoin = new Blockchain();
console.log("Mining Block 1...")
jsCoin.addBlock(new Block(1, Date.now(), { amount: "10BTC", sender : "Evesdropper", recipient : "Alice" }))
console.log("Mining Block 2...")
jsCoin.addBlock(new Block(2, Date.now(), { amount: "8BTC" , sender : "Bob", recipient : "Alice"}))

