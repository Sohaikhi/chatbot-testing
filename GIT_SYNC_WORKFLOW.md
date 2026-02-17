# Git Sync Workflow - Agent to Local

Quick reference for syncing changes from GitHub Agent to your local machine.

## 🔄 Quick Sync Process

### Simple 3-Step Sync

```bash
# 1. Pull latest changes
git pull origin main

# 2. Update dependencies (if package.json changed)
npm install

# 3. Verify everything works
npm test
```

That's it! Your local copy now has all the agent's changes.

---

## 📖 Detailed Sync Scenarios

### Scenario 1: Fresh Pull (No Local Changes)

**When to use:** You haven't made any local changes and just want the latest from GitHub.

```bash
# Pull changes from main branch
git pull origin main

# Update dependencies if needed
npm install

# Run tests to verify
npm run validate
npm test
```

### Scenario 2: Pull from Agent's Feature Branch

**When to use:** Agent worked on a feature branch (like `copilot/run-playwright-framework`).

```bash
# See all available branches
git branch -r

# Pull from the agent's branch
git pull origin copilot/run-playwright-framework

# Or switch to that branch
git checkout copilot/run-playwright-framework
git pull

# Update and test
npm install
npm test
```

### Scenario 3: You Have Local Changes

**When to use:** You made changes locally and want to get agent's changes too.

```bash
# Save your changes first
git add .
git commit -m "My local changes"

# Then pull agent changes
git pull origin main

# Update dependencies
npm install

# Test everything
npm test
```

### Scenario 4: Merge Conflict Resolution

**When to use:** Both you and the agent changed the same files.

```bash
# Try to pull
git pull origin main
# Git will show conflict messages

# See which files have conflicts
git status

# Open each conflicted file
# Look for conflict markers:
# <<<<<<< HEAD
# Your changes
# =======
# Agent's changes
# >>>>>>> origin/main

# Edit the file to keep what you want
# Remove the conflict markers

# Mark as resolved
git add <conflicted-file>

# Complete the merge
git commit -m "Merged agent changes with local changes"

# Test
npm test
```

---

## 🎯 Common Git Commands

### Check Status

```bash
# See what's changed locally
git status

# See what's different from remote
git fetch origin
git status

# View commit history
git log --oneline -10
```

### View Changes Before Pulling

```bash
# Fetch without merging
git fetch origin

# See what commits are new
git log HEAD..origin/main --oneline

# See actual code changes
git diff HEAD..origin/main
```

### Undo/Reset Commands

```bash
# Discard all local changes (CAREFUL!)
git reset --hard HEAD

# Discard changes to specific file
git checkout -- filename

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1
```

### Stash Commands

```bash
# Save local changes temporarily
git stash

# View stashed changes
git stash list

# Restore stashed changes
git stash pop

# Discard stashed changes
git stash drop
```

---

## 🔍 Checking What Agent Changed

### Before Pulling

```bash
# Fetch updates
git fetch origin

# See list of changed files
git diff --name-only HEAD..origin/main

# See detailed changes
git diff HEAD..origin/main

# See commit messages
git log HEAD..origin/main --oneline
```

### After Pulling

```bash
# See what was just pulled
git log -5 --oneline

# See files changed in last commit
git show --name-only

# See detailed changes in last commit
git show
```

---

## 🚨 Emergency Procedures

### "I messed up everything, start over!"

```bash
# Save your work first (optional)
git stash

# Reset to match GitHub exactly
git fetch origin
git reset --hard origin/main

# Reinstall everything
rm -rf node_modules package-lock.json
npm install
npm run install-browsers
```

### "Agent's changes broke my tests!"

```bash
# Go back to previous working version
git log --oneline  # Find the commit hash before agent changes
git checkout <commit-hash>

# Or go back one commit
git checkout HEAD~1

# Test
npm test

# When ready to try again
git checkout main
git pull origin main
```

### "I want agent's changes but keep my files"

```bash
# Pull but don't merge yet
git fetch origin

# Merge with strategy to keep your files on conflict
git merge origin/main --strategy-option ours

# Or keep agent's files on conflict
git merge origin/main --strategy-option theirs
```

---

## 📋 Sync Checklist

Use this checklist each time you sync with agent changes:

