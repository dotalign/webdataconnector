/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/node-fetch/browser.js":
/*!********************************************!*\
  !*** ./node_modules/node-fetch/browser.js ***!
  \********************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_exports__ */
/*! CommonJS bailout: exports is used directly at 16:17-24 */
/*! CommonJS bailout: module.exports is used directly at 16:0-14 */
/***/ ((module, exports) => {

"use strict";
eval("\n\n// ref: https://github.com/tc39/proposal-global\nvar getGlobal = function () {\n\t// the only reliable means to get the global object is\n\t// `Function('return this')()`\n\t// However, this causes CSP violations in Chrome apps.\n\tif (typeof self !== 'undefined') { return self; }\n\tif (typeof window !== 'undefined') { return window; }\n\tif (typeof global !== 'undefined') { return global; }\n\tthrow new Error('unable to locate global object');\n}\n\nvar global = getGlobal();\n\nmodule.exports = exports = global.fetch;\n\n// Needed for TypeScript and Webpack.\nif (global.fetch) {\n\texports.default = global.fetch.bind(global);\n}\n\nexports.Headers = global.Headers;\nexports.Request = global.Request;\nexports.Response = global.Response;\n\n//# sourceURL=webpack://DotAlignCloudConnectorForTableau/./node_modules/node-fetch/browser.js?");

/***/ }),

/***/ "./node_modules/querystring/decode.js":
/*!********************************************!*\
  !*** ./node_modules/querystring/decode.js ***!
  \********************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/*! CommonJS bailout: module.exports is used directly at 31:0-14 */
/***/ ((module) => {

"use strict";
eval("// Copyright Joyent, Inc. and other Node contributors.\n//\n// Permission is hereby granted, free of charge, to any person obtaining a\n// copy of this software and associated documentation files (the\n// \"Software\"), to deal in the Software without restriction, including\n// without limitation the rights to use, copy, modify, merge, publish,\n// distribute, sublicense, and/or sell copies of the Software, and to permit\n// persons to whom the Software is furnished to do so, subject to the\n// following conditions:\n//\n// The above copyright notice and this permission notice shall be included\n// in all copies or substantial portions of the Software.\n//\n// THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS\n// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF\n// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN\n// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,\n// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR\n// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE\n// USE OR OTHER DEALINGS IN THE SOFTWARE.\n\n\n\n// If obj.hasOwnProperty has been overridden, then calling\n// obj.hasOwnProperty(prop) will break.\n// See: https://github.com/joyent/node/issues/1707\nfunction hasOwnProperty(obj, prop) {\n  return Object.prototype.hasOwnProperty.call(obj, prop);\n}\n\nmodule.exports = function(qs, sep, eq, options) {\n  sep = sep || '&';\n  eq = eq || '=';\n  var obj = {};\n\n  if (typeof qs !== 'string' || qs.length === 0) {\n    return obj;\n  }\n\n  var regexp = /\\+/g;\n  qs = qs.split(sep);\n\n  var maxKeys = 1000;\n  if (options && typeof options.maxKeys === 'number') {\n    maxKeys = options.maxKeys;\n  }\n\n  var len = qs.length;\n  // maxKeys <= 0 means that we should not limit keys count\n  if (maxKeys > 0 && len > maxKeys) {\n    len = maxKeys;\n  }\n\n  for (var i = 0; i < len; ++i) {\n    var x = qs[i].replace(regexp, '%20'),\n        idx = x.indexOf(eq),\n        kstr, vstr, k, v;\n\n    if (idx >= 0) {\n      kstr = x.substr(0, idx);\n      vstr = x.substr(idx + 1);\n    } else {\n      kstr = x;\n      vstr = '';\n    }\n\n    k = decodeURIComponent(kstr);\n    v = decodeURIComponent(vstr);\n\n    if (!hasOwnProperty(obj, k)) {\n      obj[k] = v;\n    } else if (Array.isArray(obj[k])) {\n      obj[k].push(v);\n    } else {\n      obj[k] = [obj[k], v];\n    }\n  }\n\n  return obj;\n};\n\n\n//# sourceURL=webpack://DotAlignCloudConnectorForTableau/./node_modules/querystring/decode.js?");

/***/ }),

/***/ "./node_modules/querystring/encode.js":
/*!********************************************!*\
  !*** ./node_modules/querystring/encode.js ***!
  \********************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/*! CommonJS bailout: module.exports is used directly at 40:0-14 */
