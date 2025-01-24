#!/bin/bash

# Exit on error
set -e

# Get current branch name for returning later
ORIGINAL_BRANCH=$(git rev-parse --abbrev-ref HEAD)

# Create release branch if it doesn't exist
if ! git show-ref --verify --quiet refs/heads/release; then
    git checkout -b release
else
    git checkout release
    # Merge current branch changes but prefer our changes in conflicts
    git merge -X ours $ORIGINAL_BRANCH
fi

# Temporarily remove lib from .gitignore if it exists
if grep -q "^lib/$" .gitignore; then
    sed -i.bak '/^lib\/$/d' .gitignore
    MODIFIED_GITIGNORE=true
fi

# Clean any previous builds
rm -rf lib/

# Run the bob build
yarn bob build

# Remove example directory from release branch
rm -rf example

# Stage all changes including lib
git add -f lib/
git add .

# Commit changes with timestamp
git commit -m "chore: update release build $(date '+%Y-%m-%d %H:%M:%S')" --allow-empty

# Restore .gitignore if we modified it
if [ "$MODIFIED_GITIGNORE" = true ]; then
    mv .gitignore.bak .gitignore
fi

# Return to original branch
git checkout $ORIGINAL_BRANCH

echo "Release branch has been updated. You can now use:"
echo "git+https://github.com/<repo_owner>/react-native-cache-video.git#release"