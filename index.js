// eslint-disable-next-line import/no-extraneous-dependencies
const server = require('@storybook/core/server');
const {
  devOptions,
  prodOptions,
  generateVueCliOptions,
  generateCommanderProgram,
} = require('./options');

const defaultOptions = {
  allowedPlugins: [],
};

// eslint-disable-next-line no-unused-vars
module.exports = (api, { pluginOptions = {} }) => {
  const options = Object.assign({}, defaultOptions, pluginOptions.storybook);

  api.registerCommand('storybook:serve', {
    description: 'Start storybook',
    usage: 'vue-cli-service storybook:serve',
    options: generateVueCliOptions(devOptions),
  }, (_, argv) => {
    server.buildDev({
      packageJson: {
        name: '@storybook/vue',
        version: '^4.1.0',
      },
      frameworkPresets: [
        {
          name: require.resolve('./preset'),
          options: { api, options },
        },
      ],
      ...generateCommanderProgram(argv, devOptions),
    });
  });

  api.registerCommand('storybook:build', {
    description: 'Build storybook',
    usage: 'vue-cli-service storybook:build',
    options: generateVueCliOptions(prodOptions),
  }, (_, argv) => {
    server.buildStatic({
      packageJson: {
        name: '@storybook/vue',
        version: '^4.1.0',
      },
      frameworkPresets: [
        {
          name: require.resolve('./preset'),
          options: { api, options },
        },
      ],
      ...generateCommanderProgram(argv, prodOptions),
    });
  });
};

module.exports.defaultModes = {
  'storybook:build': 'production',
};