/***/ ((module) => {

"use strict";
eval("// Copyright Joyent, Inc. and other Node contributors.\n//\n// Permission is hereby granted, free of charge, to any person obtaining a\n// copy of this software and associated documentation files (the\n// \"Software\"), to deal in the Software without restriction, including\n// without limitation the rights to use, copy, modify, merge, publish,\n// distribute, sublicense, and/or sell copies of the Software, and to permit\n// persons to whom the Software is furnished to do so, subject to the\n// following conditions:\n//\n// The above copyright notice and this permission notice shall be included\n// in all copies or substantial portions of the Software.\n//\n// THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS\n// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF\n// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN\n// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,\n// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR\n// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE\n// USE OR OTHER DEALINGS IN THE SOFTWARE.\n\n\n\nvar stringifyPrimitive = function(v) {\n  switch (typeof v) {\n    case 'string':\n      return v;\n\n    case 'boolean':\n      return v ? 'true' : 'false';\n\n    case 'number':\n      return isFinite(v) ? v : '';\n\n    default:\n      return '';\n  }\n};\n\nmodule.exports = function(obj, sep, eq, name) {\n  sep = sep || '&';\n  eq = eq || '=';\n  if (obj === null) {\n    obj = undefined;\n  }\n\n  if (typeof obj === 'object') {\n    return Object.keys(obj).map(function(k) {\n      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;\n      if (Array.isArray(obj[k])) {\n        return obj[k].map(function(v) {\n          return ks + encodeURIComponent(stringifyPrimitive(v));\n        }).join(sep);\n      } else {\n        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));\n      }\n    }).join(sep);\n\n  }\n\n  if (!name) return '';\n  return encodeURIComponent(stringifyPrimitive(name)) + eq +\n         encodeURIComponent(stringifyPrimitive(obj));\n};\n\n\n//# sourceURL=webpack://DotAlignCloudConnectorForTableau/./node_modules/querystring/encode.js?");

/***/ }),

/***/ "./node_modules/querystring/index.js":
/*!*******************************************!*\
  !*** ./node_modules/querystring/index.js ***!
  \*******************************************/
/*! default exports */
/*! export decode [provided] [no usage info] [missing usage info prevents renaming] */
/*! export encode [provided] [no usage info] [missing usage info prevents renaming] */
/*! export parse [provided] [no usage info] [provision prevents renaming (no use info)] -> ./node_modules/querystring/decode.js */
/*!   exports [maybe provided (runtime-defined)] [no usage info] */
/*! export stringify [provided] [no usage info] [provision prevents renaming (no use info)] -> ./node_modules/querystring/encode.js */
/*!   exports [maybe provided (runtime-defined)] [no usage info] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__ */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\n\nexports.decode = exports.parse = __webpack_require__(/*! ./decode */ \"./node_modules/querystring/decode.js\");\nexports.encode = exports.stringify = __webpack_require__(/*! ./encode */ \"./node_modules/querystring/encode.js\");\n\n\n//# sourceURL=webpack://DotAlignCloudConnectorForTableau/./node_modules/querystring/index.js?");

/***/ }),

