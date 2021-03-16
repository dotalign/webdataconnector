const dotAlignCloud = require("../dotAlignCloud");
const dotAlignUrls = require("../dotAlignUrls");

async function run(
  environment,
  teamNumber,
  count,
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
        Skip: 0,
        Take: count,
        totalFetchCount: count
    };

    var contacts = await dotAlignCloud.fetchDCWithAccessToken(
        environment, 
        params, 
        dotAlignUrls.contactsFetchUrlCreator,
        accessToken);

    return contacts;
}

module.exports = { run }