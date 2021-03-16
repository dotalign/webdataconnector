function getTableName() { 
    return 'Company';
}

function getSchema() { 
    var companyColumns = [{
        id: "company_id",
        dataType: tableau.dataTypeEnum.string
    }, {
        id: "best_name",
        dataType: tableau.dataTypeEnum.string
    }, {
        id: "best_url",
        dataType: tableau.dataTypeEnum.string
    }, {
        id: "relationship_score",
        dataType: tableau.dataTypeEnum.int
    }, {
        id: "best_contact_name",
        dataType: tableau.dataTypeEnum.string
    }, {
        id: "best_contact_job_title",
        dataType: tableau.dataTypeEnum.string
    }, {
        id: "best_introducer_name",
        dataType: tableau.dataTypeEnum.string
    }, {
        id: "best_introducer_contact_relationship_score",
        dataType: tableau.dataTypeEnum.int
    }, {
        id: "best_introducer_id",
        dataType: tableau.dataTypeEnum.string
    }, {
        id: "latest_meeting_date",
        dataType: tableau.dataTypeEnum.datetime
    }, {
        id: "latest_meeting_with_contact",
        dataType: tableau.dataTypeEnum.string
    }, { 
        id: "latest_meeting_with_colleague",
        dataType: tableau.dataTypeEnum.string
    }, {   
        id: "latest_inbound_message_date", 
        dataType: tableau.dataTypeEnum.datetime
    }, { 
        id: "latest_inbound_message_with_contact",
        dataType: tableau.dataTypeEnum.string
    }, { 
        id: "latest_inbound_message_with_colleague",
        dataType: tableau.dataTypeEnum.string
    }, { 
        id: "latest_outbound_email_date",
        dataType: tableau.dataTypeEnum.datetime
    }, { 
        id: "latest_outbound_message_with_contact",
        dataType: tableau.dataTypeEnum.string
    }, { 
        id: "latest_outbound_message_with_colleague",
        dataType: tableau.dataTypeEnum.string
    }, { 
        id: "urls",
        dataType: tableau.dataTypeEnum.string
    }, { 
        id: "names",
        dataType: tableau.dataTypeEnum.string
    }];

    var companyTableSchema = {
        id: getTableName(),
        columns: companyColumns
    };

    return companyTableSchema;
};

module.exports = {
    getTableName,
    getSchema
};