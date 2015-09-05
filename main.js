var express = require('express'),
  app = express(),
  fs = require('fs'),
  readline = require('readline'),
  CSV = require('csv-string'),
  filename = process.argv[2],
  lines = [];
//
//
//var rd = readline.createInterface({
//    input: fs.createReadStream(filename, {encoding: 'utf-8'}),
//    output: process.stdout,
//    terminal: false
//});
//
//rd.on('line', function(line) {
//    var splittedLine = line.split("\t");
//    var newLineJSON = {
//        'ip': splittedLine[0],
//        'city': splittedLine[1],
//        'country': splittedLine[2],
//        'latitude': splittedLine[3],
//        'longitude': splittedLine[4],
//        'date': splittedLine[5],
//        'request': splittedLine[6].replace(/"/g, ""),
//        'status_code': splittedLine[7],
//        'content_size': splittedLine[8]
//    };
//
//    lines.push(newLineJSON);
//});
//
//app.get('/data', function (req, res) {
//  var tenLines =[];
//  for(var i = 0; i < 10; i++) {
//      tenLines.push(lines[Math.floor(Math.random()*lines.length)]);
//  }
//  res.json(tenLines);
//});


/**
 * Migrants API
 */

var dbfile = "";
var db = {};
var filename = 'data/migr_imm5prv_1_Data.csv'

var rd = readline.createInterface({
  input: fs.createReadStream(filename, {encoding: 'utf-8'}),
  output: process.stdout,
  terminal: false
});

rd.on('line', function(line) {
  if (line.indexOf('TIME') < 0) {
    dbfile += line +'\n';
  }
});

rd.on('pause', function() {
  data = CSV.parse(dbfile);
  for (var i = 0; i < data.length; i++ ) {
    var country = data[i][1];
    var year = data[i][0];
    var origin = data[i][2];
    var age = data[i][3];
    var gender = data[i][4];
    var value = data[i][6];

    if (country.length > 0 && year.length > 0) {
      if (! (country in db)) {
        db[country] = {};
      }

      if (age == 'TOTAL' && gender == 'Total' && value !== ':') {
        db[country][year] = value;
      }
    }
  }
  console.log("Data ready.", data.length);
})


app.get('/data/summary', function (req, res) {
  res.json(db);
});


app.get('/status', function (req, res) {
  res.json({"status": "ok"})
});


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


var server = app.listen(8000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
