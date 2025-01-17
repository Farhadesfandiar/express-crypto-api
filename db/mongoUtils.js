const Account = require('../models/accountModel');
const Transaction = require('../models/transactionModel');

/**
 * Save or update account in the database
 * @param {String} address -
 */
async function saveAccount(address) {
    try {
        return await Account.findOneAndUpdate(
            { address },
            { address },
            { upsert: true, new: true }
        );
    } catch (error) {
        console.error(`Error saving account (${address}):`, error.message);
        throw error;
    }
}

/**
 * Save transaction in the database
 * @param {Object} tx - Transaction data
 */
async function saveTransaction(tx) {
    try {
        const {
            transactionHash: tx_hash,
            from: sender,
            to: receiver,
            value: amount,
            gas: gasUnit,
            timestamp,
        } = tx;

        const etherAmount = weiToEth(amount);

        await Transaction.updateOne(
            { tx_hash },
            {
                tx_hash,
                from: sender,
                to: receiver,
                amount: etherAmount,
                gas_unit: gasUnit,
                date: new Date(timestamp),
            },
            { upsert: true }
        );
    } catch (error) {
        console.error(`Error saving transaction (${tx.transactionHash}):`, error.message);
        throw error;
    }
}

/**
 * Fetch transactions by account address
 * @param {String} accountAddress -
 * @returns {Array} Transactions related to the account
 */
async function getTransactionsByAccount(accountAddress) {
    try {
        return await Transaction.find({
            $or: [{ from: accountAddress }, { to: accountAddress }],
        });
    } catch (error) {
        console.error(`Error fetching transactions for account (${accountAddress}):`, error.message);
        throw error;
    }
}

function weiToEth(wei) {
    const weiPerEth = 10 ** 18; // 1 ETH = 10^18 Wei
    return wei / weiPerEth;
}

module.exports = {
    saveAccount,
    saveTransaction,
    getTransactionsByAccount,
};