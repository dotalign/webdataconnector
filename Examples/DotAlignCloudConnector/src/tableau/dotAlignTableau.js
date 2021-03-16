var helpers = require('../dc/helpers');
var contactSchema = require('./schema/contact');
var colleagueSchema = require('./schema/colleague');
var companySchema = require('./schema/company');
var companyIntroducerSchema = require('./schema/company_introducer');
var companyUrlSchema = require('./schema/company_url');
var companyAliasSchema = require('./schema/company_alias');
var companyIdentityMapSchema = require('./schema/company_identity_map')
var companiesFetcher = require('../dc/fetchers/companies');
var contactsFetcher = require('../dc/fetchers/contacts');
var companyTransformer = require('./transformers/company');
var contactTransformer = require('./transformers/contact');

function getSchema(schemaCallback) { 
    schemaCallback([
        contactSchema.getSchema(),
        colleagueSchema.getSchema(),
        companySchema.getSchema(),
        companyIntroducerSchema.getSchema(),
        companyUrlSchema.getSchema(),
        companyAliasSchema.getSchema(),
        companyIdentityMapSchema.getSchema()
    ]);
};

var companyDataCache = {};
var contactDataCache = {};

async function getData(
    accessToken, 
    table,
    teamNumber,
    skip,
    take,
    tableau) {
        
    var environment = helpers.getEnvironmentParams();
    var rows = [];

    var result = null;

    if ((companyDataCache.colleagues == null) || 
        (contactSchema.getTableName() === table.tableInfo.id) || 
        (companySchema.getTableName() === table.tableInfo.id)) {

        result = await getDataFromDotAlign(
            accessToken, 
            environment, 
            teamNumber,
            table.tableInfo.id,
            skip,
            take,
            tableau);

        switch (table.tableInfo.id) { 
            
            case contactSchema.getTableName(): 

                contactDataCache = contactTransformer.transform(result, tableau);
                break;

            case colleagueSchema.getTableName():
            case companySchema.getTableName():
            case companyIntroducerSchema.getTableName():
            case companyUrlSchema.getTableName():
            case companyAliasSchema.getTableName():
            case companyIdentityMapSchema.getTableName():

                companyDataCache = companyTransformer.transform(result, tableau);
                break;

            default:

                throw `Unexpected table name: ${table.tableInfo.id}`;
        } 
    } 
    
    switch (table.tableInfo.id) { 
            
        case contactSchema.getTableName(): 
            return contactDataCache.contacts;

        case colleagueSchema.getTableName():
            return companyDataCache.colleagues;

        case companySchema.getTableName():
            return companyDataCache.companies;

        case companyIntroducerSchema.getTableName():
            return companyDataCache.companyIntroducers;

        case companyUrlSchema.getTableName():
            return companyDataCache.companyUrls;

        case companyAliasSchema.getTableName():
            return companyDataCache.companyAliases;

        case companyIdentityMapSchema.getTableName():
            return companyDataCache.companyIdentityMaps;

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
        
        case colleagueSchema.getTableName():
        case companySchema.getTableName():
        case companyIntroducerSchema.getTableName():
        case companyUrlSchema.getTableName():
        case companyAliasSchema.getTableName():
        case companyIdentityMapSchema.getTableName():

            result = await companiesFetcher.run(
                environment, 
                teamNumber,
                skip,
                take, 
                accessToken);

            break;
        
        default:

            throw `Unexpected table name requested: ${tableName}` 
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