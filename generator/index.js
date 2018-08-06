// eslint-disable-next-line no-unused-vars
module.exports = (api, options, rootOptions) => {
  // TODO: Typescript support
  // TODO: Lint after generation

  api.extendPackage({
    scripts: {
      'serve:storybook': 'vue-cli-service serve:storybook -p 6006 -c config/storybook',
      'build:storybook': 'vue-cli-service build:storybook -c config/storybook',
    },
    devDependencies: {
      '@storybook/addon-actions': '^4.0.0-alpha.16',
      '@storybook/addon-links': '^4.0.0-alpha.16',
    },
  });

  api.render('./template');
};
