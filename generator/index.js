// eslint-disable-next-line no-unused-vars
module.exports = (api, options, rootOptions) => {
  // TODO: Typescript support

  api.extendPackage({
    scripts: {
      'serve:storybook': 'vue-cli-service serve:storybook -p 6006 -c config/storybook',
      'build:storybook': 'vue-cli-service build:storybook -c config/storybook',
    },
    devDependencies: {
      '@storybook/addon-actions': '4.0.0-alpha.20',
      '@storybook/addon-links': '4.0.0-alpha.20',
    },
    dependencies: {
      'babel-loader': '^8.0.4',
    },
  });

  api.render('./template', {
    hasBabel: api.hasPlugin('babel'),
  });

  // FIXME: Exists until https://github.com/vuejs/vue-cli/issues/1754 is done
  api.onCreateComplete(() => {
    // Linting the generated files
    if (api.hasPlugin('eslint')) {
      // eslint-disable-next-line global-require, import/no-unresolved
      const lint = require('@vue/cli-plugin-eslint/lint');
      lint({ silent: true }, api);
    }
  });
};
