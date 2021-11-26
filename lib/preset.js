const isVue3 = require('./isVue3');

module.exports = {
  webpack: (config, { api, options }) => {
    const chainableConfig = api.resolveChainableWebpackConfig();
    const existingPlugins = chainableConfig.plugins.values().map((item) => item.name);
    const allowedPlugins = [
      'vue-loader',
      'friendly-errors',
      'no-emit-on-errors',
      'extract-css',
      'optimize-css',
      'hash-module-ids',
      'fork-ts-checker',
    ];
    const vueModule = isVue3(api) ? 'vue/dist/vue.esm-browser.js' : 'vue/dist/vue.esm.js';

    existingPlugins.forEach((plugin) => {
      if (!allowedPlugins.includes(plugin) && !options.allowedPlugins.includes(plugin)) {
        chainableConfig.plugins.delete(plugin);
      }
    });

    chainableConfig.module.rule('eslint').exclude.add(api.resolve('config/storybook')).end();
    chainableConfig.module.rule('js').uses.delete('thread-loader');
    // Prevent global CSS imports from being removed by storybook-build
    chainableConfig.module.rule('css').set('sideEffects', true);

    const webpackConfig = api.resolveWebpackConfig(chainableConfig);

    return {
      ...config,
      plugins: [...config.plugins, ...webpackConfig.plugins],
      module: {
        ...config.module,
        ...webpackConfig.module,
      },
      resolve: {
        ...webpackConfig.resolve,
        alias: {
          ...webpackConfig.resolve && webpackConfig.resolve.alias,
          vue$: require.resolve(vueModule),
        },
        fallback: {
          ...webpackConfig.resolve && webpackConfig.resolve.fallback,
          path: require.resolve('path-browserify'),
        },
      },
      resolveLoader: webpackConfig.resolveLoader,
    };
  },
  webpackFinal: (config) => ({
    ...config,
    module: {
      ...config.module,
      // Remove duplicate rules added by storybook
      // https://github.com/storybookjs/storybook/blob/v5.2.0/lib/core/src/server/preview/base-webpack.config.js
      rules: config.module.rules.slice(0, -3),
    },
  }),
};
