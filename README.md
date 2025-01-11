# **Detailed `README.md`:**
# Git Helper
Git Helper is a CLI tool that helps you automate git commits during development. It provides commands for automatic commits, squashing changes, and rolling back to the last working commit—perfect for quick iteration and avoiding bad commits during development.
## **Features**
- **Auto-commit (`start`)**: Automatically commits changes with a file list in the commit message.
- **Manual commit (`manual`)**: Squashes all `AUTO:` commits into a single manual commit with a meaningful custom message.
- **Rollback (`rollback`)**: Rolls back to the last manual commit while preserving changes.
## **Installation**
To install globally:
```bash
npm install -g git-helper
```
Or locally to a project:
```bash
npm install git-helper --save-dev
```
The package automatically adds the following scripts to `package.json`:
```json
{
  "scripts": {
    "starter": "git-helper start",
    "manual": "git-helper manual",
    "rollback": "git-helper rollback"
  }
}
```

---

## **Usage**

Run commands from your terminal:

### Auto-commit changes:
```bash
npm run starter
```
This automatically stages and commits changes with a message starting with `AUTO:`.

### Manual commit (squash auto commits):
```bash
npm run manual
```
This squashes all `AUTO:` commits into a single manual commit.

### Rollback to the last manual commit:
```bash
npm run rollback
```
This command rolls back to the last manual commit. The rollback keeps changes (soft reset).

---

## **Development and Contributions**

To contribute:
1. Fork the repository.
2. Create a feature branch: `git checkout -b my-feature`.
3. Commit your changes: `git commit -m "Add my new feature"`.
4. Push the branch: `git push origin my-feature`.
5. Create a pull request.

---
# **Publish Steps for GitHub and NPM:**

### 1. **Create a GitHub Repository**
- Go to GitHub and create a new repository (`git-helper`).
- Push your project:
  ```bash
  git init
  git remote add origin <github-repo-url>
  git add .
  git commit -m "Initial commit"
  git push -u origin main
  ```

### 2. **Publish to NPM**
- Log in to NPM:
  ```bash
  npm login
  ```
- Publish the package:
  ```bash
  npm publish
  ```

---

# **Post-Publish Usage**

Once published, users can install your tool:
```bash
npm install -g git-helper
```
And use it with:
```bash
git-helper start
git-helper manual
git-helper rollback
```
---
This structure sets up a fully documented GitHub project and makes your NPM package ready for distribution! Let me know if you’d like any more additions or refinements!

---
# **Current Folder Structure:**
```
git-helper/
├── bin/
│   └── cli.js          # Entry point for the CLI command
├── lib/
│   ├── git-helper.js   # Core logic for the git-helper functions
│   └── setup.js        # Helper script to auto-update package.json with npm scripts
├── package.json        # NPM configuration
├── README.md           # Documentation for the tool
├── LICENSE             # License file for open-source distribution
└── .gitignore          # Files and folders to ignore in version control
```
---

### **Tests:**

- Tests ensure the CLI correctly calls the appropriate function (`autoCommit`, `manualCommit`, or `rollback`).
- Verifies that invalid commands print usage instructions.

---

# **Running the Tests:**

### Run all tests:
```bash
npm test
```

### Run tests in watch mode:
```bash
npm run test:watch
```

### Run tests with coverage report:
```bash
npm run test:coverage
```

---

# **Test Output Example:**

```bash
PASS tests/git-helper.test.js
✓ autoCommit should add and commit changes with AUTO prefix
✓ manualCommit should squash AUTO commits into a single commit
✓ rollback should perform a soft reset to the last manual commit

PASS tests/cli.test.js
✓ CLI runs autoCommit when passed "start"
✓ CLI runs manualCommit when passed "manual"
✓ CLI runs rollback when passed "rollback"
✓ CLI prints usage when passed an invalid command
```

---

This setup ensures your `git-helper` works perfectly with robust tests for both the core functions and CLI commands. Let me know if you'd like any additional test cases!



