let hash = Math.random();
class Blockchain{
    constructor(){
        //create an empty chain first
        this.chain = [];
        
        //create transactions datas
        this.current_transaction = [];
    }

    //create method to add new block to the chain network
    addBlock(prevHash){
        let block = {
            index : this.chain.length + 1,
            timestamp : Date.now(),
            transactions : this.current_transaction,
            // hash : null,
            prevHash : prevHash,
            calculateHash(){
                return hash*this.index;
            },
        };
        this.hash = calculateHash();
        this.chain.push(block);
        this.current_transaction = [];
        return block;
    }
    
    //create method that allow to add new transaction
    addNewTransaction(sender, recipient, amount){
        this.current_transaction.push({ sender, recipient, amount });
    }
    
    //this methods get the latest block for us
    getLastBlock(){
        return this.chain.slice(-1)[0];
    }

    isEmpty(){
        return this.chain.length == 0;
    }
}

module.exports  = Blockchain;