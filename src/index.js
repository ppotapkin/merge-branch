const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
    try {

        const token = core.getInput('token', { required: true });
        const octokit = github.getOctokit(token);
        const repo = github.context.payload.repository;
        const owner = github.context.payload.owner;
        const fromBranch = core.getInput('from_branch', { required: true });
        const toBranch = core.getInput('target_branch', { required: true });

        core.info('repo: /repos/{${repo}/merges');

        await octokit.request(`POST /repos/{${repo}/merges`, {
            owner: owner,
            repo: repo,
            base: fromBranch,
            head: toBranch,
            commit_message: `Merge ${fromBranch}!`
        });

    } catch (error) {
        core.setFailed(error.message);
    }
}

run();
