/*########################
##    CONFIGURATION     ##
########################*/

// Step 1: Set up the appropriate configuration 
var Web3 = require("web3") 
var EthereumTransaction = require("ethereumjs-tx") 
// New ethereumtx have different syntax, which will also affect the way we create the rawTransaction
// https://ethereum.stackexchange.com/questions/84357/
const EthereumTx = require('ethereumjs-tx').Transaction
var web3 = new Web3('HTTP://127.0.0.1:7545')

// Step 2: Set the sending and receiving addresses for the transaction. 
var sendingAddress = '0x781533b25488b232Ff9dF496AB0B015CB21D76fF'
var receivingAddress = '0x71176c97f84b658308F344ccc569577c39586b0E'

// Step 3: Check the balances of each address 
web3.eth.getBalance(sendingAddress).then(console.log) 
web3.eth.getBalance(receivingAddress).then(console.log)

/*########################
## CREATE A TRANSACTION ## 
########################*/

// Step 4: Set up the transaction using the transaction variables as shown 
var rawTransaction = { 
	nonce: web3.utils.toHex(0),
    to: receivingAddress,
    gasPrice: web3.utils.toHex(20000000),
    gasLimit: web3.utils.toHex(30000),
    value: web3.utils.toHex(100),
    data: web3.utils.toHex("")
}

// Step 5: View the raw transaction 
//rawTransaction

// Step 6: Check the new account balances (they should be the same) 
web3.eth.getBalance(sendingAddress).then(console.log) 
web3.eth.getBalance(receivingAddress).then(console.log)

// Note: They haven't changed because they need to be signed...

/*########################
## Sign the Transaction ##
########################*/

// Step 7: Sign the transaction with the Hex value of the private key of the sender 
var privateKeySender = 'b88a97f2ead81a90a88f1af08bec541657720b98fc1f6db54167117b893225d3' 
var privateKeySenderHex = new Buffer.from(privateKeySender, 'hex') 
var transaction = new EthereumTx(rawTransaction) 
transaction.sign(privateKeySenderHex)

/*#######################################
## Send the transaction to the network ##
#######################################*/

// Step 8: Send the serialized signed transaction to the Ethereum network. 
var serializedTransaction = transaction.serialize(); 
web3.eth.sendSignedTransaction(serializedTransaction);

