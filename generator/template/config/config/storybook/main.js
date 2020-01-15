module.exports = {
  stories: ['../../src/**/*.stories.(js|jsx|ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-actions',
    <%_ if (docs) { _%>
    <%_ if (hasBabel) { _%>
    {
      name: '@storybook/addon-docs',
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
    },
    <%_ } else { _%>
    '@storybook/addon-docs',
    <%_ } _%>
    <%_ } _%>
    '@storybook/addon-knobs',
    '@storybook/addon-links',
    '@storybook/addon-notes'
  ]
}
