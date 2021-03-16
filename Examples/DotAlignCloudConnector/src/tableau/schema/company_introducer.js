function getTableName() { 
    return 'company_introducer';
}

function getSchema() { 
    var columns = [{
        id: "company_id",
        dataType: tableau.dataTypeEnum.string
    }, {
        id: "colleague_id",
        dataType: tableau.dataTypeEnum.string
    }, {
        id: "relationship_score",
        dataType: tableau.dataTypeEnum.int
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