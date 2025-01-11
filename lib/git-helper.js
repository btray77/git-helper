const { execSync } = require('child_process');

// Run shell commands and handle errors
const runCommand = (command) => {
  try {
    return execSync(command, { encoding: 'utf8' }).trim();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return null;
  }
};

// Check if the current directory is a Git repository
const isGitRepo = () => {
  try {
    execSync('git rev-parse --is-inside-work-tree', { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
};

// Initialize a Git repository if it doesn't exist
const ensureGitRepo = () => {
  if (!isGitRepo()) {
    console.log('No Git repository detected. Initializing a new Git repository...');
    runCommand('git init');
    console.log('Git repository initialized.');
  }
};

// Auto-commit function
function autoCommit() {
  ensureGitRepo();  // Ensure Git is initialized

  const changedFiles = runCommand('git diff --name-only');  // Get list of changed files
  if (!changedFiles) {
    console.log('No changes detected for auto-commit.');
    return;
  }

  const timestamp = new Date().toISOString();  // Add a timestamp to the commit
  const commitMessage = `AUTO (${timestamp}): ${changedFiles.split('\n').join(', ')}`;

  runCommand('git add .');  // Stage all changes
  runCommand(`git commit -m "${commitMessage}"`);  // Create a commit with the formatted message
  console.log(`Auto commit created: "${commitMessage}"`);
}

// Get the last manual commit hash
function getLastManualCommit() {
  return runCommand(`git log --grep="Manual Commit:" --pretty=format:"%H" -n 1`);
}

// Manual commit (squash auto commits)
function manualCommit() {
  ensureGitRepo();  // Ensure Git is initialized

  const lastManualCommit = getLastManualCommit();
  if (!lastManualCommit) {
    console.log('No previous manual commit found. Aborting.');
    return;
  }

  console.log(`Last manual commit found: ${lastManualCommit}`);
  runCommand(`git reset --soft ${lastManualCommit}`);  // Reset to the last manual commit, keeping changes
  runCommand('git add .');  // Stage all changes

  const defaultMessage = "Manual Commit: Bulk update from last AUTO commits";
  runCommand(`git commit -m "${defaultMessage}"`);  // Commit all changes as a single manual commit
  console.log(`Manual commit created: "${defaultMessage}"`);
}

// Rollback to the last manual commit
function rollback() {
  ensureGitRepo();  // Ensure Git is initialized

  const lastManualCommit = getLastManualCommit();
  if (!lastManualCommit) {
    console.log('No manual commit found to rollback.');
    return;
  }

  runCommand(`git reset --soft ${lastManualCommit}`);  // Soft reset to the last manual commit
  console.log(`Rollback completed with a soft reset.`);
}

module.exports = { autoCommit, manualCommit, rollback };
