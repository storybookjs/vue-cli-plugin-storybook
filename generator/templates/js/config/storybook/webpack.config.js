const merge = require("webpack-merge");
const { storyLoader } = require("vue-storybook");
const genStorybookDefaultConfig = require("@storybook/vue/dist/server/config/defaults/webpack.config.js");
const vueConfig = require("@vue/cli-service/webpack.config.js");

module.exports = (storybookBaseConfig, configType) => {
  const storybookConfig = genStorybookDefaultConfig(
    storybookBaseConfig,
    configType
  );

  const result = {
    ...vueConfig, // use vue's webpack configuration by default
    entry: storybookConfig.entry, // overwite entry
    output: storybookConfig.output, // overwrite output
    // remove duplicated plugins
    plugins: merge({
      customizeArray: merge.unique(
        "plugins",
        [
          "HotModuleReplacementPlugin",
          "CaseSensitivePathsPlugin",
          "WatchMissingNodeModulesPlugin"
        ],
        plugin => plugin.constructor && plugin.constructor.name
      )
    })(vueConfig, storybookConfig).plugins,
    resolve: {
      ...vueConfig.resolve,
      alias: {
        ...vueConfig.resolve.alias,
        vue$: storybookConfig.resolve.alias.vue$
      }
    }
  };

  // add story loader to vue-loader options
  result.module.rules[0].use[0].options.loaders = {
    ...result.module.rules[0].use[0].options.loaders,
    story: storyLoader
  };
  return result;
};
