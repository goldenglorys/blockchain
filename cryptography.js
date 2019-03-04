const UUID = require('uuid');
const HASH = require('hash.js') //this required minimalistic-assert module
const SHAJS = require('sha.js'); //this required safe-buffer module
const MD5 = require('md5.js'); //this required hash-base module
const BASE64 = require('js-base64').Base64;


// console.log(UUID.v4());

// console.log(HASH.sha256().update('abc').digest('hex'));

// console.log(new SHAJS.sha256().update('42').digest('hex'));
// console.log(SHAJS('sha256').update('42').digest('hex'))
console.log(SHAJS('sha256').update('42').toString('hex'))

// console.log(new MD5().update('42').digest('hex'))

// console.log(BASE64.encode('Glory'));
// console.log(BASE64.decode('R2xvcnk'));


let Blockchain = require("./nodeBC");

let b2 = new Blockchain();

const HASH = require('hash.js')
const PROOF = 1560;

let validateProof = (proof) => {
    let guessHash = HASH.sha256().update(proof).digest('hex');
    console.log("HASHING: ", guessHash);
    return guessHash ==HASH.sha256().update(PROOF).digest('hex');
}

let proofOfWork = () => {
    let proof = 0;
    while(true){
        if(!validateProof()){
            proof++;
        }else{
            break;
        }
    }
    return proof;
}

if(proofOfWork() == PROOF){
    b2.addNewTransaction("Bob", "Aice", 10);
    let prevHash = b2.getLastBlock() ? b2.getLastBlock().hash : null;
    b2.addBlock(prevHash);
}

console.log(b2.chain);



                                // MAIN BC MODULE  


// const HASH = require('hash.js')
// // let hash = Math.random();
// class Blockchain{
//     constructor(){
//         //create an empty chain first
//         this.chain = [];
        
//         //create transactions datas
//         this.current_transaction = [];
//     }

//     //create method to add new block to the chain network
//     addBlock(prevHash){
//         let block = {
//             index : this.chain.length + 1,
//             timestamp : Date.now(),
//             transactions : this.current_transaction,
//             // hash : null,
//             prevHash : prevHash,
//             calculateHash(){
//                 return HASH.sha256().update(block).digest('hex');
//             },
//         };
//         this.hash = calculateHash();
//         this.chain.push(block);
//         this.current_transaction = [];
//         return block;
//     }
    
//     //create method that allow to add new transaction
//     addNewTransaction(sender, recipient, amount){
//         this.current_transaction.push({ sender, recipient, amount });
//     }
    
//     //this methods get the latest block for us
//     getLastBlock(){
//         return this.chain.slice(-1)[0];
//     }

//     isEmpty(){
//         return this.chain.length == 0;
//     }
// }

// module.exports  = Blockchain;