/***/ "./src/dotAlignCloud.js":
/*!******************************!*\
  !*** ./src/dotAlignCloud.js ***!
  \******************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/*! CommonJS bailout: module.exports is used directly at 200:0-14 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const fetch = __webpack_require__(/*! node-fetch */ \"./node_modules/node-fetch/browser.js\");\r\nconst dotAlignUtils = __webpack_require__(/*! ./dotAlignUtils */ \"./src/dotAlignUtils.js\");\r\n\r\n// POST utility function\r\nasync function postData(url, body) {\r\n  const response = await fetch(url, {\r\n    method: \"POST\",\r\n    body: body,\r\n    headers: {\r\n      \"Content-Type\": \"application/x-www-form-urlencoded\",\r\n    },\r\n  });\r\n\r\n  console.log(\"Response: \");\r\n  dotAlignUtils.logObject(response);\r\n\r\n  return response.json();\r\n}\r\n\r\n// POST utility function\r\nasync function postDataGetResponse(url, body) {\r\n    const response = await fetch(url, {\r\n      method: \"POST\",\r\n      body: body,\r\n      headers: {\r\n        \"Content-Type\": \"application/x-www-form-urlencoded\",\r\n      },\r\n    });\r\n\r\n    console.log(\"Response: \");\r\n    dotAlignUtils.logObject(response);\r\n\r\n    var responseJson = response.json();\r\n    console.log(\"Response json: \");\r\n    dotAlignUtils.logObject(responseJson);\r\n\r\n    return { \r\n        response: response,\r\n        json: responseJson\r\n    };\r\n  }\r\n\r\n// GET utility function\r\nasync function getData(url, accessToken) {\r\n  const response = await fetch(url, {\r\n    method: \"GET\",\r\n    headers: {\r\n      Authorization: \"Bearer \" + accessToken,\r\n    },\r\n  });\r\n\r\n  return response.json();\r\n}\r\n\r\n// This function gets an access token from Azure AD\r\nasync function getAccessToken(environment) {\r\n  var authEndpoint = `https://login.microsoftonline.com/${environment.tenant_id}/oauth2/v2.0/token`;\r\n\r\n  var body =\r\n    `grant_type=${environment.grant_type}&client_id=${environment.client_id}&` +\r\n    `client_secret=${environment.client_secret}&tenant_id=${environment.tenant_id}&scope=${environment.scope}`;\r\n\r\n  var response = await postData(authEndpoint, body);\r\n  return response;\r\n}\r\n\r\nasync function getDataWithRetries(maxRetries, url, accessToken) {\r\n  var tryCount = 0;\r\n  var response = null;\r\n\r\n  while (tryCount < maxRetries) {\r\n    try {\r\n      response = await getData(url, accessToken);\r\n      break;\r\n    } catch (e) {\r\n      console.log(e);\r\n\r\n      tryCount++;\r\n\r\n      if (tryCount == maxRetries) {\r\n        console.log(`Failed to get data after ${maxRetries} tries...`);\r\n        throw {\r\n          exception: e,\r\n          response: response,\r\n        };\r\n      }\r\n    }\r\n  }\r\n\r\n  return response;\r\n}\r\n\r\nasync function getSomeData(apiBaseUrl, accessToken, params, urlCreator) {\r\n    var totalFetchCount = params.totalFetchCount;\r\n    var fetched = 0;\r\n    var areMore = true;\r\n    var maxRetries = 3;\r\n    var data = [];\r\n\r\n    while (areMore && fetched < totalFetchCount) {\r\n        var before = Date.now();\r\n        var url = await urlCreator(apiBaseUrl, params);\r\n        var result = null;\r\n\r\n        try {\r\n            result = await getDataWithRetries(maxRetries, url, accessToken);\r\n\r\n            for (var i = 0; i < result.data.length; i++) {\r\n                data.push(result.data[i]);\r\n            }\r\n        } catch (e) {\r\n            console.log(`And exception was encountered while fetching data. ${fetched} records fetched so far.`);\r\n            e.fetched = fetched;\r\n            throw e;\r\n        }\r\n\r\n        areMore = result.are_more;\r\n        params.skip += params.take;\r\n        fetched += result.data.length;\r\n\r\n        var elapsed = Date.now() - before;\r\n\r\n        console.log(`Fetched ${result.page_start} to ${result.page_end} in ${elapsed} ms`);\r\n    }\r\n\r\n    console.log(`Done...fetched ${fetched} records`);\r\n\r\n    return {\r\n    fetched: fetched,\r\n    data: data,\r\n    };\r\n}\r\n\r\nasync function fetchDC(environment, params, urlCreator) {\r\n    var response = await getAccessToken(environment);\r\n    var accessToken = response.access_token;\r\n    var done = false;\r\n    var fetched = 0;\r\n    var apiBaseUrl = environment.apiBaseUrl;\r\n\r\n    while (!done) {\r\n        params.skip = fetched;\r\n\r\n        var result = null;\r\n\r\n        try {\r\n            var before = process.hrtime();\r\n            result = await getSomeData(apiBaseUrl, accessToken, params, urlCreator);\r\n            var elapsed = process.hrtime(before);\r\n            console.log(`Finished a run in ${elapsed[0]} seconds. ${result.fetched} items were fetched.`);\r\n            done = true;\r\n        } catch (e) {\r\n            dotAlignUtils.logObject(e);\r\n            console.log(`An exception was encountered. Fetched ${e.fetched} so far.`);\r\n            fetched = e.fetched;\r\n            response = await getAccessToken(environment);\r\n            accessToken = response.access_token;\r\n        }\r\n    }\r\n\r\n    return result;\r\n}\r\n\r\nasync function fetchDCWithAccessToken(\r\n    environment, \r\n    params, \r\n    urlCreator, \r\n    accessToken) {\r\n    var done = false;\r\n    var fetched = 0;\r\n    var apiBaseUrl = environment.apiBaseUrl;\r\n\r\n    if (null == accessToken) { \r\n        var response = await getAccessToken(environment);\r\n        accessToken = response.access_token;\r\n    }\r\n\r\n    while (!done) {\r\n        params.skip = fetched;\r\n\r\n        var result = null;\r\n\r\n        try {\r\n            var before = Date.now();\r\n            result = await getSomeData(apiBaseUrl, accessToken, params, urlCreator);\r\n            var after = Date.now();\r\n            var elapsed = after - before;\r\n            console.log(`Finished a run in ${elapsed} ms. ${result.fetched} items were fetched.`);\r\n            done = true;\r\n        } catch (e) {\r\n            console.log(`An exception was encountered. Fetched ${e.fetched} so far.`);\r\n            console.error(e)\r\n            fetched = e.fetched;\r\n        }\r\n    }\r\n\r\n    return result;\r\n}\r\n\r\nmodule.exports = {\r\n    postData,\r\n    postDataGetResponse,\r\n    getAccessToken,\r\n    fetchDCWithAccessToken,\r\n    fetchDC \r\n};\n\n//# sourceURL=webpack://DotAlignCloudConnectorForTableau/./src/dotAlignCloud.js?");

