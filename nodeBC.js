const hash = require('object-hash')
class Blockchain{
    constructor(){
        //create an empty chain first
        this.chain = []
        
        //create transactions datas
        this.current_transaction = []
    }
    //create method to add new block to the chain network
    addBlock(){
        let block = {
            index : this.chain.length + 1,
            timestamp : Date.now(),
            transactions : this.current_transaction,
            hash : this.sig,
            prevHash : (this.getLastBlock() == undefined) ? "Genesis mining token" : this.getLastBlock().hash,
        }
        this.sig = hash(block)
        this.chain.push(block)
        this.current_transaction = []
        return block
    }
    
    //create method that allow to add new transaction
    addNewTransaction(amount, sender, recipient){
        this.current_transaction.push({ amount, sender, recipient })
    }
    
    //this methods get the latest block for us
    getLastBlock(){
        return this.chain.slice(-1)[0]
    }

    isEmpty(){
        return this.chain.length == 0
    }
}

module.exports  = Blockchain