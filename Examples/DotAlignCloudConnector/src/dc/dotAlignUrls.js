const querystring = require('querystring')

async function teamMemberFetchUrlCreator(baseUrl, params) {
  var teamNumber = params.teamNumber;
  var skip = params.skip;
  var take = params.take;
  var includeHealthStats = params.includeHealthStats;
  var url = `${baseUrl}/teams/${teamNumber}/members?Skip=${skip}&Take=${take}&IncludeHealthStats=${includeHealthStats}`;
  return url;
}

async function contactsFetchUrlCreator(baseUrl, params) {
    var qps = querystring.stringify(params);
    var url = `${baseUrl}/people?${qps}`;
    return url;
}

async function companiesFetchUrlCreator(baseUrl, params) {
    var qps = querystring.stringify(params);
    var url = `${baseUrl}/companies?${qps}`;
    return url;
}

async function contributorPeopleFetchUrlCreator(baseUrl, params) {
  var teamNumber = params.teamNumber;
  var skip = params.skip;
  var take = params.take;
  var detailLevel = params.detailLevel;
  var contributorKey = params.contributorKey;
  var url = `${baseUrl}/users/${contributorKey}/people?SourceTeam=${teamNumber}&Skip=${skip}&Take=${take}&IncludeDetailLevel=${detailLevel}`;
  return url;
}

async function contributorCompaniesFetchUrlCreator(baseUrl, params) {
  var teamNumber = params.teamNumber;
  var skip = params.skip;
  var take = params.take;
  var detailLevel = params.detailLevel;
  var contributorKey = params.contributorKey;
  var url = `${baseUrl}/users/${contributorKey}/companies?SourceTeam=${teamNumber}&Skip=${skip}&Take=${take}&IncludeDetailLevel=${detailLevel}`;
  return url;
}

module.exports = { 
    teamMemberFetchUrlCreator, 
    contactsFetchUrlCreator,
    companiesFetchUrlCreator,
    contributorPeopleFetchUrlCreator, 
    contributorCompaniesFetchUrlCreator 
}