/***/ }),

/***/ "./src/dotAlignUrls.js":
/*!*****************************!*\
  !*** ./src/dotAlignUrls.js ***!
  \*****************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/*! CommonJS bailout: module.exports is used directly at 44:0-14 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const querystring = __webpack_require__(/*! querystring */ \"./node_modules/querystring/index.js\")\r\n\r\nasync function teamMemberFetchUrlCreator(baseUrl, params) {\r\n  var teamNumber = params.teamNumber;\r\n  var skip = params.skip;\r\n  var take = params.take;\r\n  var includeHealthStats = params.includeHealthStats;\r\n  var url = `${baseUrl}/teams/${teamNumber}/members?Skip=${skip}&Take=${take}&IncludeHealthStats=${includeHealthStats}`;\r\n  return url;\r\n}\r\n\r\nasync function contactsFetchUrlCreator(baseUrl, params) {\r\n    var qps = querystring.stringify(params);\r\n    var url = `${baseUrl}/people?${qps}`;\r\n    return url;\r\n}\r\n\r\nasync function companiesFetchUrlCreatorNew(baseUrl, params) {\r\n    var qps = querystring.stringify(params);\r\n    var url = `${baseUrl}/companies?${qps}`;\r\n    return url;\r\n}\r\n\r\nasync function contributorPeopleFetchUrlCreator(baseUrl, params) {\r\n  var teamNumber = params.teamNumber;\r\n  var skip = params.skip;\r\n  var take = params.take;\r\n  var detailLevel = params.detailLevel;\r\n  var contributorKey = params.contributorKey;\r\n  var url = `${baseUrl}/users/${contributorKey}/people?SourceTeam=${teamNumber}&Skip=${skip}&Take=${take}&IncludeDetailLevel=${detailLevel}`;\r\n  return url;\r\n}\r\n\r\nasync function contributorCompaniesFetchUrlCreator(baseUrl, params) {\r\n  var teamNumber = params.teamNumber;\r\n  var skip = params.skip;\r\n  var take = params.take;\r\n  var detailLevel = params.detailLevel;\r\n  var contributorKey = params.contributorKey;\r\n  var url = `${baseUrl}/users/${contributorKey}/companies?SourceTeam=${teamNumber}&Skip=${skip}&Take=${take}&IncludeDetailLevel=${detailLevel}`;\r\n  return url;\r\n}\r\n\r\nmodule.exports = { \r\n    teamMemberFetchUrlCreator, \r\n    contactsFetchUrlCreator,\r\n    companiesFetchUrlCreatorNew,\r\n    contributorPeopleFetchUrlCreator, \r\n    contributorCompaniesFetchUrlCreator \r\n}\n\n//# sourceURL=webpack://DotAlignCloudConnectorForTableau/./src/dotAlignUrls.js?");

/***/ }),

