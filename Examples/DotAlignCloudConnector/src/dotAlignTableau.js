var dotAlignCloud = require('./dotAlignCloud');
var dotAlignUrls = require('./dotAlignUrls');
var helpers = require('./helpers');
var dotAlignUtils = require('./dotAlignUtils');
var contact = require('./schema/contact');
var company = require('./schema/company');

function getSchema(schemaCallback) { 
    schemaCallback([contact.getSchema(), company.getSchema()]);
};

function getData(accessToken, table, doneCallback, tableau) {
    var environment = helpers.getEnvironmentParams();
    dotAlignUtils.logObject(table);

    var rows = [];

    var result = getDataFromDotAlign(
        accessToken, 
        environment, 
        1, // teamNumber
        table.tableInfo.id, 
        tableau)
        .then(result => {

            switch (table.tableInfo.id) { 
                
                case contact.getTableName(): 
                    rows = convertToTableauPeople(result, tableau);
                    break;

                case company.getTableName(): 
                    rows = convertToTableauCompanies(result, tableau);
                    break;

                default:
                    throw `Unexpected table name: ${table.tableInfo.id}`;
                    break;
            }

            table.appendRows(rows);
            doneCallback();
        });
};

async function getDataFromDotAlign(
    accessToken,
    environment, 
    teamNumber,
    category,
    tableau) {
    var params = null;
    var urlCreator = null;

    switch (category) {
        
        case contact.getTableName():
            
            params = {
                totalFetchCount: 1000,
                teamNumber: teamNumber,
                skip: 0,
                take: 500,
                detailLevel: "IncludeDependentDetailsAndInteractionStats"
            };

            urlCreator = dotAlignUrls.peopleFetchUrlCreator;

            break;
        
        case company.getTableName():

            params = {
                totalFetchCount: 1000,
                teamNumber: teamNumber,
                skip: 0,
                take: 500,
                detailLevel: "IncludeDependentDetailsAndInteractionStats"
            };

            urlCreator = dotAlignUrls.companiesFetchUrlCreator;

            break;
        
        default:

            throw `Unexpected category of data requested: ${category}` 
    }
    
    tableau.reportProgress("Starting to fetch data from DotAlign...");

    var result = await dotAlignCloud.fetchDCWithAccessToken(
        environment, 
        params, 
        urlCreator,
        accessToken);

    tableau.reportProgress("Done fetching data from DotAlign...");

    return result.data;
}

function convertToTableauPeople(dotalignPeople, tableau) { 
    var tableauPeople=[];

    for (i = 0; i < dotalignPeople.length; i++) {
        
        var person = dotalignPeople[i];
        tableau.reportProgress(person.PersonNameText);

        if (null == person.Stats) { 
            person.Stats = {};
        }
        
        var row = {
            'full_name': person.PersonNameText,
            'job_title': person.BestJobTitleText,
            'company_name': person.BestJobMatchedCompanyName || person.BestJobCorpLevelCompanyName,
            'email_address': person.BestEmailAddrText,
            'best_introducer': person.BestKnowerNameText, 
            'relationship_score' : person.WeKnowPersonScore,

            "latest_meeting_date": person.Stats.LastMeeting,
            "latest_meeting_with": person.Stats.LastMeetingUserName,
            "latest_email_to_contact_date": person.Stats.LastOutboundMsg,
            "latest_email_to_contact_sender": person.Stats.FirstOutboundMsgUserName,
            "latest_email_from_contact_date": person.Stats.LastInboundMsg,
            "latest_email_from_contact_recepient": person.Stats.LastInboundMsgUserName,
        };

        tableauPeople.push(row);
    }

    return tableauPeople;
}

function convertToTableauCompanies(dotalignCompanies, tableau) { 
    var tableauCompanies=[];

    for (i = 0; i < dotalignCompanies.length; i++) {
        var company = dotalignCompanies[i];

        console.log("Processing company: ");
        dotAlignUtils.logObject(company);

        tableau.reportProgress(company.CompanyNameText);
        
        if (null == company.Stats) { 
            company.Stats = {};
        }

        var row = {
            'company_name': company.CompanyNameText,
            'company_url': company.BestUrlText,
            'company_relationship_score': company.WeKnowCompanyScore,
            'best_contact_name': company.AnchorEmployeeNameText,
            'best_contact_job_title': company.AnchorTitleText, 
            'best_introducer_name' : company.BestKnowerNameText,
            'introducer_contact_relationship_score': company.AnchorEmployeeBestKnowerP2PScore,
            
            'latest_meeting_date': company.Stats.LastMeeting,
            'latest_meeting_organizer': company.Stats.LastMeetingUserName,
            'latest_meeting_contact': company.Stats.LastMeetingContactName,
            
            'latest_inbound_email_date': company.Stats.LastInboundMsg,
            'latest_inbound_email_sender': company.Stats.LastInboundMsgContactName,
            'latest_inbound_email_recipient': company.Stats.LastInboundMsgUserName,
            
            'latest_outbound_email_date': company.Stats.LastOutboundMsg,
            'latest_outbound_email_sender': company.Stats.LastOutboundMsgUserName,
            'latest_outbound_email_recipient': company.Stats.LastOutboundMsgContactName
        };

        if (company.Urls != null) {
            var urls = [];

            for (j = 0; j < company.Urls.data.length; j++) { 
                var url = company.Urls.data[j].UrlText;
                urls.push(url);
            }
        
            row.urls = urls;
        }

        if (company.Aliases != null) {
            var names = [];

            for (k = 0; k < company.Aliases.data.length; k++) { 
                var name = company.Aliases.data[k].NameText;
                names.push(name);
            }

            row.names = names;
        }

        tableauCompanies.push(row);
    }

    tableau.reportProgress("Done converting data from DotAlign to Tableau format");

    return tableauCompanies;
}

module.exports = {
    getSchema,
    getData 
};