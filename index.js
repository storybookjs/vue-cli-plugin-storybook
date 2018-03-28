const { hasYarn } = require("@vue/cli-shared-utils");
const chalk = require("chalk");

module.exports = (api, options) => {
  const cmd = hasYarn() ? "yarn" : "npm";
  const useThreads = process.env.NODE_ENV === "production" && options.parallel;
  const cacheDirectory = api.resolve("node_modules/.cache/cache-loader");

  api.registerCommand("storybook", (args, rawArgv) => {
    const execa = require("execa");
    const startStorybookBinPath = require.resolve("@storybook/vue/bin/index");

    let testMatch = [];
    if (!args._.length) {
      testMatch = [`-p`, `6006`];
    }

    const argv = [...rawArgv, ...testMatch];

    return new Promise((resolve, reject) => {
      const child = execa(startStorybookBinPath, argv, {
        cwd: api.resolve("."),
        stdio: "inherit"
      });
      child.on("error", reject);
      child.on("exit", code => {
        if (code !== 0) {
          reject(`storybook exited with code ${code}.`);
        } else {
          resolve();
        }
      });
    });
  });

  api.registerCommand("build-storybook", args => {
    const execa = require("execa");
    const buildStorybookBinPath = require.resolve("@storybook/vue/bin/build");

    return new Promise((resolve, reject) => {
      const child = execa(buildStorybookBinPath, args, {
        cwd: api.resolve("."),
        stdio: "inherit"
      });
      child.on("error", reject);
      child.on("exit", code => {
        if (code !== 0) {
          reject(`storybook exited with code ${code}.`);
        } else {
          resolve();
        }
      });
    });
  });
};
