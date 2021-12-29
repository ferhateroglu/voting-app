const SHA256 = require('crypto-js/SHA256');

class block{
    constructor(index,gelenData,previousHash=''){
        this.index = index;
        this.data = gelenData;
        this.previousHash=previousHash;
        this.hash=this.calculateHash();
        this.nonce =0;
    }
    calculateHash(){
        return SHA256(this.nonce+ this.data + this.previousHash).toString();
    }
    mineBlock(difficult){
        while(this.hash.substring(0,difficult) !== Array(difficult + 1 ).join("0")){
            this.nonce++;
            this.hash = this.calculateHash();
        }

    }
}

class blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.difficult = 4;
    }

    createGenesisBlock(){
        return new block('0',"Genesis Block","0");
    }
    
    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficult);
        this.chain.push(newBlock);
    }
}

exports.block = block;
exports.blockchain = blockchain;