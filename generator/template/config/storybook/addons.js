<%_ if (!is_5_3) { _%>
<%_ if (hasEslintPluginImport) { _%>
/* eslint-disable import/no-extraneous-dependencies */
<%_ } _%>
import '@storybook/addon-actions/register'
import '@storybook/addon-knobs/register'
import '@storybook/addon-links/register'
<%_ } _%>
