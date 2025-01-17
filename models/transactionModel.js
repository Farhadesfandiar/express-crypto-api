const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    tx_hash: { type: String, required: true, unique: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    amount: { type: String, required: true }, // Amount in Ether
    gas_unit: { type: Number, required: true },
});

module.exports = mongoose.model('Transaction', transactionSchema);