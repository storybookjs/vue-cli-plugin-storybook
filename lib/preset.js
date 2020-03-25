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
          vue$: require.resolve('vue/dist/vue.esm.js'),
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
      // https://github.com/storybooks/storybook/blob/v5.2.0/lib/core/src/server/preview/base-webpack.config.js
      rules: config.module.rules.slice(0, -3),
    },
  }),
};
