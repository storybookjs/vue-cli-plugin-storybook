const { Command } = require('commander');

function parseList(str) {
  return str.split(',');
}

const sharedOptions = [
  ['-s, --static-dir <dir-names>', 'Directory where to load static files from', parseList],
  ['-c, --config-dir [dir-name]', 'Directory where to load Storybook configurations from'],
  ['--quiet', 'Suppress verbose build output'],
  ['--loglevel [level]', 'Control level of logging during build'],
  ['--no-dll', 'Do not use dll reference (no-op)'],
  ['--docs-dll', 'Use Docs dll reference (legacy)'],
  ['--ui-dll', 'Use UI dll reference (legacy)'],
  ['--debug-webpack', 'Display final webpack configurations for debugging purposes'],
  ['--preview-url [string]', 'Disables the default storybook preview and lets your use your own'],
];

// Parsed from storybook repo.
// tags/v6.1.6: storybook/lib/core/src/server/cli/prod.js
const prodOptions = [
  ...sharedOptions,
  ['-o, --output-dir [dir-name]', 'Directory where to store built files'],
  ['-w, --watch', 'Enable watch mode'],
  ['--docs', 'Build a documentation-only site using addon-docs'],
];

// Parsed from storybook repo.
// tags/v6.1.6: storybook/lib/core/src/server/cli/dev.js
const devOptions = [
  ...sharedOptions,
  ['-p, --port [number]', 'Port to run Storybook', (str) => parseInt(str, 10)],
  ['-h, --host [string]', 'Host to run Storybook'],
  ['--https', 'Serve Storybook over HTTPS. Note: You must provide your own certificate information.'],
  ['--ssl-ca <ca>', 'Provide an SSL certificate authority. (Optional with --https, required if using a self-signed certificate)', parseList],
  ['--ssl-cert <cert>', 'Provide an SSL certificate. (Required with --https)'],
  ['--ssl-key <key>', 'Provide an SSL key. (Required with --https)'],
  ['--smoke-test', 'Exit after successful start'],
  ['--ci', "CI mode (skip interactive prompts, don't open browser)"],
  ['--no-version-updates', 'Suppress update check', true],
  ['--no-release-notes', 'Suppress automatic redirects to the release notes after upgrading', true],
  ['--no-manager-cache', 'Do not cache the manager UI'],
  ['--docs', 'Starts Storybook in documentation mode'],
];

const generateVueCliOptions = (options) => options.reduce(
  (vueCliOptions, [arg, desc]) => ({ ...vueCliOptions, [arg]: desc }),
  {},
);

const MOCK_EXECUTABLE_ARGV = ['node', 'vue-cli-plugin-storybook'];
const generateCommanderProgram = (argv, options) => {
  const program = new Command();

  options.forEach(([arg, desc, transform]) => {
    program.option(arg, desc, transform);
  });
  program.parse(MOCK_EXECUTABLE_ARGV.concat(argv));
  return program;
};

module.exports = {
  prodOptions,
  devOptions,
  generateCommanderProgram,
  generateVueCliOptions,
};