/***/ "./src/dotAlignUtils.js":
/*!******************************!*\
  !*** ./src/dotAlignUtils.js ***!
  \******************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/*! CommonJS bailout: module.exports is used directly at 28:0-14 */
/***/ ((module) => {

eval("async function logObject(object) { \r\n  console.log(JSON.stringify(object, null, 5));\r\n}\r\n\r\nasync function asyncExecutor(asyncFuntionToExecute, arg1, arg2) { \r\n  let result;\r\n  \r\n  try {\r\n      var returnValue = await asyncFuntionToExecute(arg1, arg2);\r\n\r\n      result = {\r\n          success: true,\r\n          returnValue: returnValue\r\n      };\r\n  } catch(e) {\r\n      logObject(e);\r\n\r\n      result = {\r\n          success: false,\r\n          error: e,\r\n          returnValue: null\r\n      };\r\n  }\r\n\r\n  return result;\r\n}\r\n\r\nmodule.exports = { logObject, asyncExecutor }\n\n//# sourceURL=webpack://DotAlignCloudConnectorForTableau/./src/dotAlignUtils.js?");

/***/ }),

/***/ "./src/helpers.js":
/*!************************!*\
  !*** ./src/helpers.js ***!
  \************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/*! CommonJS bailout: module.exports is used directly at 56:0-14 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("// require('dotenv').config();\r\nconst dotAlignUtils = __webpack_require__(/*! ./dotAlignUtils */ \"./src/dotAlignUtils.js\");\r\n\r\nfunction getEnvironmentParams() {\r\n  return environment = {\r\n      // Info related to the DotAlign Cloud API\r\n      apiBaseUrl: \"https://dotalign-obhnbxktkccdo-webapp.azurewebsites.net/api\",\r\n      // apiBaseUrl: \"https://qa.dotalign.com/api\",\r\n      // apiBaseUrl: \"https://dotalign-gcoajfbcgsrka-webapp.azurewebsites.net\",\r\n      tenant_id: \"ef816895-7d31-42b9-a2e6-a2cc244e05c5\",\r\n      grant_type: \"client_credentials\",\r\n      client_id: \"f4ac093f-f62c-49c6-ad79-b84ac4fe79c1\",\r\n      client_secret: \"5RzN~P7dF.irA5b8~dw3XUA.nLheXSb-Jg\",\r\n      scope: \"128721d7-3cc6-44b0-97a2-b709323602af/.default\",\r\n\r\n      // The server to help with OAuth\r\n      oAuthBaseUrl: \"http://localhost\",\r\n      oAuthPort: 5001,\r\n      redirect: \"/redirect\",\r\n\r\n      // The tableau server\r\n      tableauBaseUrl: \"http://localhost\",\r\n      tableauPort: 8888\r\n  };\r\n}\r\n\r\nasync function printPeople(people) { \r\n  for (var i = 0; i < people.length; i++) {\r\n    var person = { \r\n      name: people[i].PersonNameText,\r\n      emailAddress: people[i].BestEmailAddrText,\r\n      companyName: people[i].BestJobMatchedCompanyName,\r\n      jobTitle: people[i].BestJobTitleText,\r\n      bestIntroducer: people[i].BestKnowerNameText,\r\n      phoneNumber: people[i].BestPhoneText,\r\n      relationshipScore: people[i].WeKnowPersonScore\r\n    };\r\n\r\n    dotAlignUtils.logObject(person);\r\n  }\r\n}\r\n\r\nasync function printTeamMembers(members) {\r\n  for (var i = 0; i < members.length; i++) {\r\n    var member = { \r\n      name: members[i].name,\r\n      emailAddress: members[i].email,\r\n      teamName: members[i].teamName,\r\n      teamNumber: members[i].teamNumber\r\n    };\r\n\r\n    dotAlignUtils.logObject(member);\r\n  }\r\n}\r\n\r\nmodule.exports = { getEnvironmentParams, printPeople, printTeamMembers };\n\n//# sourceURL=webpack://DotAlignCloudConnectorForTableau/./src/helpers.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
