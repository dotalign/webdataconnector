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
app.use(express.static(__dirname + '/dist'));

// -------------------------------------------------- //
// Variables
// -------------------------------------------------- //
var clientID = environment.client_id;
var clientSecret = environment.client_secret;
var tokenPath = `https://login.microsoftonline.com/${environment.tenant_id}/oauth2/v2.0/token`;
var redirectUri = environment.baseUrl + ":" + environment.port + environment.redirect;

console.log(clientID);
console.log(clientSecret);
console.log(tokenPath);
console.log(redirectUri);

// -------------------------------------------------- //
// Routes
// -------------------------------------------------- //

app.get('/', function(req, res) {
  res.redirect('/index.html');
});

app.get('/redirect', function(req, res) {
  // get our authorization code
  authCode = req.query.code;
  console.log("Auth Code is: " + authCode);

  // Set up a request for an long-lived Access Token now that we have a code
  
  var requestObject = {
      'redirect_uri': redirectUri,   
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

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});