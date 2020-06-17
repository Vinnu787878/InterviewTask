var portfolio = require('../models/portfolio')
var securities = require('../models/securities')
var trades = require('../models/trades')
var express = require('express')
const router = express.Router()




//add securities api
router.post('/', async (req, res) => {
    try {

        const security = new securities(req.body)
        await security.save()
        res.status(200).send(security)
    } catch (e) {
        res.status(500).send(e)
    }
})

//fetching portfolio api

router.get('/fetchingPortfolio', async (req, res) => {
    try {
        let array = []
        let data = await securities.aggregate([
            {
                $lookup:
                {
                    from: "trades",
                    localField: "_id",
                    foreignField: "securitiesId",
                    as: "trade"
                }
            }
        ])
        res.status(200).send(data)
    } catch (e) {
        console.log(e);

        res.status(500).send(e)

    }
})

//fetching holdings api

router.get('/fetchingHoldings', async (req, res) => {
    try {
        let data = await securities.aggregate([
            {
                $lookup:
                {
                    from: "portfolio",
                    localField: "_id",
                    foreignField: "securitiesId",
                    as: "portfolio"
                }
            }
        ])
        res.status(200).send(data)
    } catch (e) {
        console.log(e);

        res.status(500).send(e)

    }
})
module.exports = router