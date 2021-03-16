function getTableName() { 
    return 'colleague';
}

function getSchema() { 
    var columns = [{
        id: "colleague_id",
        dataType: tableau.dataTypeEnum.string
    }, {
        id: "name",
        dataType: tableau.dataTypeEnum.string
    }, {
        id: "email_address",
        dataType: tableau.dataTypeEnum.string
    }, {
        id: "job_title",
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