let Blockchain = require("./nodeBC")

let b2 = new Blockchain()

const hash = require('object-hash')
const PROOF = 200

let validateProof = () => {
    let guessHash = hash(proof)
    console.log("GUESSHASH:", guessHash, "Incorrect")
    return guessHash == hash(PROOF)
}
let proofOfWork = () => {
     proof = 0
    while(true){
        if(!validateProof()){
            proof++
            // console.log(proof)
        }else{
            break
        }
    }
    return proof
}

if(proofOfWork() == PROOF){
    b2.addNewTransaction( "10ETH", "Bob",  "Alice")
    // let prevHash = (b2.getLastBlock() == null) ? "Genesis Mining Token" :  b2.getLastBlock().hash
    b2.addBlock()
    b2.addNewTransaction( "20ETH", "Pence",  "Trump")
    b2.addBlock()
    b2.addNewTransaction( "30ETH", "Pelosi",  "Hillary Crooke")
    b2.addBlock()
}

console.log(JSON.stringify(b2.chain, null, 1))