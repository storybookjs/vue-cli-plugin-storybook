module.exports = (api) => {
  const chain = api.resolveChainableWebpackConfig();

  chain.plugins.delete('define');
  chain.plugins.delete('hmr');
  chain.plugins.delete('html');
  chain.plugins.delete('copy');

  const resolvedConfig = chain.toConfig();

  return config => ({
    ...config,
    plugins: [...config.plugins, ...resolvedConfig.plugins],
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
