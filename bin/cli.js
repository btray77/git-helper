#!/usr/bin/env node

// Import core git-helper functions
const { autoCommit, manualCommit, rollback } = require('../lib/git-helper');

// Retrieve the CLI argument (e.g., start, manual, rollback)
const command = process.argv[2];

switch (command) {
  case 'start':
    autoCommit();  // Run auto commit
    break;
  case 'manual':
    manualCommit();  // Run manual commit (squash auto commits)
    break;
  case 'rollback':
    rollback();  // Rollback to the last manual commit
    break;
  default:
    console.log('Usage: git-helper [start|manual|rollback]');
    process.exit(1);  // Exit with an error code if an invalid argument is provided
}

