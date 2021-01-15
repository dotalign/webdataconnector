function getTableName() { 
    return 'Contact';
}

function getSchema() { 
    var contactColumns = [{
        id: "full_name",
        dataType: tableau.dataTypeEnum.string
    }, {
        id: "email_address",
        dataType: tableau.dataTypeEnum.string
    }, {
        id: "job_title",
        dataType: tableau.dataTypeEnum.string
    }, {
        id: "company_name",
        dataType: tableau.dataTypeEnum.string
    }, {
        id: "relationship_score",
        dataType: tableau.dataTypeEnum.int
    }, {
        id: "best_introducer",
        dataType: tableau.dataTypeEnum.string
    }, {
        id: "latest_meeting_date",
        dataType: tableau.dataTypeEnum.datetime
    }, {
        id: "latest_meeting_with",
        dataType: tableau.dataTypeEnum.string
    }, {   
        id: "latest_email_to_contact_date", 
        dataType: tableau.dataTypeEnum.datetime
    }, { 
        id: "latest_email_to_contact_sender",
        dataType: tableau.dataTypeEnum.string
    }, { 
        id: "latest_email_from_contact_date",
        dataType: tableau.dataTypeEnum.datetime
    }, { 
        id: "latest_email_from_contact_recepient",
        dataType: tableau.dataTypeEnum.string
    }];

    var contactTableSchema = {
        id: getTableName(),
        columns: contactColumns
    };

    return contactTableSchema;
}

module.exports = {
    getTableName,
    getSchema
};