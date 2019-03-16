# Changelog

## 0.6.1

### Bug Fixes
* Fix bug with addon versions not being updated in the previous version

## 0.6.0

### Enhancements
* Allow support for storybook 5

## 0.5.2

### Enhancements
* Allow the storybook plugin to take storybook options

## 0.5.1

### Bug Fixes
* Allow support for vue-cli's configureWebpack

## 0.5.0

### Breaking
* Changed the commands in to `storybook:serve` and `storybook:build`

### Enhancements
* Upgraded storybook dependencies to ^4.1.0
* Allow customization of plugins that can be whitelisted

### Bug Fixes
* Add babel-loader needed by storybook to vue project if it doesn't use babel at all

## [0.4.8] (2018-09-12)

### Bug Fixes
* Pin storybook to alpha20

## [0.4.7] (2018-09-05)

### Bug Fixes
* Whitelist the plugins coming from vue config instead of blacklisting

## [0.4.6] (2018-09-01)

### Bug Fixes
* Removed preload and prefetch plugins from vue config before sending to storybook config

## [0.4.5] (2018-09-01)

### Enhancements
* Upgraded storybook dependencies to alpha20

## [0.4.4] (2018-08-16)

### Enhancements
* Lint fix the generated files
* Used vue app's webpack plugins for building storybook

## [0.4.3] (2018-08-15)

### Bug Fixes
* Resolve webpack config of application when running the storybook command rather than loading the plugin
* No JSX story when @vue/cli-plugin-babel is installed

## [0.4.2] (2018-08-06)

### Enhancements
* Upgrade storybook dependencies to alpha16

## [0.4.1] (2018-08-05)

### Enhancements
* Pin storybook dependencies (until v4) and downgrade @storybook/vue to alpha14

## [0.4.0] (2018-08-05)

### Breaking
* Changed `vue-cli-service storybook` to `vue-cli-service serve:storybook`

### Bug Fixes
* Fixed the eslint hook issue after the plugin is added

[0.4.7]: https://github.com/pksunkara/vue-cli-plugin-storybook/compare/v0.4.6...v0.4.7
[0.4.6]: https://github.com/pksunkara/vue-cli-plugin-storybook/compare/v0.4.5...v0.4.6
[0.4.5]: https://github.com/pksunkara/vue-cli-plugin-storybook/compare/v0.4.4...v0.4.5
[0.4.4]: https://github.com/pksunkara/vue-cli-plugin-storybook/compare/v0.4.3...v0.4.4
[0.4.3]: https://github.com/pksunkara/vue-cli-plugin-storybook/compare/v0.4.2...v0.4.3
[0.4.2]: https://github.com/pksunkara/vue-cli-plugin-storybook/compare/v0.4.1...v0.4.2
[0.4.1]: https://github.com/pksunkara/vue-cli-plugin-storybook/compare/v0.4.0...v0.4.1
[0.4.0]: https://github.com/pksunkara/vue-cli-plugin-storybook/compare/v0.3.0...v0.4.0
