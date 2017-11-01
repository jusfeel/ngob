const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const useragent = require('express-useragent');

var _ = require('underscore');
var rxjs = require('rxjs');

// server setup
const app = express();

app.use(cors());
app.options('*', cors());
app.use(logger('dev'));
app.use(useragent.express());

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());

// View engine to server static page
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'server/public')));

// Add routes
var debounce = require('debounce');
app.use('/whatever/:id', function(req, res, next) {
  let dataSet;

  console.log("I received: ", req.params.id);
  switch(req.params.id) {
    case "f":
      dataSet = ["apple", "pear", "peach", "banana", "pineapple"];

      // the network is bad all of a sudden
      setTimeout(function() {
        console.log("send res");
        res.json({ data: dataSet });
      }, 3000);
      break;
    case "a":
      dataSet = ["dogs", "cats", "dolpins", "elephons", "tigers"];
      res.json({ data: dataSet });
      break;
    case "s":
      dataSet = ["basketball", "soccer", "boxing", "swimming", "running"];
      res.json({ data: dataSet });
      break;
  }

  /* Real world mimicing */
  // setTimeout(function() {
  //     console.log("debouncing..");
  //     res.json({ data: dataSet });
  //   }, Math.round(150 + Math.random(3) * 1200));


});


// Create HTTP server
const port = process.env.PORT || '3000';
app.set('port', port);
const server = http.createServer(app);
server.listen(port, () => console.log(`API SERVER running on localhost:${port}`));
