#!/#!/usr/bin/env bash

rm -rf tmp
npm pack .
npx vue create --preset test/preset.json tmp
cd tmp
npm i ../*.tgz
npx vue invoke storybook --type init
npm i
npm i --save-dev storybook-chromatic
echo "import 'storybook-chromatic'" > config/storybook/chromatic.js
cat config/storybook/chromatic.js config/storybook/config.js > config.js
mv config.js config/storybook/config.js
npx chromatic test --script-name='storybook:serve' --exit-zero-on-changes --no-interactive --debug
