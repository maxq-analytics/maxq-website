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
// Base Cube API Setup
var CubeLoadApiUrl = 'https://bottom-echidna.gcp-us-central1.cubecloudapp.dev/cubejs-api/v1/load';
var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MzQ3ODA1MDZ9.EZw13FmA6ZXWBM_KaJoLXbanamhoTX8ZSiC1GRjuR2c';
// Function to Create Cube Query with User Input
function createCubeQuery(dateRange, granularity, categoryName, itemDescription, brandName, vendorName, storeName) {
    var timeDimension;
    timeDimension = {
        "dateRange": dateRange,
        "dimension": "ext_invoices.date_day",
        "granularity": undefined
    };
    if (granularity) {
        timeDimension.granularity = granularity;
    }
    var filters = [];
    var dimensions = []; // Dimensions to include in the response
    if (categoryName) {
        filters.push({
            dimension: "ext_invoices.category_name",
            operator: "contains",
            values: [categoryName]
        });
        dimensions.push("ext_invoices.category_name"); // Add to dimensions
    }
    if (itemDescription) {
        filters.push({
            dimension: "ext_invoices.item_description",
            operator: "contains",
            values: [itemDescription]
        });
        dimensions.push("ext_invoices.item_description"); // Add to dimensions
    }
    if (brandName) {
        filters.push({
            dimension: "ext_invoices.brand_name",
            operator: "contains",
            values: [brandName]
        });
        dimensions.push("ext_invoices.brand_name"); // Add to dimensions
    }
    if (vendorName) {
        filters.push({
            dimension: "ext_invoices.vendor_name",
            operator: "contains",
            values: [vendorName]
        });
        dimensions.push("ext_invoices.vendor_name"); // Add to dimensions
    }
    if (storeName) {
        filters.push({
            dimension: "ext_invoices.store_name",
            operator: "contains",
            values: [storeName]
        });
        dimensions.push("ext_invoices.store_name"); // Add to dimensions
    }
    return {
        timezone: "UTC",
        measures: [
            "ext_invoices.volume_sold_liters",
            "ext_invoices.bottles_sold",
            "ext_invoices.invoice_count",
            "ext_invoices.average_sale_dollars_per_invoice",
            "ext_invoices.average_sale_dollars_per_bottle",
            "ext_invoices.average_retail_value_per_liter",
            "ext_invoices.average_liter_per_bottle",
            "ext_invoices.average_bottles_sold_per_invoice"
        ],
        dimensions: dimensions, // Include dimensions in the query
        timeDimensions: [timeDimension],
        filters: filters
    };
}
// Function to Fetch Data from API
function getJSONFromAPI(url) {
    return __awaiter(this, void 0, void 0, function () {
        var response, error_1;
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
                    error_1 = _a.sent();
                    console.error('Error:', error_1);
                    throw error_1;
                case 4: return [2 /*return*/];
            }
        });
    });
}
// Function to Trigger Query
function triggerQuery() {
    var dateRangeInput = document.getElementById('dateRange').value;
    var granularityInput = document.getElementById('granularity').value;
    var categoryNameInput = document.getElementById('categoryName').value;
    var itemDescriptionInput = document.getElementById('itemDescription').value;
    var brandNameInput = document.getElementById('brandName').value;
    var vendorNameInput = document.getElementById('vendorName').value;
    var storeNameInput = document.getElementById('storeName').value;
    var dateRange = dateRangeInput || "last 6 months"; // Default to "last 6 months" if input is empty
    var granularity = granularityInput || ""; // Empty string means no granularity
    var categoryName = categoryNameInput || ""; // Empty string means no filter
    var itemDescription = itemDescriptionInput || ""; // Empty string means no filter
    var brandName = brandNameInput || ""; // Empty string means no filter
    var vendorName = vendorNameInput || ""; // Empty string means no filter
    var storeName = storeNameInput || ""; // Empty string means no filter
    var cubeQuery = createCubeQuery(dateRange, granularity, categoryName, itemDescription, brandName, vendorName, storeName);
    // Generate Query URL
    var cubeQueryString = "query=".concat(encodeURIComponent(JSON.stringify(cubeQuery)));
    var CubeLoadApiUrlParametered = "".concat(CubeLoadApiUrl, "?").concat(cubeQueryString);
    console.log('Query URL:', CubeLoadApiUrlParametered);
    // Fetch and Display Data
    var outputDiv = document.getElementById('output');
    outputDiv.textContent = 'Fetching data...';
    getJSONFromAPI(CubeLoadApiUrlParametered)
        .then(function (jsonData) {
        var responseText = jsonData.data;
        console.log('GET response:', responseText);
        if (responseText) {
            outputDiv.textContent = JSON.stringify(responseText, null, 2);
        }
        else {
            outputDiv.textContent = 'No data available for the provided filters.';
        }
    })
        .catch(function (error) {
        outputDiv.textContent = "Error fetching data: ".concat(error);
    });
}
// Event Listener for Button Click
document.getElementById('fetchDataButton').addEventListener('click', triggerQuery);
// Event Listener for Enter Key
document.getElementById('filterForm').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent the form from submitting
        triggerQuery(); // Trigger the query
    }
});
