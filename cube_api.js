// Base Cube API Setup
const CubeLoadApiUrl = 'https://bottom-echidna.gcp-us-central1.cubecloudapp.dev/cubejs-api/v1/load';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MzQ3ODA1MDZ9.EZw13FmA6ZXWBM_KaJoLXbanamhoTX8ZSiC1GRjuR2c';

// Function to Create Cube Query with User Input
function createCubeQuery(dateRange, granularity, categoryName, itemDescription, brandName, vendorName, storeName) {
    const timeDimension = {
        "dimension": "ext_invoices.date_day",
        "dateRange": dateRange
    };

    if (granularity) {
        timeDimension.granularity = granularity;
    }

    const filters = [];
    const dimensions = []; // Dimensions to include in the response

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
async function getJSONFromAPI(url) {
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

// Function to Trigger Query
function triggerQuery() {
    const dateRangeInput = document.getElementById('dateRange').value;
    const granularityInput = document.getElementById('granularity').value;
    const categoryNameInput = document.getElementById('categoryName').value;
    const itemDescriptionInput = document.getElementById('itemDescription').value;
    const brandNameInput = document.getElementById('brandName').value;
    const vendorNameInput = document.getElementById('vendorName').value;
    const storeNameInput = document.getElementById('storeName').value;

    const dateRange = dateRangeInput || "last 6 months"; // Default to "last 6 months" if input is empty
    const granularity = granularityInput || ""; // Empty string means no granularity
    const categoryName = categoryNameInput || ""; // Empty string means no filter
    const itemDescription = itemDescriptionInput || ""; // Empty string means no filter
    const brandName = brandNameInput || ""; // Empty string means no filter
    const vendorName = vendorNameInput || ""; // Empty string means no filter
    const storeName = storeNameInput || ""; // Empty string means no filter

    const cubeQuery = createCubeQuery(dateRange, granularity, categoryName, itemDescription, brandName, vendorName, storeName);

    // Generate Query URL
    const cubeQueryString = `query=${encodeURIComponent(JSON.stringify(cubeQuery))}`;
    const CubeLoadApiUrlParametered = `${CubeLoadApiUrl}?${cubeQueryString}`;
    console.log('Query URL:', CubeLoadApiUrlParametered);

    // Fetch and Display Data
    const outputDiv = document.getElementById('output');
    outputDiv.textContent = 'Fetching data...';

    getJSONFromAPI(CubeLoadApiUrlParametered)
        .then(jsonData => {
            const responseText = jsonData.data;
            console.log('GET response:', responseText);

            if (responseText) {
                outputDiv.textContent = JSON.stringify(responseText, null, 2);
            } else {
                outputDiv.textContent = 'No data available for the provided filters.';
            }
        })
        .catch(error => {
            outputDiv.textContent = `Error fetching data: ${error}`;
        });
}

// Event Listener for Button Click
document.getElementById('fetchDataButton').addEventListener('click', triggerQuery);

// Event Listener for Enter Key
document.getElementById('filterForm').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent the form from submitting
        triggerQuery(); // Trigger the query
    }
});
