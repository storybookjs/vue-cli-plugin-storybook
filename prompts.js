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
    default: '>=5.3.0',
    message: `What storybook version do you want? ${chalk.yellow('(Please specify semver range)')}`,
    validate: (input) => {
      if (input === '' || !semver.validRange(input)) {
        return 'Given semver range is not valid.';
      }

      if (!semver.prerelease(input) && !semver.intersects(input, '>=4.1.0')) {
        return 'Minimum supported storybook version is 4.1.0';
      }

      return true;
    },
  },
  {
    when: (answers) => answers.type === 'init' && !semver.gtr('5.2.0', answers.semver),
    name: 'csf',
    type: 'confirm',
    default: true,
    message: 'Use Storybook CSF (component story format)?',
  },
  {
    when: (answers) => answers.type === 'init' && !semver.gtr('5.2.0', answers.semver),
    name: 'docs',
    type: 'confirm',
    default: false,
    message: 'Use Storybook Docs?',
  },
];
