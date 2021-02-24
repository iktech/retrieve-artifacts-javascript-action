const core = require('@actions/core');
const axios = require('axios');

try {
    const serviceUrl = core.getInput('serviceUrl');
    const apiToken = core.getInput('apiToken');
    const stage = core.getInput('stage');
    const artifactsString = core.getInput('artifacts');

    let artifacts = JSON.parse(artifactsString);

    if (!apiToken) {
        core.setFailed('API token is required');
    }

    if (!stage) {
        core.setFailed('Stage is required');
    }

    if (!artifacts) {
        core.setFailed('Artifacts names are required');
    }

    try {
        artifacts = JSON.parse(artifacts);
    } catch (e) {}

    console.log(`Retrieving artifact details from the stage '${stage}'`);

    let params;

    if (typeof artifacts === 'object') {
        params = artifacts.map(n => `artifact=${n}`).join('&');
    } else {
        params = `artifact=${artifacts}`;
    }

    axios.get(`${serviceUrl}/stages/${stage}/list?${params}`, {
        headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'Retrieve Artifacts Github Action v1.0.0',
            'Authorization': `Bearer ${apiToken}`,
        }
    }).then(response => {
        if (response.status !== 200) {
            core.setFailed(`Cannot retrieve artifacts: ${response.data.message}`);
        } else {
            console.log(`Successfully retrieved artifacts from the server`);
            core.setOutput('artifacts', response.data);
        }
    }).catch(error => {
        core.setFailed(error.response.data.error);
    });
} catch (error) {
    core.setFailed(error.message);
}
