var express = require('express');
var cookieParser = require('cookie-parser');
var querystring = require('querystring');
var http = require('http');
var request = require('request');
var path = require('path');
var config = require('./config.js'); 
var sys = require('util');
var helpers = require('./helpers');
var app = express();

var environment = helpers.getEnvironmentParams();

// -------------------------------------------------- //
// Express set-up and middleware
// -------------------------------------------------- //
app.set('port', environment.port);
app.use(cookieParser());                              // cookieParser middleware to work with cookies
app.use(express.static(__dirname + '/public'));

// -------------------------------------------------- //
// Variables
// -------------------------------------------------- //
var clientID = process.env.HPDAAS_CLIENT_ID || config.CLIENT_ID;
var clientSecret = process.env.HPDAAS_CLIENT_SECRET || config.CLIENT_SECRET;
var tokenPath = config.TOKEN_PATH;
console.log(clientID);
console.log(clientSecret);
var redirectURI = config.HOSTPATH + ":" + config.PORT + config.REDIRECT_PATH

// -------------------------------------------------- //
// Routes
// -------------------------------------------------- //

app.get('/', function(req, res) {
  res.redirect('/index.html');
});

// This route is hit once HP Techpulse redirects to our
// server after performing authentication
app.get('/redirect', function(req, res) {
  // get our authorization code
  authCode = req.query.code;
  console.log("Auth Code is: " + authCode);

  // Set up a request for an long-lived Access Token now that we have a code
  
  // 'client_id': clientID,
  // 'client_secret': clientSecret,
  var requestObject = {
      'redirect_uri': redirectURI,   
      'code': authCode,
      'grant_type': 'authorization_code'
  };
  
  var auth = new Buffer(clientID + ':' + clientSecret).toString('base64');
  var basicAuthHeader = 'Basic ' + auth;

  var token_request_header = {
      'Content-Type': 'application/x-www-form-urlencoded',
	  'Authorization':  basicAuthHeader
  };
  
  // Build the post request for the OAuth endpoint
  var options = {
      method: 'POST',
      url: tokenPath,
      form: requestObject,
      headers: token_request_header, 
  };

  // Make the request
  request(options, function (error, response, body) {

    if (!error) {
      // We should receive  { access_token: ACCESS_TOKEN }
      // if everything went smoothly, so parse the token from the response
      body = JSON.parse(body);
      var accessToken = body.access_token;
      console.log('accessToken: ' + accessToken);

      // Set the token in cookies so the client can access it
      res.cookie('accessToken', accessToken, { });

      // Head back to the WDC page
      res.redirect('/index.html');
    } else {
      console.log(error);
    }
  });
});


// -------------------------------------------------- //
// Create and start our server
// -------------------------------------------------- //
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
