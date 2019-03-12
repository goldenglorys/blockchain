import datetime
import hashlib

class Block:
    blockNo = 0 
    data = None
    next = None
    hash = None
    nouce = 0
    prevHash = 0x0
    timestamp = datetime.datetime.now()
    
    def __init__(self, data):
        self.data = data
        # print(data)

    def hash(self):
        h = hashlib.sha256()
        h.update(
            str(self.blockNo).encode('utf-8') +
            str(self.data).encode('utf-8') +
            str(self.nouce).encode('utf-8') +
            str(self.prevHash).encode('utf-8') +
            str(self.timestamp).encode('utf-8') 
        )

    def __str__(self):
        return "Block Hash: " + str(self.hash()) + "\n BlockNo: " + str(self.blockNo)
# Block("Block " + str(1))
class Blockchain:
    diff = 20
    maxNonce = 2**32
    target = 2**(256-diff)

    block = Block("Genesis")
    dummy = head = block

    def add(self, block):
        block.prevHash = self.block.hash()
        block.blockNo = self.block.blockNo + 1

        self.block.next = block
        self.block = self.block.next

    def mine(self, block):
        print(block)
        # for i in range(self.maxNonce):
        #     if int(block.hash(), 16) <= self.target:
        #         self.add(block)
        #         print(block)
        #         break
        #     else:
        #         block.nouce += 1

blockchain = Blockchain()

for x in range(10):
    blockchain.mine(Block("Block " + str(x+1)))

while blockchain.head != None:
    print(blockchain.head)
    blockchain.head = blockchain.head.next