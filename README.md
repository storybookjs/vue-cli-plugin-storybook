# vue-cli-plugin-storybook

Vue CLI plugin for Storybook

## Installation

```
$ vue add storybook
```

<p align=center><img src=screencast.svg width=600></p>

## Usage

It will create a config folder for storybook, a sample component and a sample story. The webpack config used for storybook is resolved from `vue-cli-service`, which means you don't need to have any special `webpack.config.js` in storybook config folder.

However, storybook will filter all the plugins for webpack according to internal list of allowed plugins. If you are extending your config with your custom plugins, you can extend list of allowed plugins by passing their names through `pluginOptions` in your `vue.config.js` like this:

```js
{
  pluginOptions: {
    storybook: {
      allowedPlugins: [
        'define'
      ]
    }
  }
}
```

Note that only plugins defined with [webpack-chain](https://cli.vuejs.org/guide/webpack.html#chaining-advanced) config can be filtered using the `allowedPlugins` option. Plugings defined through `configureWebpack` will always be included in the final webpack config.

## Contributors
Here is a list of [Contributors](http://github.com/storybooks/vue-cli-plugin-storybook/contributors)

We particularly thank `Almas Akchabayev <almas.akchabayev@gmail.com>` for the initial code and willing to transfer the project to us.

### TODO

__I accept pull requests and guarantee a reply back within a day__

## License
MIT/X11

## Bug Reports
Report [here](http://github.com/storybooks/vue-cli-plugin-storybook/issues). __Guaranteed reply within a day__.

## Contact
Pavan Kumar Sunkara (pavan.sss1991@gmail.com)

Follow me on [github](https://github.com/users/follow?target=pksunkara), [twitter](http://twitter.com/pksunkara)
