const server = require('@storybook/core/server');
const VueLoaderPlugin = require.resolve('vue-loader/lib/plugin')

const wrapInitialConfig = config => ({
  ...config,
  plugins: [
    ...config.plugins,
    new VueLoaderPlugin(),
  ],
  module: {
    ...config.module,
    rules: [
      ...config.module.rules,
      {
        test: /\.vue$/,
        loader: require.resolve('vue-loader'),
        options: {},
      },
    ],
  },
  resolve: {
    ...config.resolve,
    extensions: [...config.resolve.extensions, '.vue'],
    alias: {
      ...config.resolve.alias,
      vue$: require.resolve('vue/dist/vue.esm.js'),
    },
  },
});

module.exports = (api, projectOptions) => {
  api.registerCommand('storybook', {
    description: 'Start storybook',
    usage: 'vue-cli-service storybook',
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
  }, args => {
    server.buildDev({
      packageJson: {
        name: '@storybook/vue',
        version: '4.0.0-alpha.14',
      },
      wrapInitialConfig
    });
  });

  api.registerCommand('build:storybook', {
    description: 'Build storybook',
    usage: 'vue-cli-service build:storybook',
    options: {
      '-s, --static-dir <dir-names>': 'Directory where to load static files from',
      '-o, --output-dir [dir-name]': 'Directory where to store built files',
      '-c, --config-dir [dir-name]': 'Directory where to load Storybook configurations from',
      '-w, --watch': 'Enable watch mode (default: false)'
    },
  }, args => {
    server.buildStatic({
      packageJson: {
        name: '@storybook/vue',
        version: '4.0.0-alpha.14',
      },
      wrapInitialConfig
    });
  });
};

module.exports.defaultModes = {
  'build:storybook': 'production'
};
