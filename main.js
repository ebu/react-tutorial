var express = require('express'),
    app = express(),
    fs = require('fs'),
    readline = require('readline'),
    filename = process.argv[2],
    lines = [];


var rd = readline.createInterface({
    input: fs.createReadStream(filename, {encoding: 'utf-8'}),
    output: process.stdout,
    terminal: false
});

rd.on('line', function(line) {
    var splittedLine = line.split("\t");
    var newLineJSON = {
        'ip': splittedLine[0],
        'city': splittedLine[1],
        'country': splittedLine[2],
        'latitude': splittedLine[3],
        'longitude': splittedLine[4],
        'date': splittedLine[5],
        'request': splittedLine[6].replace(/"/g, ""),
        'status_code': splittedLine[7],
        'content_size': splittedLine[8]
    };

    lines.push(newLineJSON);
});

app.get('/data', function (req, res) {
    var tenLines =[];
    for(var i = 0; i < 10; i++) {
        tenLines.push(lines[Math.floor(Math.random()*lines.length)]);
    }
    res.json(tenLines);
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});
