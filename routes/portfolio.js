var portfolio = require('../models/portfolio')
const { asyncForEach } = require("../services/async")
var express = require('express')
const router = express.Router()



//Add portfolio api
router.post('/', async (req, res) => {
    try {
        const portfolios = new portfolio(req.body)
        await portfolios.save()
        res.status(200).send(portfolios)
    } catch (e) {
        // console.log(e);

        res.send(e)
    }
})


//fetching returns api

router.get('/fetchingReturns', async (req, res) => {
    try {
        let data = 0
        let portfolios = await portfolio.find({})
        await asyncForEach(portfolios, async (obj) => {
            data = (100 - obj.averageBuyPrice) * obj.shares + data
        })
        res.status(200).send({ fetchingReturns: data })
    } catch (e) {
        console.log(e);
        res.send(e)
    }
})
module.exports = router