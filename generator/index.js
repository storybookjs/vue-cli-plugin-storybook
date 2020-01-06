// eslint-disable-next-line no-unused-vars
module.exports = (api, options, rootOptions) => {
  api.assertCliVersion('^4');

  // TODO: Typescript support
  const hasBabel = api.hasPlugin('babel');

  api.extendPackage({
    scripts: {
      'storybook:serve': 'vue-cli-service storybook:serve -p 6006 -c config/storybook',
      'storybook:build': 'vue-cli-service storybook:build -c config/storybook',
    },
    devDependencies: {
      '@storybook/addon-actions': '^4.1.0 || ^5.0.0',
      '@storybook/addon-knobs': '^4.1.0 || ^5.0.0',
      '@storybook/addon-links': '^4.1.0 || ^5.0.0',
      '@storybook/addon-notes': '^4.1.0 || ^5.0.0',
    },
  });

  if (!hasBabel) {
    api.extendPackage({
      devDependencies: {
        '@babel/core': '^7.4.5',
        'babel-loader': '^8.0.4',
      },
    });
  }

  api.render('./template', { hasBabel });
};