- [ ] **Check status**: `git status` - Make sure you're on the right branch
- [ ] **Commit local work**: `git add . && git commit -m "message"` - Save your changes
- [ ] **Fetch updates**: `git fetch origin` - Download latest from GitHub
- [ ] **Review changes**: `git log HEAD..origin/main` - See what agent changed
- [ ] **Pull changes**: `git pull origin main` - Apply the changes
- [ ] **Update dependencies**: `npm install` - Update packages if needed
- [ ] **Update browsers**: `npm run install-browsers` - If new browser versions
- [ ] **Validate setup**: `npm run validate` - Check everything works
- [ ] **Run tests**: `npm test` - Verify tests pass
- [ ] **Check report**: `npm run show-report` - Review test results

---

## 🔄 Continuous Sync Workflow

### Option 1: Manual Sync (Recommended)

```bash
# Run this whenever you want to check for updates
git fetch origin && \
  git log HEAD..origin/main --oneline && \
  echo "Run 'git pull origin main' to apply these changes"
```

### Option 2: Auto-Pull Script

Create a file `sync.sh` (Mac/Linux) or `sync.bat` (Windows):

**Mac/Linux (sync.sh):**
```bash
#!/bin/bash
echo "🔄 Syncing with GitHub..."
git fetch origin
git pull origin main
npm install
echo "✅ Sync complete!"
npm run validate
```

**Windows (sync.bat):**
```batch
@echo off
echo Syncing with GitHub...
git fetch origin
git pull origin main
npm install
echo Sync complete!
npm run validate
```

Make executable and run:
```bash
# Mac/Linux
chmod +x sync.sh
./sync.sh

# Windows
sync.bat
```

---

## 💡 Pro Tips

### 1. Always Pull Before Starting Work
```bash
# Start your day with
git pull origin main
npm install
```

### 2. Use Git Aliases for Faster Commands
```bash
# Set up shortcuts
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.pl "pull origin main"

# Now you can use
git st    # instead of git status
git pl    # instead of git pull origin main
```

### 3. Keep Dependencies Updated
```bash
# After agent changes, run this to be safe
npm install && npm run install-browsers
```

### 4. Create a Sync Reminder
```bash
# Add to your shell profile (.bashrc, .zshrc, etc.)
alias sync-agent='git pull origin main && npm install && npm run validate'

# Then just run
sync-agent
```

### 5. Monitor GitHub for Changes

- Watch the repository on GitHub for notifications
- Check the repository page regularly
- Set up email notifications for commits

---

## 📊 Understanding Git Status Messages

### Common Status Messages

```bash
$ git status
```

**Output Meanings:**

- `Your branch is up to date with 'origin/main'` - You have latest changes ✅
- `Your branch is behind 'origin/main' by N commits` - Agent made changes, need to pull ⬇️
- `Your branch is ahead of 'origin/main' by N commits` - You made changes, can push ⬆️
- `Changes not staged for commit` - You modified files locally 📝
- `Untracked files` - You created new files 📄
- `Changes to be committed` - Files ready to commit ✅

---

## 🎓 Learning Git Basics

If you're new to Git, here are the essential concepts:

### Git Repository
- Your local copy of the project
- Connected to GitHub (remote repository)

### Branches
- `main` - Primary branch (production code)
- `copilot/*` - Agent's working branches
- You can create your own branches too

### Commits
- Snapshots of your code at a point in time
- Agent creates commits when making changes
- You create commits to save your work

### Pull
- Download changes from GitHub to your local machine
- Combines `fetch` (download) + `merge` (apply)

### Push
- Upload your local commits to GitHub
- Makes your changes available to others

### Merge
- Combine changes from different sources
- Happens automatically when you `pull`
- Sometimes requires manual conflict resolution

---

## 📞 Getting Help

### Resources
- **Git Basics**: https://git-scm.com/book/en/v2/Getting-Started-Git-Basics
- **GitHub Docs**: https://docs.github.com/en/get-started
- **Playwright Docs**: https://playwright.dev/docs/intro
- **Local Setup Guide**: [LOCAL_SETUP_GUIDE.md](LOCAL_SETUP_GUIDE.md)

### Quick Help Commands
```bash
# Git help
git help
git help pull
git help status

# npm help
npm help
npm help install

# Playwright help
npx playwright --help
```

---

**Remember:** When in doubt, commit your changes first, then pull! You can always go back if something goes wrong.
