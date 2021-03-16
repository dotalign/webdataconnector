var helpers = require('../dc/helpers');
var dotAlignUtils = require('../dc/dotAlignUtils');
var companySchema = require('./schema/company');
var contactSchema = require('./schema/contact');
var companiesFetcher = require('../dc/fetchers/companies');
var contactsFetcher = require('../dc/fetchers/contacts');
var companyTransformer = require('./transformers/company');
var contactTransformer = require('./transformers/contact');

function getSchema(schemaCallback) { 
    schemaCallback([contactSchema.getSchema(), companySchema.getSchema()]);
};

async function getData(accessToken, table, tableau) {
    var environment = helpers.getEnvironmentParams();
    var teamNumber = 1;
    var skip = 0;
    var take = 500;
    var rows = [];

    var result = await getDataFromDotAlign(
        accessToken, 
        environment, 
        teamNumber,
        table.tableInfo.id,
        skip,
        take,
        tableau);

    switch (table.tableInfo.id) { 
        
        case contactSchema.getTableName(): 
            rows = contactTransformer.transform(result, tableau);
            break;

        case companySchema.getTableName(): 
            rows = companyTransformer.transform(result, tableau);
            break;

        default:
            throw `Unexpected table name: ${table.tableInfo.id}`;
    }

    return rows;
};

async function getDataFromDotAlign(
    accessToken,
    environment, 
    teamNumber,
    tableName,
    skip,
    take,
    tableau) {

    if (null != tableau) { 
        tableau.reportProgress("Starting to fetch data from DotAlign...");
    }

    var result = null;

    switch (tableName) {
        
        case contactSchema.getTableName():
            
            result = await contactsFetcher.run(
                environment,
                teamNumber,
                skip,
                take,
                accessToken);

            break;
        
        case companySchema.getTableName():

            result = await companiesFetcher.run(
                environment, 
                teamNumber,
                skip,
                take, 
                accessToken);

            break;
        
        default:

            throw `Unexpected category of data requested: ${tableName}` 
    }

    if (null != tableau) {
        tableau.reportProgress("Done fetching data from DotAlign");
    }

    return result.data;
}

module.exports = {
    getSchema,
    getData 
};