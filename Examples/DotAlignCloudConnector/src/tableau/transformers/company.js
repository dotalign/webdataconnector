function transform(dotAlignCompanies, tableau) { 
    colleagues = [];
    companies = [];
    companyUrls = [];
    companyAliases = [];
    companyIdentityMaps = [];
    companyIntroducers = [];

    for (i = 0; i < dotAlignCompanies.length; i++) {
        dotAlignCompany = dotAlignCompanies[i];
        
        if (null == dotAlignCompany.Stats) { 
            dotAlignCompany.Stats = {};
        }

        company = {
            "company_id": dotAlignCompany.CompanyMd5,
            "best_name": dotAlignCompany.CompanyNameText,
            "best_url": dotAlignCompany.BestUrlText,
            
            "relationship_score": dotAlignCompany.Score,
            "best_contact_name": dotAlignCompany.AnchorEmployeeNameText,
            "best_contact_job_title": dotAlignCompany.AnchorTitleText,
            
            "latest_meeting_date": dotAlignCompany.Stats.LastMeeting,
            "latest_meeting_with_colleague": dotAlignCompany.Stats.LastMeetingUserName,
            "latest_meeting_with_contact": dotAlignCompany.Stats.LastMeetingContactName,
            "latest_inbound_message_date": dotAlignCompany.Stats.LastInboundMsg,
            "latest_inbound_message_with_contact": dotAlignCompany.Stats.LastInboundMsgContactName,
            "latest_inbound_message_with_colleague": dotAlignCompany.Stats.LastInboundMsgUserName,
            "latest_outbound_message_date": dotAlignCompany.Stats.LastOutboundMsg,
            "latest_outbound_message_with_colleague": dotAlignCompany.Stats.LastOutboundMsgUserName,
            "latest_outbound_message_with_contact": dotAlignCompany.Stats.LastOutboundMsgContactName
        };

        var topIntroducer = null;

        if (null !=  dotAlignCompany.Introducers && null != dotAlignCompany.Introducers.data) { 
            topIntroducer = dotAlignCompany.Introducers.data[0];
        }

        if (null != topIntroducer) {
            company["best_introducer_name"] = topIntroducer.IntroducerName;
            company["best_introducer_contact_relationship_score"] = topIntroducer.IntroducerScore;
            company["best_introducer_id"] = topIntroducer.IntroducerUserKey;
        }

        handleUrls(dotAlignCompany, companyUrls, companyIdentityMaps);
        handleAliases(dotAlignCompany, companyAliases, companyIdentityMaps);
        handleIntroducers(dotAlignCompany, companyIntroducers, colleagues);

        companies.push(company);
    }

    if (null != tableau) {
        tableau.reportProgress("Done converting data from DotAlign to Tableau format");
    }

    return {
        colleagues: colleagues,
        companies: companies,
        companyUrls: companyUrls,
        companyAliases: companyAliases,
        companyIdentityMaps: companyIdentityMaps,
        companyIntroducers: companyIntroducers
    };
}

function handleIntroducers(company, companyIntroducers, colleagues) {
    if (null !=  company.Introducers && null != company.Introducers.data) { 
        for (j = 0; j < company.Introducers.data.length; j++) { 
            introducer = company.Introducers.data[j];

            // If the colleague does not already exist, add them
            if (!colleagues.some(function(c) { return c.colleague_id === introducer.IntroducerUserKey; })) {
                colleague = { 
                    "colleague_id": introducer.IntroducerUserKey,
                    "name": introducer.IntroducerName,
                    "email_address": "",
                    "job_title": ""
                };

                colleagues.push(colleague);
            }

            connection = { 
                "company_id": company.CompanyMd5,
                "colleague_id": introducer.IntroducerUserKey,
                "relationship_score": introducer.IntroducerScore,
            }

            companyIntroducers.push(connection);
        }
    }
}

function handleAliases(company, companyAliases, companyIdentityMaps) {

    if (company.Aliases != null) {

        for (k = 0; k < company.Aliases.data.length; k++) {
            
            alias = { 
                "company_id": company.CompanyMd5,
                "alias_id": company.Aliases.data[k].IdentifierMd5,
                "alias_text": company.Aliases.data[k].CoNameAlias,
                "current_as_of": company.Aliases.data[k].CurrentAsOf
            };

            companyAliases.push(alias);

            map = { 
                "primary_id": company.CompanyMd5,
                "secondary_id": company.Aliases.data[k].IdentifierMd5
            }

            companyIdentityMaps.push(map);
        }
    }
}

function handleUrls(company, companyUrls, companyIdentityMaps) {

    if (company.Urls != null) {

        for (j = 0; j < company.Urls.data.length; j++) {
    
            url = { 
                "company_id": company.CompanyMd5,
                "url_id": company.Urls.data[j].IdentifierMd5,
                "url_text": company.Urls.data[j].CoUrl,
                "current_as_of": company.Urls.data[j].CurrentAsOf
            };
    
            companyUrls.push(url);

            map = { 
                "primary_id": company.CompanyMd5,
                "secondary_id": company.Urls.data[j].IdentifierMd5
            }

            companyIdentityMaps.push(map);
        }
    }
}

module.exports = {
    transform
};