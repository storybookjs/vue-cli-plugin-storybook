module.exports = {
  stories: ['../../src/**/*.stories.(js|jsx|ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-actions',
    <%_ if (docs) { _%>
    '@storybook/addon-docs',
    <%_ } _%>
    '@storybook/addon-knobs',
    '@storybook/addon-links',
    '@storybook/addon-notes'
  ]
}
