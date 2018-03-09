const fetch = require('node-fetch');
const config = require('../../config.js');

const URL_CURRENT = 'https://api.coindesk.com/v1/bpi/currentprice.json';
const URL_PREVIOUS = 'https://api.coindesk.com/v1/bpi/historical/close.json?for=yesterday';

function getCurrent(term) {
  return new Promise((resolve, reject) => {
    fetch(URL_CURRENT)
      .then(res => res.json())
      .then(current => {
        resolve(current);
      })
      .catch(err => {
        reject(err);
      });
  });
}

function getPrevious(ids) {
  return new Promise((resolve, reject) => {
    fetch(URL_PREVIOUS)
      .then(res => res.json())
      .then(previous => {
        resolve(previous);
      })
      .catch(err => {
        reject(err);
      });
  });
}

module.exports = { getCurrent, getPrevious };
