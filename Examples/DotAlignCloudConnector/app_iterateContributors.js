const helpers = require("./src/helpers");
const iterator = require("./src/fetchers/contributors");

async function main() {
  var environment = await helpers.getEnvironmentParams();
  var result = iterator.run(environment, 1, 2, 100, 100);
}

main();