const { semver, loadModule } = require('@vue/cli-shared-utils');

module.exports = (api) => {
  const vue = loadModule('vue', api.service.context);
  return vue && semver.major(vue.version) === 3;
};
