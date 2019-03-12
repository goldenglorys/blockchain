import hashlib as hasher
import datetime 

class Block:
    def __init__(self, index, timestamp, data, prevHash):
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

def genesisBlock():
    return Block(0, datetime.datetime.now(), 'Genesis Mined Block','0')

def nextBlock(lastBlock):
    thisIndex = lastBlock.index + 1
    thisTimestamp = datetime.datetime.now()
    thisData = "Hey I'm block " + str(thisIndex)
    thisHash = lastBlock.hash
    return Block(thisIndex, thisTimestamp, thisData, thisHash) 

blockchain = [genesisBlock()]
prevBlock = blockchain[0]

numOfBlockToAdd = 20

for i in range(0, numOfBlockToAdd):
    blockToAdd = nextBlock(prevBlock)
    blockchain.append(blockToAdd)
    prevBlock = blockToAdd
    print("Block #{} has been added to the blockchain!".format(blockToAdd.index))
    print("Hash : {}\n".format(blockToAdd.hash))