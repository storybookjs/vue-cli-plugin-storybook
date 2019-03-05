const { Command } = require('commander');

function parseList(str) {
  return str.split(',');
}

const sharedOptions = [
  ['-s, --static-dir <dir-names>', 'Directory where to load static files from', parseList],
  ['-c, --config-dir [dir-name]', 'Directory where to load Storybook configurations from'],
  ['--quiet', 'Suppress verbose build output'],
];

// Parsed from storybook repo.
// tags/v4.1.4: storybook/lib/core/src/server/cli/prod.js
const prodOptions = [
  ...sharedOptions,
  ['-o, --output-dir [dir-name]', 'Directory where to store built files'],
  ['-w, --watch', 'Enable watch mode'],
];

// Parsed from storybook repo.
// tags/v4.1.4: storybook/lib/core/src/server/cli/dev.js
const devOptions = [
  ...sharedOptions,
  ['-p, --port [number]', 'Port to run Storybook', str => parseInt(str, 10)],
  ['-h, --host [string]', 'Host to run Storybook'],
  ['--https', 'Serve Storybook over HTTPS. Note: You must provide your own certificate information.'],
  ['--ssl-ca <ca>', 'Provide an SSL certificate authority. (Optional with --https, required if using a self-signed certificate)', parseList],
  ['--ssl-cert <cert>', 'Provide an SSL certificate. (Required with --https)'],
  ['--ssl-key <key>', 'Provide an SSL key. (Required with --https)'],
  ['--smoke-test', 'Exit after successful start'],
  ['--ci', "CI mode (skip interactive prompts, don't open browser"],
];

const generateVueCliOptions = options => options.reduce(
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
