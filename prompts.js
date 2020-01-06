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
    name: 'version',
    type: 'input',
    message: `What storybook version do you want? ${chalk.yellow('(Please specify semver range)')}`,
    validate: (input) => (semver.validRange(input) ? true : 'Given semver range is not valid.'),
  },
];
