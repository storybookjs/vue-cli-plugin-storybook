// eslint-disable-next-line import/no-extraneous-dependencies
const server = require('@storybook/core/server');

// const wrapDefaultConfig = config => ({
//   ...config,
//   module: {
//     ...config.module,
//     rules: config.module.rules.slice(0, -4),
//   },
// });

const defaultOptions = {
  allowedPlugins: [],
};

// eslint-disable-next-line no-unused-vars
module.exports = (api, { pluginOptions = {} }) => {
  const options = Object.assign({}, defaultOptions, pluginOptions.storybook);

  api.registerCommand('storybook:serve', {
    description: 'Start storybook',
    usage: 'vue-cli-service storybook:serve',
    options: {
      '-p, --port [number]': 'Port to run Storybook (required)',
      '-h, --host [string]': 'Host to run Storybook',
      '-s, --static-dir <dir-names>': 'Directory where to load static files from',
      '-c, --config-dir [dir-name]': 'Directory where to load Storybook configurations from',
      '--https': 'Serve Storybook over HTTPS. Note: You must provide your own certificate information.',
      '--ssl-ca <ca>': 'Provide an SSL certificate authority. (Optional with --https, required if using a self-signed certificate)',
      '--ssl-cert <cert>': 'Provide an SSL certificate. (Required with --https)',
      '--ssl-key <key>': 'Provide an SSL key. (Required with --https)',
      '--smoke-test': 'Exit after successful start',
      '--quiet': 'Suppress verbose build output',
    },
  }, () => {
    server.buildDev({
      packageJson: {
        name: '@storybook/vue',
        version: '^4.1.0',
      },
      frameworkPresets: [
        {
          preset: require.resolve('./preset'),
          options: { api, options },
        },
      ],
    });
  });

  api.registerCommand('storybook:build', {
    description: 'Build storybook',
    usage: 'vue-cli-service storybook:build',
    options: {
      '-s, --static-dir <dir-names>': 'Directory where to load static files from',
      '-o, --output-dir [dir-name]': 'Directory where to store built files',
      '-c, --config-dir [dir-name]': 'Directory where to load Storybook configurations from',
      '-w, --watch': 'Enable watch mode (default: false)',
    },
  }, () => {
    server.buildStatic({
      packageJson: {
        name: '@storybook/vue',
        version: '^4.1.0',
      },
      frameworkPresets: [
        {
          preset: require.resolve('./preset'),
          options: { api, options },
        },
      ],
    });
  });
};

module.exports.defaultModes = {
  'storybook:build': 'production',
};
