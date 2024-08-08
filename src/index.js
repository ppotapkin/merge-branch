const core = require('@actions/core');
const github = require('@actions/github');
const httpClient = require('@actions/http-client');

try {

    const fromBranch = core.getInput('from_branch');
    const toBranch = core.getInput('to_branch');
    const headToMerge = core.getInput('head_to_merge');

    core.info(fromBranch);
    core.info(toBranch);
    core.info(headToMerge);

} catch (error) {
    core.setFailed(error.message);
}