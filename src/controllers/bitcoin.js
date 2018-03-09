const express = require('express');
const router = express.Router();

const config = require('../config.js');

const STATUS_USER_ERROR = config.status.user_error;
const STATUS_OKAY = config.status.okay;

const { getCurrent, getPrevious } = require('../models/bitcoin.js');

router.get('/compare', (req, res) => {
let currentPrice = 0;
let previousPrice = 0;
  getCurrent()
    .then(current => currentPrice = current.bpi.USD.rate_float)
    .then(getPrevious)
    .then(previous => {
        previousPrice = Object.values(previous.bpi)[0];
        const rPrev = round(previousPrice);
        const rCurr = round(currentPrice);
        const rDiff = round(rCurr - rPrev)
        res.send({
            currentPrice: '$' + rCurr,
            previousPrice: '$' + rPrev,
            differnce: '$' + rDiff
        });
    })
    .catch(err => {
      res.status(STATUS_USER_ERROR);
      res.send({ err });
    });
});

function round(num) {
    const number = Number(num);
    return Math.ceil(number * 100) / 100
}

module.exports = router;
