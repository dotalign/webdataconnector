var dotAlignCloud = require('./dotAlignCloud');
var dotAlignUrls = require('./dotAlignUrls');
var helpers = require('./helpers');
var utils = require('./dotAlignUtils');

(function() {
    // Create the connector object
    var myConnector = tableau.makeConnector();

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

        table.appendRows(rows);
        doneCallback();
    };

    tableau.registerConnector(myConnector);

    $(document).ready(function() {
        $("#submitButton").click(function() {
            tableau.connectionName = "DotAlign Cloud API"; 
            tableau.submit(); 
        });
    });
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

    var members = await dotAlignCloud.fetchDC(
        environment, 
        teamMembersParams, 
        dotAlignUrls.teamMemberFetchUrlCreator);
    
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