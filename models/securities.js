/**
 * This is the securities model.
 * Creating schema for securities
 *
 * @class securities
 */
var mongoose = require('mongoose')

var securitiesSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        createdOn: { type: Date, default: Date.now },
        updatedOn: { type: Date, default: Date.now }
    })

var collectionName = 'securities';
var securities = mongoose.model('securities', securitiesSchema, collectionName);

module.exports = securities;