#!/bin/bash
npm run demo
cd demo
git init
git config user.name "Travis-CI"
git config user.email "d@domenic.me"
git add .
git commit -m "Deployed to Github Pages"
git push --force --quiet "https://${GH_TOKEN}@${GH_REF}" master:gh-pages > /dev/null 2>&1
