#!/usr/bin/env bash

# TODO the tests should verify how the webpack configs are merged

rm -rf tmp
npm pack .
npx vue create --preset test/preset.json tmp
cd tmp
npm i ../*.tgz
npx vue invoke storybook --type init --semver '>=5.3.0' --csf --docs
npm i
npm i --save-dev storybook-chromatic
npx chromatic test --script-name='storybook:serve' --exit-zero-on-changes --no-interactive --debug
