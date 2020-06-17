/**
 * This is the portfolio model.
 * Creating schema for portfolio
 *
 * @class portfolio
 */
var mongoose = require('mongoose')

var portfolioSchema = new mongoose.Schema(
  {
    tickerSymbol: { type: String, required: true, unique: true },
    securitiesId: { type: mongoose.Schema.Types.ObjectId, ref: 'securities' },
    beforeAverageBuyPrice: { type: Number, required: true, default: 0 },
    averageBuyPrice: { type: Number, required: true },
    beforeShares: { type: Number, required: true, default: 0 },
    shares: { type: Number, required: true },
    createdOn: { type: Date, default: new Date() },
    updatedOn: { type: Date, default: Date.now },
  })


var collectionName = 'portfolio';
var portfolio = mongoose.model('portfolio', portfolioSchema, collectionName);

module.exports = portfolio;