const fs = require('fs');
const path = require('path');

// Function to update package.json
function updatePackageJson() {
  const packageJsonPath = path.join(process.cwd(), 'package.json');  // Path to package.json

  if (!fs.existsSync(packageJsonPath)) {
    console.error('Error: No package.json found in this directory.');
    return;
  }

  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

  if (!packageJson.scripts) {
    packageJson.scripts = {};
  }

  const scriptsToAdd = {
    "starter": "git-helper start",
    "manual": "git-helper manual",
    "rollback": "git-helper rollback"
  };

  let scriptsAdded = 0;

  for (const [key, value] of Object.entries(scriptsToAdd)) {
    if (!packageJson.scripts[key]) {
      packageJson.scripts[key] = value;
      scriptsAdded++;
    }
  }

  if (scriptsAdded === 0) {
    console.log('Scripts already exist in package.json. No changes made.');
    return;
  }

  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2), 'utf8');  // Write updated package.json
  console.log(`Added ${scriptsAdded} scripts to package.json`);
}

updatePackageJson();
