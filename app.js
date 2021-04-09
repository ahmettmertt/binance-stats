'use strict';

const express = require('express');
const path = require('path')
const Binance = require('node-binance-api');
const auth = require('./auth');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

var binance;
var logged_in = false;
if(auth && auth.api_key && auth.api_secret){
  binance = new Binance().options({
	APIKEY: auth.api_key,
	APISECRET: auth.api_secret
  });
  logged_in = true;
}else{
  binance = new Binance();
}


// App
const app = express();
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/data', (req, res) => {
  var hot_b = 0;

  // Getting latest price of a symbol
  binance.prices(function(error, ticker) {
	//console.log("prices()", ticker);
	console.log("Price of BTC: ", ticker.BTCUSDT);
	hot_b = ticker.BTCUSDT;
	res.send(hot_b);
  });

  // Getting list of current balances
  /*binance.balance(function(error, balances) {
	//console.log("balances()", balances);
	if ( typeof balances.HOT !== "undefined" ) {
		console.log("HOT balance: ", balances.HOT.available);
		hot_b = balances.HOT.available;
	}
  });*/

//  res.send('Hello World'+hot_b);


});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
