const core = require('@actions/core');
const github = require('@actions/github');

try {
    const octokit = new Octokit({
        baseUrl: core.getInput('githubApi'),
        auth: core.getInput('token')
      });
    const response = await octokit.request('GET /repositories/{repository_id}/environments/{environment_name}/secrets/public-key', {
        repository_id: core.getInput('repositoryId'),
        environment_name: core.getInput('environmentName'),
        headers: {
          'X-GitHub-Api-Version': '2022-11-28'
        }
      });
    core.setOutput("key", response.key);
    core.setOutput("keyId", response.key_id);
} catch (error) {
    core.setFailed(error.message);
}
