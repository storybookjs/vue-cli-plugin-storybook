// eslint-disable-next-line import/no-unresolved
const server = require('@storybook/core/server');
// eslint-disable-next-line import/no-unresolved
const packageJson = require('@storybook/vue/package.json');
const {
  devOptions,
  prodOptions,
  generateVueCliOptions,
  generateCommanderProgram,
} = require('./options');

const defaultOptions = {
  allowedPlugins: [],
};

module.exports = (api, { pluginOptions = {} }) => {
  const options = { ...defaultOptions, ...pluginOptions.storybook };

  api.registerCommand('storybook:serve', {
    description: 'Start storybook',
    usage: 'vue-cli-service storybook:serve',
    options: generateVueCliOptions(devOptions),
  }, (_, argv) => {
    process.env.VUE_CLI_STORYBOOK = 'serve';

    server.buildDev({
      packageJson,
      framework: 'vue',
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
    process.env.VUE_CLI_STORYBOOK = 'build';

    server.buildStatic({
      packageJson,
      framework: 'vue',
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
