    const SHA256 = require('crypto-js/sha256') // Hash algorithms module needed to power the (C)onfidentiality (I)ntegrity (A)uthenticity

    let date = new Date() // Auto capture timestamp begins here
    let dateSend = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear() // ...auto capture timestamp cont'd and end here
    let timeSend = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() // ...auto capture timestamp cont'd and end here


    // This class get the new incoming block data and prepares it to be push 
    // ...to Blockchain class that will process and pass it to the on-ready blocks of chain
    class Block{
        constructor(index, timestamp, formatedDate, formatedTime, transactionData, prevHash=''){
            this.index = index
            this.timestamp = timestamp
            this.formatedDate = formatedDate
            this.formatedTime = formatedTime
            this.transactionData = [transactionData]
            this.prevHash = prevHash
            this.hash = this.calculateHash()
        } // Constructors values are initiated once it values are passes through by the Block instance object created 
        // ...and you might store the details of the transactions inside the block constructor also like (how much money was transferd, the sender and the receiver)
        
        calculateHash(){
            return SHA256(this.index + this.prevHash + this.formatedDate + this.formatedTime + this.timestamp + JSON.stringify(this.transactionData)).toString()
        }// This calculates the hash function of this block by taking its properties and running them through it's function 
        // ...and then returns the hash which is used to identify the block on the blockchain 
    }


    // This class takes the already made incoming single block of data verifies it's CIA 
    // ...and passes it into the chain network if the block pass the CIA test prepare by it
    class Blockchain{
        constructor(){
            // this.chain = []
            this.chain = [this.createGenesisBlock()]
        }// This constructor initialize the block-of-chain that is an array
        // ...and it then append the incoming blocks to the decentralized p-2-p network

        createGenesisBlock(){
            return new Block(0, Date.now(), dateSend, timeSend, { amount : "100BTC", sender : "Genesis Minning Token", recipient : "Bob" },"0")
        }// This method return the genesis block of this blockchain and it's pass into the initialize chain network
        // This isn't the proper way to generate the genesis  block but it's the proper protocol

        getLatestBlock(){
            return this.chain[this.chain.length - 1]
        }// This method returns the latest/last added block in the chain network
        
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
        }// So this method help us test the incoming block for it CIA to the chain-network history 

        addBlock(newBlock){
            newBlock.prevHash = this.getLatestBlock().hash
            newBlock.hash = newBlock.calculateHash()
            this.chain.push(newBlock)
        }// This method add a new block to the chain with the passed info 
        // ... from the Block class instance and the newly added block gets the footprint of the previous block in it 

        // BUT Blockchain are great because once a block is added it can't be change without validating from the rest of the chain
        // So in reality you can't add a new block to a chain without proper checksum first
    }

let jsCoin = new Blockchain();
jsCoin.addBlock(new Block(1, Date.now(), dateSend, timeSend, { amount: "10BTC", sender : "Evesdropper", recipient : "Alice" }))
jsCoin.addBlock(new Block(2, Date.now(), dateSend, timeSend, { amount: "8BTC" , sender : "Bob", recipient : "Alice"}))
console.log(JSON.stringify(jsCoin ,1, 1))

// jsCoin.chain[1].data = { amount: "1000BTC" }
// jsCoin.chain[1].hash = jsCoin.chain[1].calculateHash()

console.info("And is the chain valid agian? " +jsCoin.validateChain())
