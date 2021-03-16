const helpers = require("./src/dc/helpers");
const contributorFetcher = require("./src/dc/fetchers/contributors");

async function main() {
    var environment = await helpers.getEnvironmentParams();

    var result = contributorFetcher.run(
        environment, 
        1 /* teamNumber */, 
        0 /* skip */,
        10 /* take */,
        500 /* contactCount */, 
        500 /* companyCount */);
}

main();