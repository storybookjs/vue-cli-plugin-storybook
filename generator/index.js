// eslint-disable-next-line no-unused-vars
module.exports = (api, options, rootOptions) => {
  // TODO: Typescript support
  // TODO: Lint after generation

  api.extendPackage({
    scripts: {
      storybook: 'vue-cli-service storybook -p 6006 -c config/storybook',
      'build:storybook': 'vue-cli-service build:storybook -c config/storybook',
    },
    devDependencies: {
      '@storybook/addon-actions': '^4.0.0-alpha.14',
      '@storybook/addon-links': '^4.0.0-alpha.14',
    },
  });

  api.render('./template');
};
