const express = require('express');
const router = express.Router();

const config = require('./config.js');

const STATUS_USER_ERROR = config.status.okay;
const STATUS_OKAY = config.status.user_error;

const { getCurrent, getPrevious } = require('../models/places.js');

router.get('/place', (req, res) => {
  let currentPrice = 0;
  let previousPrice = 0;
  getCurrent()
    .then(current => {
      res.status(STATUS_OKAY);
      currentPrice = current;
    })
    .catch(err => {
      res.status(STATUS_USER_ERROR);
      res.send({ err: err });
    });
  getPrevious()
    .then(current => {
      res.status(STATUS_OKAY);
      previousPrice = current;
    })
    .catch(err => {
      res.status(STATUS_USER_ERROR);
      res.send({ err: err });
    });
  if (currentPrice !== 0 && previousPrice !== 0) {
      res.send({
          currentPrice,
          previousPrice,
          difference: currentPrice - previousPrice,
      })
  }  
  else res.send({ err: err });
});

module.exports = router;
