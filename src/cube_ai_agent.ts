// Created by Philip Boontje (MAXQ Analytics) on 23 January 2025
// JavaScript that demonstrates the API interactions required for an Analytics Agent
// Using two of Cube's API's 

// Input values AI API:
const cubeAiApiUrl = 'https://bottom-echidna.gcp-us-central1.cubecloudapp.dev/cubejs-api/v1/ai/query/completions';
const CubeAIapiToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MzcxOTU2NDR9.yNCRU_vrD7FB71ziAKLbDxsubqDd66_6tdHvGz2SwvE';

// Input REST API:
const CubeLoadApiUrl = 'https://bottom-echidna.gcp-us-central1.cubecloudapp.dev/cubejs-api/v1/load';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3Mzc1NTQ4NjF9.qTxhDtkR5dzdp4FWijlPrSkxhn-TfS7Q_oVLho2Put8';


// AI API function -----------------------------
async function fetchCubeAIRequest() {
// Input AI Query
    let AnalyticsAgentQuestion = (document.getElementById('question') as HTMLInputElement).value;
    const cubeViewModel = 'abd_analytics'
    const payload = {
        messages: [
            {
                role: 'user',
                content: AnalyticsAgentQuestion,
                views: cubeViewModel,
                runQuery: true
            },
        ],
    };
    try {
        const response = await fetch(cubeAiApiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: CubeAIapiToken,
            },
            body: JSON.stringify(payload),
        })
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }

}


// REST API function -----------------------------
async function getJSONFromAPI(url: string | URL | Request) {
    try {
        const response = await fetch(url,
            {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

// Main function -----------------------------
async function main() {
    // Interacting with AI API
    try {
        const data = await fetchCubeAIRequest();
        console.log('Cube Query AI Generated:', data.cube_query);
        const cubeQuery = data.cube_query;
        const cubeQueryString = JSON.stringify(cubeQuery);

        // Interacting with REST API
        const CubeLoadApiUrlParametered = `${CubeLoadApiUrl}?query=${encodeURIComponent(cubeQueryString)}`;
        const outputDiv = document.getElementById('output');
        const outputJSONDiv = document.getElementById('output_json');

        const jsonData = await getJSONFromAPI(CubeLoadApiUrlParametered);
        console.log('Cube Data Model response:', jsonData.data);

        if (outputDiv) {
            const responseText = jsonData.data;
            if (responseText) {
                outputDiv.textContent = JSON.stringify(responseText, null, 2)
                outputJSONDiv.textContent = JSON.stringify(responseText, null, 2)
            } else {
                outputDiv.textContent = 'No data available for the provided filters.';
            }
        } else {
            console.error('Output div not found in the document.');
        }
    } catch (error) {
        console.error('Error in main function:', error);
    }
}

// Requesting the Cube.dev data model  


// Event Listener for Button Click
document.getElementById('send_question').addEventListener('click', main);