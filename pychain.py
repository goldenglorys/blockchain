import hashlib as hasher
import datetime 

class Block:
    def __init__(self, index, timestamp, data, prevHash=''):
        self.index = index
        self.timestamp = timestamp
        self.data = data
        self.prevHash = prevHash
        self.hash = self.calHash()
    
    def calHash(self):
        hash = hasher.sha256()
        hash.update(
            str(self.index).encode('utf-8') +
            str(self.timestamp).encode('utf-8') +
            str(self.data).encode('utf-8') +
            str(self.prevHash).encode('utf-8'))
        return hash.hexdigest()
# print(Block('1','1','1','1').calHash())
# class Blockchain:
def genesisBlock():
    return Block(0, datetime.datetime.now(), 'Genesis Mined Block','0')

def nextBlock(lastBlock):
    thisIndex = lastBlock.index + 1
    thisTimestamp = datetime.datetime.now()
    thisData = "Hey I'm block " + str(thisIndex)
    thisHash = lastBlock.hash
    return Block(thisIndex, thisTimestamp, thisData, thisHash) 
        
# coin = Blockchain()

# class Chain:
#     def __init__(self):
#         self.chain = [genesisBlock()]

#     def genesisBlock():
#         return Block(0, datetime.datetime.now(), 'Genesis Mined Block','0')

#     def lastBlock(self):
#         return len(self.chain) - 1

#     def add(newBlock):
#         newBlock.index = len(self.chain) + 1
#         newBlock.prevHash = self.lastBlock().hash
#         newBlock.hash = newBlock.calHash()
#         self.chain.append(newBlock)

# def proofOfWork(lastProof):
#     incrementor = lastProof + 1
#     while not (incrementor % 9 == 0 incrementor % lastProof == 0):
#         incrementor += 1
#     return incrementor

def mine():
    lastBlock = blockchain[len(blockchain) - 1]
    lastProf = lastBlock.data['proof_of_work']
    proof = proofOfWork(lastProof)
    this_node_trans.append({
        'from' : 'network', 'to' : 'minerAdd', 'amount' : '1'
    })
    newIndex = lastBlock.index + 1
    newTimestamp = thisTimestamp = date.datetime.now()
    lastHash = lastBlock.hash

# coin = Chain()
# coin.add(Block('', datetime.datetime.now(), 'data...1'))
# print(coin)

# see = Chain()
# print(dir(see))

blockchain = [genesisBlock()]
prevBlock = blockchain[0]
print(prevBlock.data)
numOfBlockToAdd = 2

for i in range(0, numOfBlockToAdd):
    blockToAdd = nextBlock(prevBlock)
    blockchain.append(blockToAdd)
    prevBlock = blockToAdd
    print("Block #{} has been added to the blockchain!".format(blockToAdd.index))
    print("Previous Hash : " + blockToAdd.prevHash)
    print("Hash : {}".format(blockToAdd.hash))
    print("Block Data : " + blockToAdd.data)
    print("Timestamp : " + str(blockToAdd.timestamp)+'\n')