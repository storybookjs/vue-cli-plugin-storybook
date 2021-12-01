const semver = require('semver');
const chalk = require('chalk');

module.exports = [
  {
    name: 'type',
    type: 'list',
    message: 'What do you want to generate?',
    choices: [
      {
        name: 'Initial framework',
        value: 'init',
      },
    ],
  },
  {
    when: (answers) => answers.type === 'init',
    name: 'semver',
    type: 'input',
    default: '^6.4.3',
    message: `What storybook version do you want? ${chalk.yellow('(Please specify semver range)')}`,
    validate: (input) => {
      if (input === '' || !semver.validRange(input)) {
        return 'Given semver range is not valid.';
      }

      if (!semver.prerelease(input) && !semver.intersects(input, '>=6.2.0')) {
        return 'Minimum supported storybook version is 6.2.0';
      }

      return true;
    },
  },
];
