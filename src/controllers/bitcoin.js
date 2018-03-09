const express = require('express');
const router = express.Router();

const config = require('../config.js');

const STATUS_USER_ERROR = config.status.user_error;
const STATUS_OKAY = config.status.okay;

const { getCurrent, getPrevious, getDate } = require('../models/bitcoin.js');

router.get('/compare', (req, res) => {
  if (!req.query.date && !req.query.start) {
    let currentPrice = 0;
    let previousPrice = 0;
    getCurrent()
      .then(current => (currentPrice = current.bpi.USD.rate_float))
      .then(getPrevious)
      .then(previous => {
        previousPrice = Object.values(previous.bpi)[0];
        const rPrev = round(previousPrice);
        const rCurr = round(currentPrice);
        const rDiff = round(rCurr - rPrev);
        res.send({
          currentPrice: '$' + rCurr,
          previousPrice: '$' + rPrev,
          difference: '$' + rDiff,
        });
      })
      .catch(err => {
        res.status(STATUS_USER_ERROR);
        res.send({ err });
      });
  } else if (req.query.date) {
    getDate(req.query.date)
      .then(date => {
        const price = round(Object.values(date.bpi)[0]);
        res.status(STATUS_OKAY);
        res.send({ date: req.query.date, price: '$' + price });
      })
      .catch(err => {
        res.status(STATUS_USER_ERROR);
        res.send({ err });
      });
  } else if (req.query.start && req.query.end) {
    getDate(req.query.start, req.query.end)
      .then(date => {
        const dates = date.bpi;
        res.status(STATUS_OKAY);
        res.send({ dates });
      })
      .catch(err => {
        res.status(STATUS_USER_ERROR);
        res.send({ err });
      });
  }
});

function round(num) {
  const number = Number(num);
  return Math.ceil(number * 100) / 100;
}

module.exports = router;
