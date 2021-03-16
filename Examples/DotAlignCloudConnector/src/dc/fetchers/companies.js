const dotAlignCloud = require("../dotAlignCloud");
const dotAlignUrls = require("../dotAlignUrls");

async function run(
  environment,
  teamNumber,
  skip,
  take,
  accessToken) {
    var params = {
        teamNumber: teamNumber,
        NumIntroducers: 100,
        NumUrls: 100,
        NumAliases: 100,
        IncludeStats: true,
        SortBy: 'ScoreDesc',
        Skip: skip,
        Take: take,
        totalFetchCount: take
    };

    var companies = null;

    if (null == accessToken) { 
        companies = await dotAlignCloud.fetchDC(
            environment, 
            params, 
            dotAlignUrls.companiesFetchUrlCreator);
    } else {
        companies = await dotAlignCloud.fetchDCWithAccessToken(
            environment, 
            params, 
            dotAlignUrls.companiesFetchUrlCreator,
            accessToken);
    }

    return companies;
}

module.exports = { run }