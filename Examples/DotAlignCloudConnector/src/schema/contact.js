function getTableName() { 
    return 'Contact';
}

function getSchema() { 
    var contactColumns = [{
        id: "contact_id",
        dataType: tableau.dataTypeEnum.string
    }, {
        id: "best_name",
        dataType: tableau.dataTypeEnum.string
    }, {
        id: "best_email_address",
        dataType: tableau.dataTypeEnum.string
    }, {
        id: "best_job_title",
        dataType: tableau.dataTypeEnum.string
    }, {
        id: "best_company_name",
        dataType: tableau.dataTypeEnum.string
    }, {
        id: "relationship_score",
        dataType: tableau.dataTypeEnum.int
    }, {
        id: "best_introducer_name",
        dataType: tableau.dataTypeEnum.string
    }, {
        id: "best_introducer_relationship_score",
        dataType: tableau.dataTypeEnum.string
    }, {
        id: "best_introducer_id",
        dataType: tableau.dataTypeEnum.string
    }, {
        id: "latest_meeting_date",
        dataType: tableau.dataTypeEnum.datetime
    }, {
        id: "latest_meeting_with_colleague",
        dataType: tableau.dataTypeEnum.string
    }, { 
        id: "latest_outbound_message_date",
        dataType: tableau.dataTypeEnum.string
    }, {   
        id: "latest_outbound_message_with_colleague", 
        dataType: tableau.dataTypeEnum.datetime
    }, { 
        id: "latest_inbound_message_date",
        dataType: tableau.dataTypeEnum.datetime
    }, { 
        id: "latest_inbound_message_with_colleague",
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