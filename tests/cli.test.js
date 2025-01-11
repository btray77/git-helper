const { execSync } = require('child_process');
const { autoCommit, manualCommit, rollback } = require('../lib/git-helper');

jest.mock('../lib/git-helper', () => ({
  autoCommit: jest.fn(),
  manualCommit: jest.fn(),
  rollback: jest.fn()
}));

const { spawnSync } = require('child_process');

describe('CLI commands', () => {
  test('CLI runs autoCommit when passed "start"', () => {
    spawnSync('node', ['./bin/cli.js', 'start']);
    expect(autoCommit).toHaveBeenCalled();
  });

  test('CLI runs manualCommit when passed "manual"', () => {
    spawnSync('node', ['./bin/cli.js', 'manual']);
    expect(manualCommit).toHaveBeenCalled();
  });

  test('CLI runs rollback when passed "rollback"', () => {
    spawnSync('node', ['./bin/cli.js', 'rollback']);
    expect(rollback).toHaveBeenCalled();
  });

  test('CLI prints usage when passed an invalid command', () => {
    console.log = jest.fn();

    spawnSync('node', ['./bin/cli.js', 'invalid']);
    expect(console.log).toHaveBeenCalledWith('Usage: git-helper [start|manual|rollback]');
  });
});
