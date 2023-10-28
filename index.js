const core = require('@actions/core');
const retrieve = require('./retrieve');

const serviceUrl = core.getInput('serviceUrl');
const apiToken = core.getInput('apiToken');
const stage = core.getInput('stage');
const artifactsString = core.getInput('artifacts');

retrieve(serviceUrl, apiToken, stage, artifactsString)
    .then(response => {
        core.setOutput('artifacts', response);
    })
    .catch(error => {
    core.setFailed(error.message);
    })
