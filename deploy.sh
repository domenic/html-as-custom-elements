#!/bin/bash
set -e

# Run the demo-bundler in all cases, since if someone breaks that (e.g. invalid syntax causing a browserify error)
# we'll want to know on CI, even if we can't deploy.
npm run demo

if [ "$GH_TOKEN" == "" ]; then
    echo "No deploy credentials present; skipping deploy"
    exit 0
fi

if [ "$TRAVIS_BRANCH" != "master" ]; then
  echo "Not on master branch; skipping deploy"
  exit 0
fi

cd demo
git init
git config user.name "Travis-CI"
git config user.email "d@domenic.me"
git add .
git commit -m "Deployed to Github Pages"
git push --force --quiet "https://${GH_TOKEN}@${GH_REF}" master:gh-pages > /dev/null 2>&1
