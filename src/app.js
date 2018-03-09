const express = require('express');

const config = require('./config');
const bitcoinController = require('./controllers/bitcoin.js');

const app = express();
const PORT = config.port;

app.use(bitcoinController);

app.listen(PORT, err => {
  if (err) {
    console.log(`Error starting server: ${err}`);
  } else {
    console.log(`Server listening on port ${PORT}`);
  }
});
