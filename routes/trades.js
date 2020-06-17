const trades = require('../models/trades')
const portfolio = require("../models/portfolio")
const express = require('express')
const router = express.Router()



router.post('/', async (req, res) => {
    try {
        if (!req.body.portfolioId) {
            return res.status(500).send({ message: 'portfolioId Required' })
        }

        if (!req.body.securitiesId) {
            return res.status(500).send({ message: 'securitiesId Required' })
        }
        let portfolios = await portfolio.findById(req.body.portfolioId)

        if (req.body.type === "bought") {
            let averageBuyPrice = ((portfolios.averageBuyPrice * portfolios.shares) + (req.body.costOfShare * req.body.shares)) / (portfolios.shares + req.body.shares)
            averageBuyPrice = averageBuyPrice.toFixed(2);
            let shares = portfolios.shares + req.body.shares

            await portfolio.findOneAndUpdate({ _id: req.body.portfolioId },
                {
                    beforeAverageBuyPrice: portfolios.averageBuyPrice,
                    beforeShares: portfolios.beforeShares,
                    averageBuyPrice: averageBuyPrice,
                    shares: shares
                })
        } else if (req.body.type === "sold") {
            let shares = portfolios.shares - req.body.shares
            if (Math.sign(shares) == -1) {
                return res.send({ Message: "Can not buy more than existed shares" })
            }
            await portfolio.findOneAndUpdate({ _id: req.body.portfolioId },
                {
                    shares: shares
                })
        }
        const trade = new trades(req.body)
        await trade.save()
        res.status(200).send(trade);
    } catch (e) {
        res.status(500).send(e.message)
    }
})

router.put('/', async (req, res) => {
    try {
        if (!req.query.tradeId) {
            return res.status(500).send({ message: 'tradeId Required' })
        }

        let trade = await trades.findOneAndUpdate({ _id: req.query.tradeId }, { $set: req.body }, { new: true })
        console.log("trade", trade)
        let portfolios = await portfolio.findById(trade.portfolioId)
        console.log("portfolios", portfolios);

        if (trade.type === "bought") {
            let averageBuyPrice = ((portfolios.beforeAverageBuyPrice * portfolios.beforeShares) + (trade.costOfShare * trade.shares)) / (portfolios.shares + trade.shares)
            averageBuyPrice = averageBuyPrice.toFixed(2);
            let shares = portfolios.shares + trade.shares

            await portfolio.findOneAndUpdate({ _id: trade.portfolioId },
                {
                    beforeAverageBuyPrice: portfolios.averageBuyPrice,
                    beforeShares: portfolios.beforeShares,
                    averageBuyPrice: averageBuyPrice,
                    shares: shares
                })
        } else if (trade.type === "sold") {
            let shares = portfolios.shares - trade.shares
            if (Math.sign(shares) == -1) {
                return res.send({ Message: "Can not sell more than existed shares" })
            }
            await portfolio.findOneAndUpdate({ _id: trade.portfolioId },
                {
                    shares: shares
                })
        }
        res.status(200).send(trade)


    } catch (e) {
        res.status(500).send(e.message)
    }
})

router.delete('/', async (req, res) => {
    try {
        if (!req.query.tradeId) {
            return res.status(500).send({ message: 'tradeId Required' })
        }


        let trade = await trades.findById(req.query.tradeId)
        if (!trade) {
            return res.status(500).send({ message: 'tradeId Invalid' })
        }
        let portfolios = await portfolio.findById(trade.portfolioId)
        console.log(tarde);

        let shares = portfolios.shares - trade.shares
        if (Math.sign(shares) == -1) {
            return res.send({ Message: "Can not sell more than existed shares" })
        }

        await portfolio.findOneAndUpdate({ _id: trade.portfolioId },
            {
                shares: shares
            })
        await trades.findOneAndDelete({ _id: req.query.tradeId })
        res.status(200).send({ message: "Trade deleted successfully" })
    } catch (e) {
        console.log(e);
        res.status(500).send(e.message)
    }
})




module.exports = router