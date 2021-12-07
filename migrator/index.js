const selectWebpack5 = require('./selectWebpack5');

module.exports = (api) => {
  if (api.fromVersion('~2')) {
    const semver = '^6.4.3';
    api.extendPackage({
      devDependencies: {
        '@storybook/builder-webpack5': semver,
        '@storybook/manager-webpack5': semver,
      },
    });
    api.transformScript(api.resolve('config/storybook/main.js'), selectWebpack5);
  }
};
