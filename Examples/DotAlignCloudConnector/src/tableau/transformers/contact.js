function transform(dotAlignContacts, tableau) { 
    var tableauContacts=[];

    for (i = 0; i < dotAlignContacts.length; i++) {
        var contact = dotAlignContacts[i];
        
        if (null == contact.Stats) { 
            contact.Stats = {};
        }

        var row = {
            "contact_id": contact.PersonMd5,
            "best_name": contact.PersonNameText,
            "best_email_address": contact.BestEmailAddrText,
            "best_job_title": contact.BestJobTitleText,
            "best_company_name": contact.BestJobMatchedCompanyName || contact.BestJobCorpLevelCompanyName,

            "relationship_score": contact.Score,

            "latest_meeting_date": contact.Stats.LastMeeting,
            "latest_meeting_with_colleague": contact.Stats.LastMeetingUserName,
            "latest_inbound_message_date": contact.Stats.LastOutboundMsg,
            "latest_inbound_message_with_colleague": contact.Stats.FirstOutboundMsgUserName,
            "latest_outbound_message_date": contact.Stats.LastInboundMsg,
            "latest_outbound_message_with_colleague": contact.Stats.LastInboundMsgUserName,
        };

        var topIntroducer = null;

        if (null !=  contact.Introducers && null != contact.Introducers.data) { 
            topIntroducer = contact.Introducers.data[0];
        }

        if (null != topIntroducer) {
            row["best_introducer_name"] = topIntroducer.IntroducerName;
            row["best_introducer_relationship_score"] = topIntroducer.ScorePoints;
            row["best_introducer_id"] = topIntroducer.UserKeyMd5;
        }

        // if (contact.Urls != null) {
        //     var urls = [];

        //     for (j = 0; j < contact.Urls.data.length; j++) { 
        //         var url = contact.Urls.data[j].UrlText;
        //         urls.push(url);
        //     }
        
        //     row.urls = urls;
        // }

        // if (contact.Aliases != null) {
        //     var names = [];

        //     for (k = 0; k < contact.Aliases.data.length; k++) { 
        //         var name = contact.Aliases.data[k].NameText;
        //         names.push(name);
        //     }

        //     row.names = names;
        // }

        tableauContacts.push(row);
    }

    tableau.reportProgress("Done converting data from DotAlign to Tableau format");

    return {
        contacts: tableauContacts
    }
}

module.exports = {
    transform
};

