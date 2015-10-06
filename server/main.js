var express = require('express'),
  app = express(),
  fs = require('fs'),
  readline = require('readline'),
  CSV = require('csv-string');


/**
 * Setup server
 */

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/data/summary', function (req, res) {
  res.json(dbTotal);
});

app.get('/data/country/:country', function(req, res) {
  var country = req.params.country;

  if (! (country in db)) {
    res.sendStatus(404);
    return;
  }
  setTimeout(function() {
    res.json(db[country]);
  }, 2000);
});

app.get('/status', function (req, res) {
  res.json({'status': 'ok'})
});

app.use('/web',express.static('../web_advanced'));
app.use('/basic',express.static('../web_basic'));
app.use('/node_modules',express.static('../node_modules'));
app.use('/scripts',express.static('../scripts'));

var startServer = function() {
  // Enable CORS

  app.listen(8000, function () {
    var host = this.address().address;
    var port = this.address().port;
    console.log('React-tutorial server listening at http://%s:%s', host, port);
  });
}



/**
 * Import data
 */


var filename = 'data/migr_imm5prv_1_Data.csv';
var fileBuffer = '';

// "db" object has three dimensions: db[country][year][gender]
var  db = {}

// "dbTotal" object has two dimensions and represents
// the aggregate by year: dbTotal[country][year]
var dbTotal = {};

var rd = readline.createInterface({
  input: fs.createReadStream(filename, {encoding: 'utf-8'}),
  output: process.stdout,
  terminal: false
});

rd.on('line', function(line) {
  // Skip header line
  if (line.indexOf('TIME') < 0) {
    fileBuffer += line +'\n';
  }
});

rd.on('pause', function() {
  // At the end of the file, parse each line and store it in db and dbTotal.

  data = CSV.parse(fileBuffer);
  for (var i = 0; i < data.length; i++ ) {
    var country = data[i][1];
    var year = data[i][0];
    var origin = data[i][2];
    var age = data[i][3];
    var gender = data[i][4];
    var value = data[i][6];

    if (country.length > 0 && year.length > 0) {
      if (! (country in dbTotal)) {
        dbTotal[country] = {};
        db[country] = {};
      }

      if (age == 'TOTAL' && gender == 'Total' && value !== ':') {
        dbTotal[country][year] = value;
      }
      else if (age == 'TOTAL' && value !== ':') {
        if (! (year in db[country])) {
          db[country][year] = {}
        }
        db[country][year][gender] = value;
      }
    }
  }

  console.log('Data ready: ', data.length, ' elements loaded');
  startServer();
})


