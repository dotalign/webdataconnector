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
        ColleagueFlag: 'External',
        NumIntroducers: 100,
        NumAliases: 100,
        NumJobs: 100,
        NumPhones: 100,
        NumEmails: 100,
        IncludeStats: true,
        SortBy: 'ScoreDesc',
        Skip: skip,
        Take: take,
        totalFetchCount: take
    };

    var contacts = await dotAlignCloud.fetchDCWithAccessToken(
        environment, 
        params, 
        dotAlignUrls.contactsFetchUrlCreator,
        accessToken);

    return contacts;
}

module.exports = { run }