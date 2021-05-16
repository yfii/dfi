import axios from 'axios';

let commitHash = ""

export const getLatestApiCommitHash = async () => {
    if (!commitHash) {
        const response = await axios.get("https://api.github.com/repos/beefyfinance/beefy-api/commits/master");
        commitHash = response.data.sha;
    }

    return commitHash
}