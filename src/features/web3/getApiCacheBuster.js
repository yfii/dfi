import axios from 'axios';

// Deployed API repo
const ORGANIZATION = 'beefyfinance';
const REPO = 'beefy-api';
const BRANCH = 'prod';

// How many commits to fetch (2 would be fine, 3 allows for 2 deploys within DEPLOY_TIME_SECONDS)
const NUM_COMMITS = 3;

// Estimated time from commit to prod to API being deployed and WORKING
const DEPLOY_TIME_SECONDS = 5 * 60;

// In fallback scenario, time to limit cache bursting to
const FALLBACK_TIME_SECONDS = 60;

// Array of NUM_COMMITS commits
let latestCommits = null;
// Cache promise so request is only made once
let requestPromise = null;
// Track if request to GitHub API failed
let requestFailed = false;

// Get the latest NUM_COMMITS commits
// Returns null and sets requestFailed=true on error
const getLatestApiCommits = async () => {
  try {
    const response = await axios.get(
      `https://api.github.com/repos/${ORGANIZATION}/${REPO}/commits`,
      {
        params: {
          sha: BRANCH,
          per_page: NUM_COMMITS,
        },
      }
    );

    if (response?.data?.length) {
      return response.data;
    }
  } catch {
    // Failed, do not need to know why
  }

  requestFailed = true;
  return null;
};

// We only want to use the latest commit after DEPLOY_TIME_SECONDS has passed
// This is to ensure that incomplete data is not cached
const getDeployedCommitHash = commits => {
  const now = new Date().getTime();

  let deployed = commits.find(commit => {
    const commitTime = new Date(commit.commit.committer.date).getTime();
    const diffSeconds = (now - commitTime) / 1000;
    return diffSeconds >= DEPLOY_TIME_SECONDS;
  });

  // Use oldest commit if none meet the time threshold
  // (i.e. when more than NUM_COMMITS-1 commits within DEPLOY_TIME_SECONDS)
  if (!deployed) {
    deployed = commits[commits.length - 1];
  }

  return deployed.sha;
};

// Get the hash of the latest deployed commit
// Or a fallback cache buster if unavailable
const getDeployedApiCommitHash = async () => {
  latestCommits = await getLatestApiCommits();

  if (latestCommits && !requestFailed) {
    return getDeployedCommitHash(latestCommits);
  }

  return getFallbackCacheBuster();
};

// Generate fallback cache buster based on time
const getFallbackCacheBuster = () => {
  const now = new Date().getTime() / 1000;
  return Math.floor(now / FALLBACK_TIME_SECONDS);
};

// Returns a promise that resolves to a value to use as a Beefy API cache buster
export const getApiCacheBuster = async () => {
  if (requestFailed) {
    return getFallbackCacheBuster();
  }

  if (latestCommits) {
    return getDeployedCommitHash(latestCommits);
  }

  if (!requestPromise) {
    requestPromise = getDeployedApiCommitHash();
  }

  return requestPromise;
};
