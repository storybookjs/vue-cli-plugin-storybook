const semver = require('semver');

// eslint-disable-next-line no-unused-vars
module.exports = (api, options, rootOptions) => {
  api.assertCliVersion('>=4');

  const triConfig = !semver.gtr('5.3.0', options.semver);

  const params = {
    hasTS: api.hasPlugin('typescript'), // TODO: Typescript support
    hasBabel: api.hasPlugin('babel'),
    csf: options.csf || false,
  };

  api.extendPackage({
    scripts: {
      'storybook:serve': 'vue-cli-service storybook:serve -p 6006 -c config/storybook',
      'storybook:build': 'vue-cli-service storybook:build -c config/storybook',
    },
    devDependencies: {
      '@storybook/addon-actions': options.semver,
      '@storybook/addon-knobs': options.semver,
      '@storybook/addon-links': options.semver,
      '@storybook/addon-notes': options.semver,
      '@storybook/vue': options.semver,
    },
  });

  if (!params.hasBabel) {
    api.extendPackage({
      devDependencies: {
        '@babel/core': '^7.4.5',
        'babel-loader': '^8.0.4',
      },
    });
  }

  api.render('./template/body', params);

  if (triConfig) {
    api.render('./template/config', params);
  } else {
    api.render('./template/old_config', params);
  }
};
