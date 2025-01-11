# Git Helper

Git Helper is a CLI tool that helps you automate git commits during development. It provides commands for automatic commits, squashing changes, and rolling back to the last working commit—perfect for quick iteration and avoiding bad commits during development.

---

## **Features**

- **Auto-commit (`start`)**: Automatically commits changes with a file list in the commit message.
- **Manual commit (`manual`)**: Squashes all `AUTO:` commits into a single manual commit with a meaningful custom message.
- **Rollback (`rollback`)**: Rolls back to the last manual commit while preserving changes.

---

## **Installation**

To install globally:

```bash
npm install -g git-helper
