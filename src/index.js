const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
    try {

        const token = core.getInput('token', { required: true });
        const octokit = github.getOctokit(token);
        const repo = github.context.payload.repository;
        const fromBranch = core.getInput('from_branch', { required: true });
        const toBranch = core.getInput('target_branch', { required: true });

        core.info(`POST /repos/${repo.owner}/${repo.name}/merges`);

        await octokit.request(`POST /repos/${repo.owner}/${repo.name}/merges`, {
            owner: repo.owner,
            repo: repo.name,
            base: toBranch,
            head: fromBranch,
            commit_message: `Merge ${fromBranch}!`
        });

    } catch (error) {
        core.setFailed(error.message);
    }
}

run();
