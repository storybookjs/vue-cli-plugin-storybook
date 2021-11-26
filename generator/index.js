// eslint-disable-next-line no-unused-vars
module.exports = (api, options, rootOptions) => {
  api.assertCliVersion('>=5');
  const isVue3 = (rootOptions.vueVersion === '3');

  // eslint-disable-next-line import/no-dynamic-require, global-require
  const pkg = require(api.resolve('package.json'));

  const params = {
    hasTS: api.hasPlugin('typescript'), // TODO: Typescript support
    hasBabel: api.hasPlugin('babel'),
    hasEslintPluginImport: !!pkg.devDependencies['eslint-plugin-import'],
    versionRange: options.semver,
  };

  const frameworkSupport = isVue3 ? '@storybook/vue3' : '@storybook/vue';

  // All versions need this
  api.extendPackage({
    scripts: {
      'storybook:serve': 'vue-cli-service storybook:serve -p 6006 -c config/storybook',
      'storybook:build': 'vue-cli-service storybook:build -c config/storybook',
    },
    devDependencies: {
      '@storybook/addon-essentials': params.versionRange,
      '@storybook/builder-webpack5': params.versionRange,
      '@storybook/manager-webpack5': params.versionRange,
      [frameworkSupport]: params.versionRange,
    },
  });

  if (!params.hasBabel) {
    api.extendPackage({
      devDependencies: {
        '@babel/core': '^7.4.5',
        'babel-loader': '^8.0.4',
      },
    });
  } else {
    // Links is only added when babel is present
    api.extendPackage({
      devDependencies: {
        '@storybook/addon-links': params.versionRange,
      },
    });
  }

  api.render('./template', params);
};
