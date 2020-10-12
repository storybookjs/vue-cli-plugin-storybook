#!/usr/bin/env bash

# TODO the tests should verify how the webpack configs are merged

rm -rf tmp
npm pack .
npx vue create --preset test/preset.json tmp
cd tmp
npm i ../*.tgz
npx vue invoke storybook --type init --semver '^6.0.0' --csf --docs
npm i
npx chromatic test --build-script-name='storybook:build' --exit-zero-on-changes --no-interactive --debug
