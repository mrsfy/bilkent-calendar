/**
 * Created by mrsfy on 18.09.2016.
 */

var express = require('express');
var path = require('path');
var app = express();
app.use(express.static(path.join(__dirname, 'public')));


var cal = require("./academic_calendar");

app.get('/data', cal);

app.listen(80);