function getTableName() { 
    return 'company_url';
}

function getSchema() { 
    var columns = [{
        id: "company_id",
        dataType: tableau.dataTypeEnum.string
    }, {
        id: "url_id",
        dataType: tableau.dataTypeEnum.string
    }, {
        id: "url_text",
        dataType: tableau.dataTypeEnum.string
    }, {
        id: "current_as_of",
        dataType: tableau.dataTypeEnum.datetime
    }];

    var schema = {
        id: getTableName(),
        columns: columns
    };

    return schema;
}

module.exports = {
    getTableName,
    getSchema
};