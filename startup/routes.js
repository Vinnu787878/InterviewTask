const express = require('express');
const bodyParser = require('body-parser');

const trades = require('../routes/trades')
const portfolio = require('../routes/portfolio')
const securities = require('../routes/securities')
const cors = require('../middleware/cors')


module.exports = function (app) {
  app.use(cors)
  app.use(bodyParser({
    limit: '50mb'
  }));
  app.use(express.json());
  app.use('/api/portfolio', portfolio)
  app.use('/api/securities', securities)
  app.use('/api/trades', trades)

};
