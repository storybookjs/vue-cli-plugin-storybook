#!/#!/usr/bin/env bash

rm -rf tmp
npm pack .
npx vue create --preset test/preset.json tmp
cd tmp
npm i ../*.tgz
npx vue invoke storybook --type init
npm run build:storybook
