function transform(dotAlignCompanies, tableau) { 
    var tableauCompanies=[];

    for (i = 0; i < dotAlignCompanies.length; i++) {
        var company = dotAlignCompanies[i];
        
        if (null == company.Stats) { 
            company.Stats = {};
        }

        var row = {
            'company_id': company.CompanyMd5,
            'best_name': company.CompanyNameText,
            'best_url': company.BestUrlText,
            
            'relationship_score': company.Score,
            'best_contact_name': company.AnchorEmployeeNameText,
            'best_contact_job_title': company.AnchorTitleText,
            
            'latest_meeting_date': company.Stats.LastMeeting,
            'latest_meeting_with_colleague': company.Stats.LastMeetingUserName,
            'latest_meeting_with_contact': company.Stats.LastMeetingContactName,
            'latest_inbound_message_date': company.Stats.LastInboundMsg,
            'latest_inbound_message_with_contact': company.Stats.LastInboundMsgContactName,
            'latest_inbound_message_with_colleague': company.Stats.LastInboundMsgUserName,
            'latest_outbound_message_date': company.Stats.LastOutboundMsg,
            'latest_outbound_message_with_colleague': company.Stats.LastOutboundMsgUserName,
            'latest_outbound_message_with_contact': company.Stats.LastOutboundMsgContactName
        };

        var topIntroducer = null;

        if (null !=  company.Introducers && null != company.Introducers.data) { 
            topIntroducer = company.Introducers.data[0];
        }

        if (null != topIntroducer) {
            row['best_introducer_name'] = topIntroducer.IntroducerName;
            row['best_introducer_contact_relationship_score'] = topIntroducer.IntroducerScore;
            row['best_introducer_id'] = topIntroducer.IntroducerUserKey;
        }

        // if (company.Urls != null) {
        //     var urls = [];

        //     for (j = 0; j < company.Urls.data.length; j++) { 
        //         var url = company.Urls.data[j].UrlText;
        //         urls.push(url);
        //     }
        
        //     row.urls = urls;
        // }

        // if (company.Aliases != null) {
        //     var names = [];

        //     for (k = 0; k < company.Aliases.data.length; k++) { 
        //         var name = company.Aliases.data[k].NameText;
        //         names.push(name);
        //     }

        //     row.names = names;
        // }

        tableauCompanies.push(row);
    }

    if (null != tableau) {
        tableau.reportProgress("Done converting data from DotAlign to Tableau format");
    }

    return tableauCompanies;
}

module.exports = {
    transform
};

