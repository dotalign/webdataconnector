const dotAlignCloud = require("../dotAlignCloud");
const dotAlignUrls = require("../dotAlignUrls");

async function run(
    environment,
    teamNumber,
    skip,
    take,
    contactCount,
    companyCount,
    accessToken) {

    var teamMembersParams = {
      teamNumber: teamNumber,
      skip: skip,
      take: take,
      includeHealthStats: false
    };

    var members = await dotAlignCloud.fetchDC(
        environment, 
        teamMembersParams, 
        dotAlignUrls.teamMemberFetchUrlCreator,
        accessToken);
    
    var result = [];

    for (var i = 0; i < members.data.length; i++) { 
        var member = members.data[i];
      
        var contactsParams = { 
            contributorKey: member.userKey,
            teamNumber: teamNumber,
            colleagueFlag: 'External',
            numAliases: 100,
            numJobs: 100,
            numPhones: 100,
            numEmails: 100,
            includeStats: true,
            sortBy: 'ScoreDesc',
            skip: 0,
            take: contactCount
        };
        
        console.log(`\n\n > Fetching people for ${member.userKey}`);
        
        var people = await dotAlignCloud.fetchDC(
          environment, 
          contactsParams, 
          dotAlignUrls.contributorPeopleFetchUrlCreator,
          accessToken);
        
        console.log(`\n > Fetching companies for ${member.userKey}`);

        var companiesParams = {
            contributorKey: member.userKey,
            teamNumber: teamNumber,
            numUrls: 100,
            numAliases: 100,
            includeStats: true,
            sortBy: 'ScoreDesc',
            skip: 0,
            take: companyCount
        };

        var companies = await dotAlignCloud.fetchDC(
          environment, 
          companiesParams, 
          dotAlignUrls.contributorCompaniesFetchUrlCreator,
          accessToken);

        result.push({ 
          contributor: member,
          people: people,
          companies: companies
        });
      }

      return result;
}

module.exports = { run }