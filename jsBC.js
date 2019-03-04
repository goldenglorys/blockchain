// const SHA259 = require('crypto-js/sha256');
const SHAJS = require('sha.js'); //this required safe-buffer module

let hash = Math.random(); // This stands has the sha256 function that is absent in javascript
// let hash = new SHAJS.sha256().update('42').digest('hex');

let date = new Date(); // Auto capture timestamp begins here
let formatedDate = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear(); //Auto capture timestamp cont'd and end here

class Block{
    constructor(index, timestamp, data, prevHash=''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.prevHash = prevHash;
        this.hash = this.calculateHash();
    }// constructors values are initiated once pass through by the Block instance object is created 
    // and you might store the details of the transactions like(how much money was transfferd,the sender and the receiver)
    calculateHash(){
        // return SHA256(this.index + this.prevHash + this.timestamp + JSON.stringify(this.data)).toString();
    //    return new SHAJS.sha256().update(this.index + this.prevHash + this.timestamp + JSON.stringify(this.data)).toString('hex');
        return hash*this.index;
    }// this calculates the hash function of this block by taking its properties and running them through it's function 
    // and then returns the hash which is used to identify the block on the blockchain 
}

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
    }// this constructor initialize the blockchain with a property chain of array of blocks

    createGenesisBlock(){
        return new Block(0, formatedDate, { amount : "Genesis Block" },"0");
    }// this methods return  the genesis block of this blockchain 
    // and the constuctor will initialize a chain of not an empty array but with an array which contain the genesis block

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }// this method returns the latest blocks in the chain
    
    addBlock(newBlock){
        newBlock.prevHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }// this method add a new block to the chain and the newly added block gets the footprint of the previous block in it 

    // blockchain are great because once a block is added it can't be change without invalidating the restof the chain
    // so in reality you can't add a new block to a chain without proper checksum first
    validateChain(){
        for(let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const prevBlock = this.chain[i - 1];

            if(currentBlock.hash !== currentBlock.calculateHash()){
                return 'Negative';
            }

            if(currentBlock.prevHash !== prevBlock.hash){
                return 'Negative';
            }
        }

        return 'Positive';
    }// so this method help us go through and verify the integrity of our block-chain history 
}

let jsCoin = new Blockchain();
jsCoin.addBlock(new Block(1, formatedDate, { amount: 4 }));
jsCoin.addBlock(new Block(2, formatedDate, { amount: 8 }))
console.log(JSON.stringify(jsCoin ,1, 1))
console.info("And the chain is " +jsCoin.validateChain());

jsCoin.chain[1].timestamp = '4/2/2016';
jsCoin.chain[1].data = { amount: 100 };
jsCoin.chain[1].hash = jsCoin.chain[1].calculateHash();

console.info("And is the chain valid agian? " +jsCoin.validateChain());