// {
//     "CompanyMd5": "3117baaa96200869bd5251f7a3085f03",
//     "CompanyNameText": "General Atlantic",
//     "BestUrlText": "generalatlantic.com",
//     "WeKnowCompany": "9e7913227ae0c484b744ee029235ccf0",
//     "AnchorEmployeeBestKnowerP2PScore": 91,
//     "AnchorEmployeePersonMd5": "33d006b6fb223899a3039a04dc096aa9",
//     "AnchorEmployeeNameText": "Diana Long",
//     "AnchorJobCompanyName": "General Atlantic",
//     "AnchorTitleText": "Director, IT Project Manager",
//     "AnchorEmployeeSeniorityLevel": "SVP",
//     "Score": 100,
//     "Stats": {
//       "CompanyMd5": "3117baaa96200869bd5251f7a3085f03",
//       "FirstInboundMsg": "2012-07-30T17:15:42Z",
//       "FirstInboundMsgContactMd5": "21e44d8b4868dd201f7fbe7da86959b4",
//       "FirstInboundMsgUserKeyMd5": "8e9020cd702459b111f77e758cb7258d",
//       "FirstMeeting": "2016-02-11T14:30:00Z",
//       "FirstMeetingContactMd5": "36567df66a7427ba9bfaf3e2f505d08e",
//       "FirstMeetingUserKeyMd5": "a1fe921a2b69bd63c6be18369b646942",
//       "FirstOutboundMsg": "2012-07-27T22:21:50Z",
//       "FirstOutboundMsgContactMd5": "21e44d8b4868dd201f7fbe7da86959b4",
//       "FirstOutboundMsgUserKeyMd5": "8e9020cd702459b111f77e758cb7258d",
//       "LastInboundMsg": "2020-10-06T17:53:26Z",
//       "LastInboundMsgContactMd5": "33d006b6fb223899a3039a04dc096aa9",
//       "LastInboundMsgUserKeyMd5": "8e9020cd702459b111f77e758cb7258d",
//       "LastMeeting": "2020-10-07T17:00:00Z",
//       "LastMeetingContactMd5": "33d006b6fb223899a3039a04dc096aa9",
//       "LastMeetingUserKeyMd5": "8e9020cd702459b111f77e758cb7258d",
//       "LastOutboundMsg": "2020-12-22T20:36:54Z",
//       "LastOutboundMsgContactMd5": "33d006b6fb223899a3039a04dc096aa9",
//       "LastOutboundMsgUserKeyMd5": "94b0857c5545bc25ce89bcfc1d9e009a",
//       "NumInboundMsgs": 3627,
//       "NumMeetings": 412,
//       "NumOutboundMsgs": 3004,
//       "LastMeetingContactName": "Diana Long",
//       "LastOutboundMsgContactName": "Diana Long",
//       "LastInboundMsgContactName": "Diana Long",
//       "FirstMeetingContactName": "Marija Periša Kegel",
//       "FirstOutboundMsgContactName": "Drew Pearson",
//       "FirstInboundMsgContactName": "Drew Pearson",
//       "LastMeetingUserName": "Vince Scafaria",
//       "LastOutboundMsgUserName": "Alexandra McIlraith",
//       "LastInboundMsgUserName": "Vince Scafaria",
//       "FirstMeetingUserName": "Jaspreet Bakshi",
//       "FirstOutboundMsgUserName": "Vince Scafaria",
//       "FirstInboundMsgUserName": "Vince Scafaria"
//     },
//     "Urls": {
//       "data": [
//         {
//           "CoUrl": "generalatlantic.com",
//           "IdentifierMd5": "97f6eccd69e9477f0f107240c1eefe21",
//           "CurrentAsOf": "2020-10-07T17:00:00Z"
//         },
//         {
//           "CoUrl": "gapartners.com",
//           "IdentifierMd5": "74ac6e6248706071653a210aae8f4cd8",
//           "CurrentAsOf": "2015-12-11T17:48:25Z"
//         }
//       ],
//       "total_item_count": 2,
//       "page_start": 1,
//       "page_end": 2,
//       "are_more": false
//     },
//     "Aliases": {
//       "data": [
//         {
//           "CoNameAlias": "General Atlantic",
//           "IdentifierMd5": "3117baaa96200869bd5251f7a3085f03",
//           "CurrentAsOf": "2021-01-14T14:40:26.123Z"
//         },
//         {
//           "CoNameAlias": "General Atlantic LLC",
//           "IdentifierMd5": "5add3130bc641477286a4d3a58caddd6",
//           "CurrentAsOf": "2021-01-01T17:11:51.513Z"
//         },
//         {
//           "CoNameAlias": "General Atlantic Services L.P.",
//           "IdentifierMd5": "44008631f3aa6f628c7157d44f07599a",
//           "CurrentAsOf": "2020-09-29T13:26:38Z"
//         },
//         {
//           "CoNameAlias": "General Atlantic Pvt. Ltd.",
//           "IdentifierMd5": "dba581350ee52e5ee4d9c69291bf323c",
//           "CurrentAsOf": "2016-09-06T04:41:31Z"
//         }
//       ],
//       "total_item_count": 4,
//       "page_start": 1,
//       "page_end": 4,
//       "are_more": false
//     },
//     "Introducers": {
//       "data": [
//         {
//           "IntroducerScore": 96,
//           "IntroducerName": "Vince Scafaria",
//           "IntroducerUserKey": "8e9020cd702459b111f77e758cb7258d"
//         },
//         {
//           "IntroducerScore": 89,
//           "IntroducerName": "Jaspreet Bakshi",
//           "IntroducerUserKey": "a1fe921a2b69bd63c6be18369b646942"
//         },
//         {
//           "IntroducerScore": 60,
//           "IntroducerName": "Alexandra McIlraith",
//           "IntroducerUserKey": "94b0857c5545bc25ce89bcfc1d9e009a"
//         },
//         {
//           "IntroducerScore": 5,
//           "IntroducerName": "Amitoj Kapoor",
//           "IntroducerUserKey": "9420855ef4aa2c08dd944fa303486169"
//         }
//       ],
//       "total_item_count": 4,
//       "page_start": 1,
//       "page_end": 4,
//       "are_more": false
//     }
//   }