var dotAlignCloud = require('./dotAlignCloud');
var dotAlignUrls = require('./dotAlignUrls');
var helpers = require('./helpers');
var dotAlignUtils = require('./dotAlignUtils');

(function() {
    // Create the connector object
    var myConnector = tableau.makeConnector();

    myConnector.init = function(initCallback) {
        tableau.authType = tableau.authTypeEnum.custom;

        // If we are in the auth phase we only want to show the UI needed for auth
        if (tableau.phase == tableau.phaseEnum.authPhase) {
            $("#getvenuesbutton").css('display', 'none');
        }

        if (tableau.phase == tableau.phaseEnum.gatherDataPhase) {
            // If the API that WDC is using has an endpoint that checks
            // the validity of an access token, that could be used here.
            // Then the WDC can call tableau.abortForAuth if that access token
            // is invalid.
        }

        var accessToken = Cookies.get("accessToken");
        console.log("Access token: ");
        console.log(accessToken);
        var hasAuth = (accessToken && accessToken.length > 0) || tableau.password.length > 0;
        updateUIWithAuthState(hasAuth);

        initCallback();

        // If we are not in the data gathering phase, we want to store the token
        // This allows us to access the token in the data gathering phase
        if (tableau.phase == tableau.phaseEnum.interactivePhase || tableau.phase == tableau.phaseEnum.authPhase) {
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
    myConnector.getSchema = function(schemaCallback) {
        var cols = [{
            id: "first_name",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "last_name",
            alias: "last_name",
            dataType: tableau.dataTypeEnum.float
        }, {
            id: "job_title",
            alias: "job_title",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "company_name",
            dataType: tableau.dataTypeEnum.geometry
        }, {
          id: "relationship_score",
          dataType: tableau.dataTypeEnum.int
        }];

        var tableSchema = {
            id: "People",
            alias: "People in the network",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

    myConnector.getData = function(table, doneCallback) {
        var environment = helpers.getEnvironmentParams();
        
        console.log("Environment: ");
        utils.logObject(environment);

        var rows = [];
        
        var result = getDataFromDotAlign(
          environment,
          1,
          5,
          100,
          100)
          .then(r => { 
            return r;
          });

        dotAlignUtils.logObject(result);

        table.appendRows(rows);
        doneCallback();
    };

    tableau.registerConnector(myConnector);

    $(document).ready(function() {
      var accessToken = Cookies.get("accessToken");
      var hasAuth = accessToken && accessToken.length > 0;

      if (hasAuth) { 
        console.log("Access token was found: ");
        console.log(accessToken);
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
        $(".notsignedin").css('display', 'none');
    } else {
        $(".notsignedin").css('display', 'block');
    }
  }
  
  function doAuthorizationRedirect() {
    var environment = helpers.getEnvironmentParams();

    var authorizationUrl = 
      `https://login.microsoftonline.com/${environment.tenant_id}/oauth2/v2.0/authorize`;
    
    var redirectUri = environment.baseUrl + ":" + environment.port + environment.redirect;

    var fullUrl = 
      `${authorizationUrl}?` + 
      `client_id=${environment.client_id}&` + 
      `response_type=code&` + 
      `redirect_uri=${redirectUri}&` + 
      `scope=${environment.scope}&`;
  
    console.log("Full authorization url: ");
    console.log(fullUrl);
    
    window.location.href = fullUrl;
  }
})();

async function getDataFromDotAlign(
  environment,
  teamNumber, 
  numberOfContributors,
  peopleFetchCount,
  companiesFetchCount) {
    var teamMembersParams = {
      teamNumber: teamNumber,
      skip: 0,
      take: 100,
      includeHealthStats: false,
      totalFetchCount: numberOfContributors
    };

    var accessToken = Cookies.get("accessToken");

    var members = await dotAlignCloud.fetchDCWithAccessToken(
        environment, 
        teamMembersParams, 
        dotAlignUrls.teamMemberFetchUrlCreator,
        accessToken);
    
    var result = [];

    for (var i = 0; i < members.data.length; i++) { 
        var member = members.data[i];
      
        var params = { 
          teamNumber: teamNumber,
          skip: 0,
          take: 200,
          detailLevel: "IncludeDependentDetailsAndInteractionStats",
          totalFetchCount: peopleFetchCount,
          contributorKey: member.userKey
        };
        
        console.log(`\n\nFetching people for ${member.userKey}`);
        console.log(`-------`);
        
        var people = await dotAlignCloud.fetchDC(
          environment, 
          params, 
          dotAlignUrls.contributorPeopleFetchUrlCreator);
        
        console.log(`\nFetching companies for ${member.userKey}`);
        console.log(`-------`);

        var companies = await dotAlignCloud.fetchDC(
          environment, 
          params, 
          dotAlignUrls.contributorCompaniesFetchUrlCreator);

        var userKey = member.userKey;

        result.push({ 
          contributor: member,
          people: people,
          companies: companies
        });
      }

      return result;
}