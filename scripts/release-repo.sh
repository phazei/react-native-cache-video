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
    git merge -X ours $ORIGINAL_BRANCH -m "chore: merge $ORIGINAL_BRANCH changes into release"
fi

# Ensure package.json always comes from the source branch
# (-X ours keeps release's version in conflicts, which is wrong for version bumps)
git checkout $ORIGINAL_BRANCH -- package.json

# Temporarily remove lib from .gitignore if it exists
if grep -q "^lib/$" .gitignore; then
    sed -i '' '/^lib\/$/d' .gitignore
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

# Return to original branch
git checkout $ORIGINAL_BRANCH

echo "Release branch has been updated. You can now use:"
echo "git+https://github.com/your-username/react-native-cache-video.git#release"