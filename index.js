const core = require('@actions/core');
const retrieve = require('./retrieve');

try {
    const serviceUrl = core.getInput('serviceUrl');
    const apiToken = core.getInput('apiToken');
    const stage = core.getInput('stage');
    const artifactsString = core.getInput('artifacts');

    const response = await retrieve(serviceUrl, apiToken, stage, artifactsString);
    core.setOutput('artifacts', response);
} catch (error) {
    core.setFailed(error.message);
}
