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

  // Periods: 1m,3m,5m,15m,30m,1h,2h,4h,6h,8h,12h,1d,3d,1w,1M
  binance.candlesticks("HOTUSDT", "1m", function(error, ticks) {
	console.log("candlesticks()", ticks);
	let last_tick = ticks[ticks.length - 1];
	let [time, open, high, low, close, volume, closeTime, assetVolume, trades, buyBaseVolume, buyAssetVolume, ignored] = last_tick;
	//console.log("BNBBTC last close: "+close);
        res.send(ticks);
  });

  // Getting latest price of a symbol
  /*binance.prices(function(error, ticker) {
	//console.log("prices()", ticker);
	console.log("Price of BTC: ", ticker.BTCUSDT);
	hot_b = ticker.BTCUSDT;
	res.send(hot_b);
  });*/

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
