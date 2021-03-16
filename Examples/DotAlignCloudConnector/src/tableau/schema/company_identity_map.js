function getTableName() { 
    return 'company_identity_map';
}

function getSchema() { 
    var columns = [{
        id: "primary_id",
        dataType: tableau.dataTypeEnum.string
    }, {
        id: "secondary_id",
        dataType: tableau.dataTypeEnum.string
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