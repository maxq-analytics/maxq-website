// Created by Philip Boontje (MAXQ Analytics) on 23 January 2025
// JavaScript that demonstrates the API interactions required for an Analytics Agent
// Using two of Cube's API's 
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// Input values AI API:
var cubeAiApiUrl = 'https://bottom-echidna.gcp-us-central1.cubecloudapp.dev/cubejs-api/v1/ai/query/completions';
var CubeAIapiToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MzcxOTU2NDR9.yNCRU_vrD7FB71ziAKLbDxsubqDd66_6tdHvGz2SwvE';
// Input REST API:
var CubeLoadApiUrl = 'https://bottom-echidna.gcp-us-central1.cubecloudapp.dev/cubejs-api/v1/load';
var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3Mzc1NTQ4NjF9.qTxhDtkR5dzdp4FWijlPrSkxhn-TfS7Q_oVLho2Put8';
// AI API function -----------------------------
function fetchCubeAIRequest() {
    return __awaiter(this, void 0, void 0, function () {
        var AnalyticsAgentQuestion, cubeViewModel, payload, response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    AnalyticsAgentQuestion = document.getElementById('question').value;
                    cubeViewModel = 'abd_analytics';
                    payload = {
                        messages: [
                            {
                                role: 'user',
                                content: AnalyticsAgentQuestion,
                                views: cubeViewModel,
                                runQuery: true
                            },
                        ],
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch(cubeAiApiUrl, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: CubeAIapiToken,
                            },
                            body: JSON.stringify(payload),
                        })];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 3: return [2 /*return*/, _a.sent()];
                case 4:
                    error_1 = _a.sent();
                    console.error('Error:', error_1);
                    throw error_1;
                case 5: return [2 /*return*/];
            }
        });
    });
}
// REST API function -----------------------------
function getJSONFromAPI(url) {
    return __awaiter(this, void 0, void 0, function () {
        var response, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch(url, {
                            method: 'GET',
                            headers: {
                                'Authorization': "Bearer ".concat(token),
                                'Content-Type': 'application/json'
                            }
                        })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2: return [2 /*return*/, _a.sent()];
                case 3:
                    error_2 = _a.sent();
                    console.error('Error:', error_2);
                    throw error_2;
                case 4: return [2 /*return*/];
            }
        });
    });
}
// Main function -----------------------------
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var data, cubeQuery, cubeQueryString, CubeLoadApiUrlParametered, outputDiv, outputJSONDiv, jsonData, responseText, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetchCubeAIRequest()];
                case 1:
                    data = _a.sent();
                    console.log('Cube Query AI Generated:', data.cube_query);
                    cubeQuery = data.cube_query;
                    cubeQueryString = JSON.stringify(cubeQuery);
                    CubeLoadApiUrlParametered = "".concat(CubeLoadApiUrl, "?query=").concat(encodeURIComponent(cubeQueryString));
                    outputDiv = document.getElementById('output');
                    outputJSONDiv = document.getElementById('output_json');
                    return [4 /*yield*/, getJSONFromAPI(CubeLoadApiUrlParametered)];
                case 2:
                    jsonData = _a.sent();
                    console.log('Cube Data Model response:', jsonData.data);
                    if (outputDiv) {
                        responseText = jsonData.data;
                        if (responseText) {
                            outputDiv.textContent = JSON.stringify(responseText, null, 2);
                            outputJSONDiv.textContent = JSON.stringify(responseText, null, 2);
                        }
                        else {
                            outputDiv.textContent = 'No data available for the provided filters.';
                        }
                    }
                    else {
                        console.error('Output div not found in the document.');
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _a.sent();
                    console.error('Error in main function:', error_3);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
// Requesting the Cube.dev data model  
// Event Listener for Button Click
document.getElementById('send_question').addEventListener('click', main);
