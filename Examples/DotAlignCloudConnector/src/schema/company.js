function getTableName() { 
    return 'Company';
}

function getSchema() { 
    var companyColumns = [{
        id: "company_name",
        dataType: tableau.dataTypeEnum.string
    }, {
        id: "company_url",
        dataType: tableau.dataTypeEnum.string
    }, {
        id: "company_relationship_score",
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
        id: "introducer_contact_relationship_score",
        dataType: tableau.dataTypeEnum.int
    }, {
        id: "latest_meeting_date",
        dataType: tableau.dataTypeEnum.datetime
    }, {
        id: "latest_meeting_organizer",
        dataType: tableau.dataTypeEnum.string
    }, { 
        id: "latest_meeting_contact",
        dataType: tableau.dataTypeEnum.string
    }, {   
        id: "latest_inbound_email_date", 
        dataType: tableau.dataTypeEnum.datetime
    }, { 
        id: "latest_inbound_email_sender",
        dataType: tableau.dataTypeEnum.string
    }, { 
        id: "latest_inbound_email_recipient",
        dataType: tableau.dataTypeEnum.string
    }, { 
        id: "latest_outbound_email_date",
        dataType: tableau.dataTypeEnum.datetime
    }, { 
        id: "latest_outbound_email_sender",
        dataType: tableau.dataTypeEnum.string
    }, { 
        id: "latest_outbound_email_recipient",
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