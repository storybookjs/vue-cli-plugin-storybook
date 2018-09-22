module.exports = (api, options) => {
  const chain = api.resolveChainableWebpackConfig();
  const existingPlugins = chain.plugins.values().map(item => item.name);
  let allowedPlugins = [
    'vue-loader',
    'friendly-errors',
    'no-emit-on-errors',
    'extract-css',
    'optimize-css',
    'hash-module-ids',
  ];

  if (options && options.allowedPlugins) {
    allowedPlugins = options.allowedPlugins.reduce((allPlugins, plugin) => {
      if (allPlugins.indexOf(plugin) < 0) {
        allPlugins.push(plugin);
      }
      return allPlugins;
    }, allowedPlugins);
  }

  existingPlugins.forEach((plugin) => {
    if (!allowedPlugins.includes(plugin)) {
      chain.plugins.delete(plugin);
    }
  });

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
