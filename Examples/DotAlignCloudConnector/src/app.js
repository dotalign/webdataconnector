var express = require('express');
var cookieParser = require('cookie-parser');
var http = require('http');
var helpers = require('./helpers');
var dotAlignCloud = require('./dotAlignCloud');
var dotAlignUtils = require('./dotAlignUtils');
var app = express();

var environment = helpers.getEnvironmentParams();

// -------------------------------------------------- //
// Express set-up and middleware
// -------------------------------------------------- //
app.set('port', environment.oAuthPort);
app.use(cookieParser());                              // cookieParser middleware to work with cookies
app.use(express.static(__dirname + '/dist'));

// -------------------------------------------------- //
// Routes
// -------------------------------------------------- //

app.get('/', function(req, res) {
  res.redirect('/index.html');
});

app.get('/redirect', function(req, res) {
    console.log("Request body: ");
    console.log(req.body);

    authCode = req.query.code;
    var tokenUrl = `https://login.microsoftonline.com/${environment.tenant_id}/oauth2/v2.0/token`;
    var clientId = environment.client_id;
    var clientSecret = environment.client_secret;
    var scope = environment.scope;
    var redirectUrl = environment.oAuthBaseUrl + ":" + environment.oAuthPort + environment.redirect;

    console.log("\nAuth Code: ");
    console.log(authCode);
    console.log(`tokenUrl: ${tokenUrl}`);
    console.log(`clientId: ${clientId}`);
    console.log(`clientSecret: ${clientSecret}`);
    console.log(`scope: ${scope}`);

    var body = 
        `client_id=${clientId}&` + 
        `scope=${scope}&` + 
        `code=${authCode}&` + 
        `redirect_uri=${redirectUrl}&` + 
        `grant_type=authorization_code&` + 
        `client_secret=${clientSecret}`;

    console.log("\nPosting following body to get access token: ");
    console.log(body);

    var r = dotAlignCloud.postData(tokenUrl, body)
        .then(result => {
            console.log("\nThe response object: ");
            dotAlignUtils.logObject(result);

            var accessToken = result.access_token;
            
            // Set this cookie so Tableau can access it
            res.cookie('accessToken', accessToken, { });

            // Send control back to the web connector
            res.redirect('http://localhost:8888/Examples/DotAlignCloudConnector/dist/oauth_flow.html');
        });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});