const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    address: { type: String, required: true, unique: true },
});

module.exports = mongoose.model('Account', accountSchema);