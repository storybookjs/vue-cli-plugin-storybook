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
    default: '>=4.1.0',
    message: `What storybook version do you want? ${chalk.yellow('(Please specify semver range)')}`,
    validate: (input) => (input !== '' && semver.validRange(input) ? true : 'Given semver range is not valid.'),
  },
];
