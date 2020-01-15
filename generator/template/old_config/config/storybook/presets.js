<%_ if (docs) { _%>
module.exports = [
  <%_ if (hasBabel) { _%>
  {
    name: '@storybook/addon-docs/vue/preset',
    options: {
      babelOptions: {
        presets: [
          [
            '@vue/cli-plugin-babel/preset',
            {
              jsx: false
            }
          ]
        ]
      }
    }
  }
  <%_ } else { _%>
  '@storybook/addon-docs/vue/preset'
  <%_ } _%>
]
<%_ } _%>
