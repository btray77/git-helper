const { execSync } = require('child_process');
const { autoCommit, manualCommit, rollback } = require('../lib/git-helper');

jest.mock('child_process', () => ({
  execSync: jest.fn()
}));

describe('git-helper functions', () => {
  beforeEach(() => {
    execSync.mockClear();
  });

  test('autoCommit should add and commit changes with AUTO prefix', () => {
    execSync.mockReturnValueOnce('file1.js\nfile2.js');  // Mock changed files

    autoCommit();

    expect(execSync).toHaveBeenCalledWith('git add .', expect.any(Object));
    expect(execSync).toHaveBeenCalledWith(expect.stringMatching(/git commit -m "AUTO/), expect.any(Object));
  });

  test('manualCommit should squash AUTO commits into a single commit', () => {
    execSync.mockReturnValueOnce('abcd1234');  // Mock last manual commit hash

    manualCommit();

    expect(execSync).toHaveBeenCalledWith('git reset --soft abcd1234', expect.any(Object));
    expect(execSync).toHaveBeenCalledWith('git add .', expect.any(Object));
    expect(execSync).toHaveBeenCalledWith(expect.stringMatching(/git commit -m "Manual Commit/), expect.any(Object));
  });

  test('rollback should perform a soft reset to the last manual commit', () => {
    execSync.mockReturnValueOnce('abcd1234');  // Mock last manual commit hash

    rollback();

    expect(execSync).toHaveBeenCalledWith('git reset --soft abcd1234', expect.any(Object));
  });

  test('rollback should show an error if no manual commit exists', () => {
    execSync.mockReturnValueOnce('');  // No manual commit found

    console.log = jest.fn();  // Mock console.log
    rollback();

    expect(console.log).toHaveBeenCalledWith('No manual commit found to rollback.');
  });
});
