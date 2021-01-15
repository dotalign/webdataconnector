// require('dotenv').config();
const dotAlignUtils = require("./dotAlignUtils");

function getEnvironmentParams() {
  return environment = {
      // Info related to the DotAlign Cloud API
      apiBaseUrl: "https://dotalign-obhnbxktkccdo-webapp.azurewebsites.net/api",
      // apiBaseUrl: "https://qa.dotalign.com/api",
      // apiBaseUrl: "https://dotalign-gcoajfbcgsrka-webapp.azurewebsites.net",
      tenant_id: "ef816895-7d31-42b9-a2e6-a2cc244e05c5",
      grant_type: "client_credentials",
      client_id: "f4ac093f-f62c-49c6-ad79-b84ac4fe79c1",
      client_secret: "5RzN~P7dF.irA5b8~dw3XUA.nLheXSb-Jg",
      scope: "128721d7-3cc6-44b0-97a2-b709323602af/.default",

      // The server to help with OAuth
      oAuthBaseUrl: "http://localhost",
      oAuthPort: 5001,
      redirect: "/redirect",

      // The tableau server
      tableauBaseUrl: "http://localhost",
      tableauPort: 8888
  };
}

async function printPeople(people) { 
  for (var i = 0; i < people.length; i++) {
    var person = { 
      name: people[i].PersonNameText,
      emailAddress: people[i].BestEmailAddrText,
      companyName: people[i].BestJobMatchedCompanyName,
      jobTitle: people[i].BestJobTitleText,
      bestIntroducer: people[i].BestKnowerNameText,
      phoneNumber: people[i].BestPhoneText,
      relationshipScore: people[i].WeKnowPersonScore
    };

    dotAlignUtils.logObject(person);
  }
}

async function printTeamMembers(members) {
  for (var i = 0; i < members.length; i++) {
    var member = { 
      name: members[i].name,
      emailAddress: members[i].email,
      teamName: members[i].teamName,
      teamNumber: members[i].teamNumber
    };

    dotAlignUtils.logObject(member);
  }
}

module.exports = { getEnvironmentParams, printPeople, printTeamMembers };