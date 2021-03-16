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
        colleagueFlag: 'External',
        numIntroducers: 100,
        numAliases: 100,
        numJobs: 100,
        numPhones: 100,
        numEmails: 100,
        includeStats: true,
        sortBy: 'ScoreDesc',
        skip: skip,
        take: take
    };

    var contacts = await dotAlignCloud.fetchDC(
        environment, 
        params, 
        dotAlignUrls.contactsFetchUrlCreator,
        accessToken);

    return contacts;
}

module.exports = { run }