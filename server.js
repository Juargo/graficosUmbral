var express = require('express');
var app = express();

app.use(express.static('public'));

app.listen(3000, function () {
    console.log('Escuchando en 3000')
})

app.get('/api/getdata', function (req, res) {
    var target = req.query.target;
    target = target.replace(/ /g, '%20').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/,/g, '%2C').replace(/\"/g, '%22');

    var from = "00:00_20161205";
    var until = "00:00_20161206";
    var tz = "America/Santiago";
    var format = "json";

    var child = require('child_process').execFile('public/bash.sh',
        [
            target, from, until, tz, format
        ]);

    child.stdout.on('data', function (data) {
        //res.json(data)
        console.log(data);
    });
});