/**
 * This is the trades model.
 * Creating schema for trades
 *
 * @class trades
 */
var mongoose = require('mongoose')

var tradesSchema = new mongoose.Schema(
    {
        portfolioId: { type: mongoose.Schema.Types.ObjectId, ref: 'portfolio' },
        securitiesId: { type: mongoose.Schema.Types.ObjectId, ref: 'securities' },
        type: { type: String, required: true },
        shares: { type: Number, required: true },
        costOfShare: { type: Number, required: true },
        createdOn: { type: Date, default: new Date() },
        updatedOn: { type: Date, default: new Date() },
    })

var collectionName = 'trades';
var trades = mongoose.model('trades', tradesSchema, collectionName);

module.exports = trades;