(() => {
/*!****************************************!*\
  !*** ./src/client_credentials_flow.js ***!
  \****************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: __webpack_require__ */
eval("var dotAlignCloud = __webpack_require__(/*! ./dotAlignCloud */ \"./src/dotAlignCloud.js\");\r\nvar dotAlignUrls = __webpack_require__(/*! ./dotAlignUrls */ \"./src/dotAlignUrls.js\");\r\nvar helpers = __webpack_require__(/*! ./helpers */ \"./src/helpers.js\");\r\nvar utils = __webpack_require__(/*! ./dotAlignUtils */ \"./src/dotAlignUtils.js\");\r\n\r\n(function() {\r\n    // Create the connector object\r\n    var myConnector = tableau.makeConnector();\r\n\r\n    // Define the schema\r\n    myConnector.getSchema = function(schemaCallback) {\r\n        var cols = [{\r\n            id: \"first_name\",\r\n            dataType: tableau.dataTypeEnum.string\r\n        }, {\r\n            id: \"last_name\",\r\n            alias: \"last_name\",\r\n            dataType: tableau.dataTypeEnum.float\r\n        }, {\r\n            id: \"job_title\",\r\n            alias: \"job_title\",\r\n            dataType: tableau.dataTypeEnum.string\r\n        }, {\r\n            id: \"company_name\",\r\n            dataType: tableau.dataTypeEnum.geometry\r\n        }, {\r\n          id: \"relationship_score\",\r\n          dataType: tableau.dataTypeEnum.int\r\n      }];\r\n\r\n        var tableSchema = {\r\n            id: \"People\",\r\n            alias: \"People in the network\",\r\n            columns: cols\r\n        };\r\n\r\n        schemaCallback([tableSchema]);\r\n    };\r\n\r\n    myConnector.getData = function(table, doneCallback) {\r\n        var environment = helpers.getEnvironmentParams();\r\n        \r\n        console.log(\"Environment: \");\r\n        utils.logObject(environment);\r\n\r\n        var rows = [];\r\n        \r\n        var result = getDataFromDotAlign(\r\n          environment,\r\n          1,\r\n          5,\r\n          100,\r\n          100)\r\n          .then(r => { \r\n            return r;\r\n          });\r\n\r\n        table.appendRows(rows);\r\n        doneCallback();\r\n    };\r\n\r\n    tableau.registerConnector(myConnector);\r\n\r\n    $(document).ready(function() {\r\n        $(\"#submitButton\").click(function() {\r\n            tableau.connectionName = \"DotAlign Cloud API\"; \r\n            tableau.submit(); \r\n        });\r\n    });\r\n})();\r\n\r\nasync function getDataFromDotAlign(\r\n  environment,\r\n  teamNumber, \r\n  numberOfContributors,\r\n  peopleFetchCount,\r\n  companiesFetchCount) {\r\n    var teamMembersParams = {\r\n      teamNumber: teamNumber,\r\n      skip: 0,\r\n      take: 100,\r\n      includeHealthStats: false,\r\n      totalFetchCount: numberOfContributors\r\n    };\r\n\r\n    var members = await dotAlignCloud.fetchDC(\r\n        environment, \r\n        teamMembersParams, \r\n        dotAlignUrls.teamMemberFetchUrlCreator);\r\n    \r\n    var result = [];\r\n\r\n    for (var i = 0; i < members.data.length; i++) { \r\n        var member = members.data[i];\r\n      \r\n        var params = { \r\n          teamNumber: teamNumber,\r\n          skip: 0,\r\n          take: 200,\r\n          detailLevel: \"IncludeDependentDetailsAndInteractionStats\",\r\n          totalFetchCount: peopleFetchCount,\r\n          contributorKey: member.userKey\r\n        };\r\n        \r\n        console.log(`\\n\\nFetching people for ${member.userKey}`);\r\n        console.log(`-------`);\r\n        \r\n        var people = await dotAlignCloud.fetchDC(\r\n          environment, \r\n          params, \r\n          dotAlignUrls.contributorPeopleFetchUrlCreator);\r\n        \r\n        console.log(`\\nFetching companies for ${member.userKey}`);\r\n        console.log(`-------`);\r\n\r\n        var companies = await dotAlignCloud.fetchDC(\r\n          environment, \r\n          params, \r\n          dotAlignUrls.contributorCompaniesFetchUrlCreator);\r\n\r\n        var userKey = member.userKey;\r\n\r\n        result.push({ \r\n          contributor: member,\r\n          people: people,\r\n          companies: companies\r\n        });\r\n      }\r\n\r\n      return result;\r\n}\n\n//# sourceURL=webpack://DotAlignCloudConnectorForTableau/./src/client_credentials_flow.js?");
})();

/******/ })()
;