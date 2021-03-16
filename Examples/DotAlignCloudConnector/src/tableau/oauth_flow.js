var helpers = require('../helpers');
var dotalignTableau = require('./dotAlignTableau');

(function() {
    // Create the connector object
    var dotalignConnector = tableau.makeConnector();

    dotalignConnector.init = function(initCallback) {
        tableau.authType = tableau.authTypeEnum.custom;

        // If we are in the auth phase we only want to show the UI needed for auth
        if (tableau.phase == tableau.phaseEnum.authPhase) {
            $("#submitButton").css('display', 'none');
        }

        if (tableau.phase == tableau.phaseEnum.gatherDataPhase) {
            // If the API that WDC is using has an endpoint that checks
            // the validity of an access token, that could be used here.
            // Then the WDC can call tableau.abortForAuth if that access token
            // is invalid.
        }

        var accessToken = Cookies.get("accessToken");

        console.log('About to check hasAuth');

        var hasAuth = (accessToken && accessToken.length > 0) || tableau.password.length > 0;
        updateUIWithAuthState(hasAuth);

        initCallback();

        // If we are not in the data gathering phase, we want to store the token
        // This allows us to access the token in the data gathering phase
        if (tableau.phase == tableau.phaseEnum.interactivePhase || 
            tableau.phase == tableau.phaseEnum.authPhase) {
            if (hasAuth) {
                tableau.password = accessToken;

                if (tableau.phase == tableau.phaseEnum.authPhase) {
                    // Auto-submit here if we are in the auth phase
                    tableau.submit()
                }

                return;
            }
        }
    }

    // Define the schema
    dotalignConnector.getSchema = function(schemaCallback) {
        dotalignTableau.getSchema(schemaCallback);
    };

    dotalignConnector.getData = function(table, doneCallback) {
        var accessToken = Cookies.get("accessToken") || tableau.password;
        
        dotalignTableau.getData(
            accessToken, 
            table,
            tableau)
            .then(rows => { 
                table.appendRows(rows);
                doneCallback();
            });
    };

    tableau.registerConnector(dotalignConnector);
})();

$(document).ready(function() {
    var accessToken = Cookies.get("accessToken");
    console.log('In ready');
    var hasAuth = accessToken && accessToken.length > 0;

    if (hasAuth) { 
        console.log("Access token was found. Setting it into the password field.");
        tableau.password = accessToken;
    } else { 
        console.log("Access token was not found");
    }

    updateUIWithAuthState(hasAuth);

    $("#connectbutton").click(function() {
        doAuthorizationRedirect();
    });

    $("#submitButton").click(function() {
        tableau.connectionName = "DotAlign Cloud API";
        tableau.submit();
    });
});

function updateUIWithAuthState(hasAuth) {
    if (hasAuth) {
        console.log("Page has access token");
        $(".notsignedin").css('display', 'none');
    } else {
        console.log("Page does not have access token");
        $(".notsignedin").css('display', 'block');
    }
}

function doAuthorizationRedirect() {
    var environment = helpers.getEnvironmentParams();

    var authorizationUrl = 
        `https://login.microsoftonline.com/${environment.tenant_id}/oauth2/v2.0/authorize`;
    
    // Redirect to the server that is helping complete the OAuth flow
    var redirectUri = environment.oAuthBaseUrl + ":" + environment.oAuthPort + environment.redirect;

    var fullUrl = `${authorizationUrl}?` + 
        `client_id=${environment.client_id}&` + 
        `response_type=code&` + 
        `redirect_uri=${redirectUri}&` + 
        `scope=${environment.scope}&`;
  
    console.log("Full authorization url: ");
    console.log(fullUrl);
    
    // Send the client to the authorize url to begin the OAuth flow
    window.location.href = fullUrl;
}