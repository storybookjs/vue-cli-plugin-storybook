// eslint-disable-next-line import/no-unresolved, import/no-extraneous-dependencies
const server = require('@storybook/core-server');
const isVue3 = require('./isVue3');

// eslint-disable-next-line import/no-unresolved
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
  // eslint-disable-next-line global-require, import/no-unresolved
  const packageJson = isVue3(api) ? require('@storybook/vue3/package.json') : require('@storybook/vue/package.json');
  const framework = isVue3(api) ? 'vue3' : 'vue';

  api.registerCommand('storybook:serve', {
    description: 'Start storybook',
    usage: 'vue-cli-service storybook:serve',
    options: generateVueCliOptions(devOptions),
  }, (_, argv) => {
    process.env.VUE_CLI_STORYBOOK = 'serve';

    server.buildDev({
      packageJson,
      framework,
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
      framework,
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
