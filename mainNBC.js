// let Blockchain = require("./nodeBC");

// let b2 = new Blockchain();

// const PROOF = 10;

// let validateProof = (proof) => {
//     let guessHash = Math.random(proof);
//     console.log("HASHING ", guessHash);
//     return guessHash == Math.random(PROOF);
// }

// let proofOfWork = () => {
//     let proof = 0;
//     while(true){
//         if(!validateProof()){
//             proof++;
//         }else{
//             break;
//         }
//     }
//     return proof;
// }

// if(proofOfWork() == PROOF){
//     b2.addNewTransaction("Bob", "Aice", 10);
//     let prevHash = b2.getLastBlock() ? b2.getLastBlock().hash : null;
//     b2.addBlock(prevHash);
// }

// console.log(b2.chain);



let Blockchain = require("./nodeBC");

let b2 = new Blockchain();

const HASH = require('hash.js')
const PROOF = 15
const proofs = 2

let validateProof = () => {
    let guessHash = HASH.sha256().update(proofs).digest('hex')
    console.log("HASHING:", guessHash + " "+proofs)
    return guessHash == HASH.sha256().update(PROOF).digest('hex')
}
let proofOfWork = () => {
    let proof = 0
    while(true){
        if(!validateProof()){
            proof++
            console.log(proof)
        }else{
            break;
        }
    }
    return proof
}

console.log(proofOfWork())

if(proofOfWork() == PROOF){
    b2.addNewTransaction("Bob", "Aice", 10);
    let prevHash = b2.getLastBlock().hash ? b2.getLastBlock().hash : null;
    b2.addBlock(prevHash);
}else{

}

console.log(b2.chain);