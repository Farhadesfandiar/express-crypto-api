const express       = require('express');
const mongoose      = require('mongoose');

const ethereumApi = require('./src/EthereumApi.js');
const { saveAccount, saveTransaction, getTransactionsByAccount } = require('./db/mongoUtils');

const router        = express.Router();
const ethApi= new ethereumApi();

router.use(express.json()); // Middleware to parse JSON requests

// MongoDB connection
mongoose.connect('mongodb://zapper-mongo:27017/ali_data', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

/**
 * Challenge Number 2
 * Fetch transactions of given account address by Tatum API
 * Records it in the database
 */
router.get('/api/transactions/:account', async (req, res) => {
    const accountAddress = validateString(req.params.account, res);
    const transactions = await ethApi.getTransactions(accountAddress);
    console.log(transactions);
    await saveAccount(accountAddress);
    for (const tx of transactions) {
        await saveAccount(tx.to);
        await saveTransaction(tx);
    }
    res.json(transactions);
});

/**
 * Challenge Number 2
 * Fetch transactions of the given account address from database
 */
router.get('/api/transactions/db/:account', async (req, res) => {
    const accountAddress = validateString(req.params.account, res);
    const transactions = await getTransactionsByAccount(accountAddress);

    res.json(transactions);
});

/**
 * Fetch balance of the given account address by API
 */
router.get('/api/account/balance/:account', async (req, res) => {
    const accountAddress = validateString(req.params.account, res);
    const balance = await ethApi.getAccountBalance(accountAddress);

    res.json(balance);
});

/**
 * Challenge Number 4
 * Fetch balance of the given token for the given wallet address by API
 */
router.get('/api/account/token-balance/', async (req, res) => {
    const { tokenAddress, walletAddress, decimals } = req.body;

    if (!tokenAddress || !walletAddress) {

        return res.status(400).json({ error: 'Token contract address and wallet address are required.' });
    }

    var result = await ethApi.getTokenBalance(tokenAddress, walletAddress);

    // validate the response
    if(!result.result) {
        return res.status(400).json(result);
    }

    // the balance in response is in hex. it should be converted to int (wei) and then to the appropriate unit
    const rawBalance = result.result;
    var balance = parseInt(rawBalance, 16);
    balance = balance / (10 ** decimals);

    res.json(balance);
});


/**
 * To prevent differentiation between upper and lower letters in the address/hash
 * @param address
 * @returns {string}
 */
function validateString(address, res) {
    if(!address) {
        res.json({"error": "Please make sure you enter the account address!"}) ;
    }

    // Ensure the string starts with '0x'
    if (!address.startsWith('0x')) {
        res.json({"error": 'Invalid address format: must start with "0x"'});
    }

    // Convert everything after '0x' to lowercase and concatenate with '0x'
    return '0x' + address.slice(2).toLowerCase();
}

module.exports = router;
