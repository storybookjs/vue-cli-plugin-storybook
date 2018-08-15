const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = (api) => {
  const resolvedConfig = api.resolveWebpackConfig();

  return config => ({
    ...config,
    plugins: [...config.plugins, new VueLoaderPlugin()],
    module: {
      ...config.module,
      ...resolvedConfig.module,
    },
    resolve: {
      ...resolvedConfig.resolve,
      alias: {
        ...resolvedConfig.resolve.alias,
        vue$: require.resolve('vue/dist/vue.esm.js'),
      },
    },
    resolveLoader: resolvedConfig.resolveLoader,
  });
};
