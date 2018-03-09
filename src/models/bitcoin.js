const fetch = require('node-fetch');
const config = require('../config.js');

const URL_CURRENT = 'https://api.coindesk.com/v1/bpi/currentprice.json';
const URL_PREVIOUS = 'https://api.coindesk.com/v1/bpi/historical/close.json?for=yesterday';
const URL_DATE = 'https://api.coindesk.com/v1/bpi/historical/close.json?';

function getCurrent() {
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

function getPrevious() {
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

function getDate(start, end) {
  let url = '';
  if (!end) url = URL_DATE + 'start=' + start + '&end=' + start;
  else url = URL_DATE + 'start=' + start + '&end=' + end;
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(res => res.json())
      .then(date => {
        resolve(date);
      })
      .catch(err => {
        reject(err);
      });
  });
}

module.exports = { getCurrent, getPrevious, getDate };
