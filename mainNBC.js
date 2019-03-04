let Blockchain = require("./nodeBC");

let b2 = new Blockchain();

const PROOF = 10;

let validateProof = (proof) => {
    let guessHash = Math.random(proof);
    console.log("HASHING ", guessHash);
    return guessHash == Math.random(PROOF);
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

