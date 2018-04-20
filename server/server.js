/////////////////////////////////////////////////////////////////////
// Copyright (c) Autodesk, Inc. All rights reserved
// Written by Forge Partner Development
//
// Permission to use, copy, modify, and distribute this software in
// object code form for any purpose and without fee is hereby granted,
// provided that the above copyright notice appears in all copies and
// that both that copyright notice and the limited warranty and
// restricted rights notice below appear in all supporting
// documentation.
//
// AUTODESK PROVIDES THIS PROGRAM "AS IS" AND WITH ALL FAULTS.
// AUTODESK SPECIFICALLY DISCLAIMS ANY IMPLIED WARRANTY OF
// MERCHANTABILITY OR FITNESS FOR A PARTICULAR USE.  AUTODESK, INC.
// DOES NOT WARRANT THAT THE OPERATION OF THE PROGRAM WILL BE
// UNINTERRUPTED OR ERROR FREE.
/////////////////////////////////////////////////////////////////////
'use strict';

var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var app = express();
var fs = require('fs');

console.log("sss");
// this session will be used to save the oAuth token
app.use(cookieParser());
app.set("FORGE_CLIENT_ID","npthwr03xeosvp7aGsTQoaYTcNU8WWZw");
app.set("FORGE_CLIENT_secret","FZ7N9sS8AUOWqHeA");
app.set('trust proxy',1) // trust first proxy - HTTPS on Heroku 
app.use(session({
    secret: 'autodeskforge',
    cookie: {
        httpOnly: true,
        secure: (process.env.NODE_ENV === 'production'),
        maxAge: 1000 * 60 * 60 // 1 hours to expire the session and avoid memory leak
    },
    resave: false,
    saveUninitialized: true
}));

// prepare server routing
app.use('/', express.static(__dirname + '/../www')); // redirect static calls
app.use('/js', express.static(__dirname + '/../node_modules/bootstrap/dist/js')); // redirect static calls
app.use('/js', express.static(__dirname + '/../node_modules/moment/min')); // redirect static calls
app.use('/js', express.static(__dirname + '/../node_modules/jquery/dist')); // redirect static calls
app.use('/css', express.static(__dirname + '/../node_modules/bootstrap/dist/css')); // redirect static calls
app.use('/css', express.static(__dirname + '/../node_modules/font-awesome/css')) // redirect static calls
app.use('/fonts', express.static(__dirname + '/../node_modules/font-awesome/fonts')) // redirect static calls
app.use('/fonts', express.static(__dirname + '/../node_modules/bootstrap/dist/fonts')); // redirect static calls
app.set('port', process.env.PORT || 3000); // main port


// prepare our API endpoint routing
var oauth = require('./oauth');
app.use('/', oauth); // redirect oauth API calls

module.exports = app;

function loadJson(file){

	fs.writeFile('./www/test1.json', file, function (err) {
  		if (err) return console.log(err);
	});
}

function readJson(){
	var for_return;
	fs.readFile('./www/SensorsData.json', 'utf8', function (err,data) {
  		if (err) {
  			console.log("err");
  			for_return = err;
    		//return err;
  		}else{
  			console.log("data");
  			for_return = data;
  			//console.log(for_return);
  		}
	});
	return for_return;
}

//console.log(readJson());
//loadJson(readJson());

