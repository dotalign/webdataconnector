const fetch = require("node-fetch");
const dotAlignUtils = require("./dotAlignUtils");

// POST utility function
async function postData(url, body) {
  const response = await fetch(url, {
    method: "POST",
    body: body,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  console.log("Response: ");
  dotAlignUtils.logObject(response);

  return response.json();
}

// POST utility function
async function postDataGetResponse(url, body) {
    const response = await fetch(url, {
      method: "POST",
      body: body,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    console.log("Response: ");
    dotAlignUtils.logObject(response);

    var responseJson = response.json();
    console.log("Response json: ");
    dotAlignUtils.logObject(responseJson);

    return { 
        response: response,
        json: responseJson
    };
  }

// GET utility function
async function getData(url, accessToken) {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  });

  return response.json();
}

// This function gets an access token from Azure AD
async function getAccessToken(environment) {
  var authEndpoint = `https://login.microsoftonline.com/${environment.tenant_id}/oauth2/v2.0/token`;

  var body =
    `grant_type=${environment.grant_type}&client_id=${environment.client_id}&` +
    `client_secret=${environment.client_secret}&tenant_id=${environment.tenant_id}&scope=${environment.scope}`;

  var response = await postData(authEndpoint, body);
  return response;
}

async function getDataWithRetries(maxRetries, url, accessToken) {
  var tryCount = 0;
  var response = null;

  while (tryCount < maxRetries) {
    try {
      response = await getData(url, accessToken);
      break;
    } catch (e) {
      console.log(e);

      tryCount++;

      if (tryCount == maxRetries) {
        console.log(`Failed to get data after ${maxRetries} tries...`);
        throw {
          exception: e,
          response: response,
        };
      }
    }
  }

  return response;
}

async function getSomeData(apiBaseUrl, accessToken, params, urlCreator) {
  var totalFetchCount = params.totalFetchCount;
  var fetched = 0;
  var areMore = true;
  var maxRetries = 3;
  var data = [];

  while (areMore && fetched < totalFetchCount) {
    var before = Date.now();
    var url = await urlCreator(apiBaseUrl, params);
    var result = null;

    try {
      result = await getDataWithRetries(maxRetries, url, accessToken);

      for (var i = 0; i < result.data.length; i++) {
        data.push(result.data[i]);
      }
    } catch (e) {
      console.log(
        `And exception was encountered while fetching data. ${fetched} records fetched so far.`
      );
      e.fetched = fetched;
      throw e;
    }

    areMore = result.are_more;
    params.skip += params.take;
    fetched += result.data.length;

    var elapsed = Date.now() - before;

    console.log(
      `Fetched ${result.page_start} to ${result.page_end} in ${elapsed} ms`
    );
  }

  console.log(`Done...fetched ${fetched} records`);

  return {
    fetched: fetched,
    data: data,
  };
}

async function fetchDC(environment, params, urlCreator) {
  var response = await getAccessToken(environment);
  var accessToken = response.access_token;
  var done = false;
  var fetched = 0;
  var apiBaseUrl = environment.apiBaseUrl;

  while (!done) {
    params.skip = fetched;

    var result = null;

    try {
      var before = process.hrtime();
      result = await getSomeData(apiBaseUrl, accessToken, params, urlCreator);
      var elapsed = process.hrtime(before);
      console.log(
        `Finished a run in ${elapsed[0]} seconds. ${result.fetched} items were fetched.`
      );
      done = true;
    } catch (e) {
      dotAlignUtils.logObject(e);
      console.log(`An exception was encountered. Fetched ${e.fetched} so far.`);
      fetched = e.fetched;
      response = await getAccessToken(environment);
      accessToken = response.access_token;
    }
  }
}

async function fetchDCWithAccessToken(environment, params, urlCreator, accessToken) {
  var done = false;
  var fetched = 0;
  var apiBaseUrl = environment.apiBaseUrl;

  while (!done) {
    params.skip = fetched;

    var result = null;

    try {
      var before = Date.now();
      result = await getSomeData(apiBaseUrl, accessToken, params, urlCreator);
      var after = Date.now();
      var elapsed = after - before;
      console.log(
        `Finished a run in ${elapsed} ms. ${result.fetched} items were fetched.`
      );
      done = true;
    } catch (e) {
        console.log(`An exception was encountered. Fetched ${e.fetched} so far.`);
        console.error(e)
        fetched = e.fetched;
    }
  }

  return result;
}

module.exports = {
    postData,
    postDataGetResponse,
    getAccessToken,
    fetchDCWithAccessToken,
    fetchDC 
};