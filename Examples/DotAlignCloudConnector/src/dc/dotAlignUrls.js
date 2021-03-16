const querystring = require('querystring')

async function teamMemberFetchUrlCreator(baseUrl, params) {
    var teamNumber = params.teamNumber;
    var qps = querystring.stringify(params);
    var url = `${baseUrl}/teams/${teamNumber}/members?${qps}`;
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
    var contributorKey = params.contributorKey;
    var qps = querystring.stringify(params);
    var url = `${baseUrl}/users/${contributorKey}/people?${qps}`;
    return url;
}

async function contributorCompaniesFetchUrlCreator(baseUrl, params) {
    var contributorKey = params.contributorKey;
    var qps = querystring.stringify(params);
    var url = `${baseUrl}/users/${contributorKey}/companies?${qps}`;
    return url;
}

module.exports = { 
    teamMemberFetchUrlCreator, 
    contactsFetchUrlCreator,
    companiesFetchUrlCreator,
    contributorPeopleFetchUrlCreator, 
    contributorCompaniesFetchUrlCreator 
}