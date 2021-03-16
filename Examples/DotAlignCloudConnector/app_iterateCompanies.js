const helpers = require("./src/dc/helpers");
const companiesFetcher = require("./src/dc/fetchers/companies");
const fs = require('fs').promises;
const kumuCompaniesTransformer = require("./src/kumu/company");
const tableauTransformer = require("./src/tableau/transformers/company");
const utils = require("./src/dc/dotalignUtils");

async function main() {
    var environment = await helpers.getEnvironmentParams();
    
    var result = await companiesFetcher.run(
        environment, 
        1 /* teamNumber */, 
        0 /* skip*/,
        500 /* take */,
        null /* accessToken */);
    
    var companies = result.data;
    var tableauCompanies = tableauTransformer.transform(companies, /* tableau */ null);

    for (var i = 0; i < tableauCompanies.length; i++) { 
        utils.logObject(tableauCompanies[i]);
    }
}

async function kumon() {
    var kumuData = kumuCompaniesTransformer.transform(companies);
    await writeToFile(kumuData, "kumuCompanies.json")
}

async function writeToFile(kumuData, fileName) { 
    let data = JSON.stringify(kumuData, null, 2);
    await fs.writeFile(fileName, data);
}

main();