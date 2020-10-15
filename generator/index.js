// eslint-disable-next-line no-unused-vars
module.exports = (api, options, rootOptions) => {
  api.assertCliVersion('>=4');

  // eslint-disable-next-line import/no-dynamic-require, global-require
  const pkg = require(api.resolve('package.json'));

  const params = {
    hasTS: api.hasPlugin('typescript'), // TODO: Typescript support
    hasBabel: api.hasPlugin('babel'),
    hasEslintPluginImport: !!pkg.devDependencies['eslint-plugin-import'],
  };
  const sbVersionRange = '^6.0.26';

  // All versions need this
  api.extendPackage({
    scripts: {
      'storybook:serve': 'vue-cli-service storybook:serve -p 6006 -c config/storybook',
      'storybook:build': 'vue-cli-service storybook:build -c config/storybook',
    },
    devDependencies: {
      '@storybook/vue': sbVersionRange,
      '@storybook/addon-essentials': sbVersionRange,
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
        '@storybook/addon-links': sbVersionRange,
      },
    });
  }

  api.render('./template', params);
};