// {
//     "PersonMd5": "610ab07ec95992af4097c3c8e7f7ca1f",
//     "PersonNameText": "Martin Wise",
//     "BestJobTitleText": "CEO",
//     "BestJobCorpLevelCompanyName": "RelPro, Inc.",
//     "BestJobMatchedCompanyName": "RelPro, Inc.",
//     "BestJobCompanyMd5": "32d21b1be438e7d433272ad1024ef246",
//     "BestEmailAddrText": "mwise@relpro.com",
//     "BestEmailCurrentAsOf": "2020-12-22T20:53:20Z",
//     "BestPhoneText": "+19089624881",
//     "BestPhoneType": "Mobile",
//     "BestPhoneCurrentAsOf": "2020-12-22T20:53:20Z",
//     "Score": 100,
//     "Stats": {
//       "ContactMd5": "610ab07ec95992af4097c3c8e7f7ca1f",
//       "FirstInboundMsg": "2016-10-13T15:29:08Z",
//       "FirstInboundMsgUserKeyMd5": "8e9020cd702459b111f77e758cb7258d",
//       "FirstMeeting": "2016-10-01T11:30:00Z",
//       "FirstMeetingUserKeyMd5": "a1fe921a2b69bd63c6be18369b646942",
//       "FirstOutboundMsg": "2016-10-14T01:11:14Z",
//       "FirstOutboundMsgUserKeyMd5": "8e9020cd702459b111f77e758cb7258d",
//       "LastInboundMsg": "2020-12-22T20:53:20Z",
//       "LastInboundMsgUserKeyMd5": "8e9020cd702459b111f77e758cb7258d",
//       "LastMeeting": "2020-09-01T17:00:00Z",
//       "LastMeetingUserKeyMd5": "8e9020cd702459b111f77e758cb7258d",
//       "LastOutboundMsg": "2020-12-22T20:56:29Z",
//       "LastOutboundMsgUserKeyMd5": "8e9020cd702459b111f77e758cb7258d",
//       "NumInboundMsgs": 303,
//       "NumMeetings": 52,
//       "NumOutboundMsgs": 222,
//       "LastMeetingUserName": "Vince Scafaria",
//       "LastOutboundMsgUserName": "Vince Scafaria",
//       "LastInboundMsgUserName": "Vince Scafaria",
//       "FirstMeetingUserName": "Jaspreet Bakshi",
//       "FirstOutboundMsgUserName": "Vince Scafaria",
//       "FirstInboundMsgUserName": "Vince Scafaria"
//     },
//     "Phones": {
//       "data": [
//         {
//           "PersonMd5": "610ab07ec95992af4097c3c8e7f7ca1f",
//           "CurrentAsOf": "2020-12-22T20:53:20Z",
//           "StandardizedPhoneNumber": "+19089624881",
//           "PhoneType": "Mobile"
//         }
//       ],
//       "total_item_count": 1,
//       "page_start": 1,
//       "page_end": 1,
//       "are_more": false
//     },
//     "Emails": {
//       "data": [
//         {
//           "PersonMd5": "610ab07ec95992af4097c3c8e7f7ca1f",
//           "AddressText": "mwise@relpro.com",
//           "CurrentAsOf": "2020-12-22T20:53:20Z",
//           "IdentifierMd5": "614a66ba81b94bbf007cabee935a0b22"
//         }
//       ],
//       "total_item_count": 1,
//       "page_start": 1,
//       "page_end": 1,
//       "are_more": false
//     },
//     "Names": {
//       "data": [
//         {
//           "StandardizedName": "Martin Wise",
//           "IdentifierMd5": "610ab07ec95992af4097c3c8e7f7ca1f",
//           "CurrentAsOf": "2021-01-14T14:40:26.12Z"
//         }
//       ],
//       "total_item_count": 1,
//       "page_start": 1,
//       "page_end": 1,
//       "are_more": false
//     },
//     "Introducers": {
//       "data": [
//         {
//           "UserKeyMd5": "8e9020cd702459b111f77e758cb7258d",
//           "ScorePoints": 100,
//           "IntroducerName": "Vince Scafaria",
//           "IntroducerPersonKeyMd5": "197f7b7bd4766ab895264b41de3cb176",
//           "IntroducerBestJobCompanyMd5": "2108662b27b32c535a7e4699c31064c7",
//           "IntroducerBestJobCorpLevelCompanyName": "DotAlign, Inc.",
//           "IntroducerBestJobMatchedCompanyName": "DotAlign, Inc.",
//           "IntroducerBestJobTitleText": "CEO"
//         },
//         {
//           "UserKeyMd5": "a1fe921a2b69bd63c6be18369b646942",
//           "ScorePoints": 60,
//           "IntroducerName": "Jaspreet Bakshi",
//           "IntroducerPersonKeyMd5": "218363f35a6fac75521a94dfd5f867d2",
//           "IntroducerBestJobCompanyMd5": "2108662b27b32c535a7e4699c31064c7",
//           "IntroducerBestJobCorpLevelCompanyName": "DotAlign, Inc.",
//           "IntroducerBestJobMatchedCompanyName": "DotAlign",
//           "IntroducerBestJobTitleText": "CTO"
//         },
//         {
//           "UserKeyMd5": "94b0857c5545bc25ce89bcfc1d9e009a",
//           "ScorePoints": 21,
//           "IntroducerName": "Alexandra McIlraith",
//           "IntroducerPersonKeyMd5": "63f00b7d593fa35c99461956e16cd92a",
//           "IntroducerBestJobCompanyMd5": "2108662b27b32c535a7e4699c31064c7",
//           "IntroducerBestJobCorpLevelCompanyName": "DotAlign, Inc.",
//           "IntroducerBestJobMatchedCompanyName": "DotAlign, Inc.",
//           "IntroducerBestJobTitleText": "Product Manager"
//         },
//         {
//           "UserKeyMd5": "9420855ef4aa2c08dd944fa303486169",
//           "ScorePoints": 1,
//           "IntroducerName": "Amitoj Kapoor",
//           "IntroducerPersonKeyMd5": "01f050f0428ce95fad52f13aa4ac43fd",
//           "IntroducerBestJobCompanyMd5": "2108662b27b32c535a7e4699c31064c7",
//           "IntroducerBestJobCorpLevelCompanyName": "DotAlign, Inc.",
//           "IntroducerBestJobMatchedCompanyName": "DotAlign, Inc.",
//           "IntroducerBestJobTitleText": "Software Engineer"
//         }
//       ],
//       "total_item_count": 4,
//       "page_start": 1,
//       "page_end": 4,
//       "are_more": false
//     },
//     "Jobs": {
//       "data": [
//         {
//           "JobCoName": "RelPro, Inc.",
//           "JobCorpLevelName": "RelPro, Inc.",
//           "JobCurrentAsOf": "2021-01-14T14:40:26.12Z",
//           "JobTitleText": "CEO"
//         }
//       ],
//       "total_item_count": 1,
//       "page_start": 1,
//       "page_end": 1,
//       "are_more": false
//     }
// }