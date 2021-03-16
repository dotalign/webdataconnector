const helpers = require("./src/helpers");
const companiesFetcher = require("./src/fetchers/companies");
const fs = require('fs').promises;
const kumuCompaniesTransformer = require("./src/transformers/kumu/company");
const tableauTransformer = require("./src/transformers/company");
const utils = require("./src/dotalignUtils");

async function main() {
    var environment = await helpers.getEnvironmentParams();
    var result = await companiesFetcher.run(environment, 1 /*teamNumber*/, 500 /*count*/);
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