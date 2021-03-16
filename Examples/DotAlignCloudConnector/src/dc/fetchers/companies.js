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
        numIntroducers: 100,
        numUrls: 100,
        numAliases: 100,
        includeStats: true,
        sortBy: 'ScoreDesc',
        skip: skip,
        take: take
    };

    var companies = await dotAlignCloud.fetchDC(
        environment, 
        params, 
        dotAlignUrls.companiesFetchUrlCreator,
        accessToken);

    return companies;
}

module.exports = { run }