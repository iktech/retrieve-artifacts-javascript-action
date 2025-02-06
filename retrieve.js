const axios = require('axios');
const core = require('@actions/core');

async function retrieve(serviceUrl, apiToken, stage, artifactsString) {
    console.log(`Retrieving artifact details from the stage '${stage}'`);

    if (!apiToken) {
        throw Error('API token is required');
    }

    if (!stage) {
        throw Error('Stage is required');
    }

    if (!artifactsString) {
        throw Error('Artifacts names are required');
    }

    let params;
    try {
        const artifacts = JSON.parse(artifactsString);
        params = artifacts.map(n => `artifact=${n}`).join('&');
    } catch (e) {
        params = `artifact=${artifactsString}`;
    }


    try {
        const response = await axios.get(`${serviceUrl}/stages/${stage}/list?${params}`, {
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'Retrieve Artifacts Github Action v1.1.0',
                'Authorization': `Bearer ${apiToken}`,
            }
        });
        if (response.status !== 200) {
            throw new Error(`Cannot retrieve artifacts: ${response.data.message}`)
        } else {
            console.log(`Successfully retrieved artifacts from the server`);
            let data = {}
            if (response.data.artifacts == null) {
                throw new Error(`Could not find request artifacts in the '${stage}' stage`);
            }

            response.data.artifacts.forEach((item) => {
                data[item.artifact_name] = item.version
            });
            return data;
        }
    } catch (e) {
        throw e;
    }
}

module.exports = retrieve;
