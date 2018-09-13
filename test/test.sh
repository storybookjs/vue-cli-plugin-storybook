#!/#!/usr/bin/env bash

npm pack .
vue create --preset test/preset.json tmp
cd tmp
npm i ../*.tgz
vue invoke storybook --type init
npm run serve:storybook
