#!/bin/bash
set -e

npm run demo

if [ "$TRAVIS_BRANCH" != "master" ]; then
  exit 0
fi

cd demo
git init
git config user.name "Travis-CI"
git config user.email "d@domenic.me"
git add .
git commit -m "Deployed to Github Pages"
git push --force --quiet "https://${GH_TOKEN}@${GH_REF}" master:gh-pages > /dev/null 2>&1
