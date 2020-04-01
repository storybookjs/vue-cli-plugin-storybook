<%_ if (!is_5_3) { _%>
<%_ if (hasEslintPluginImport) { _%>
/* eslint-disable import/no-extraneous-dependencies */
<%_ } _%>
import { configure } from '@storybook/vue'

configure(require.context('../../src', true, /\.stories\.(jsx?|tsx?|mdx)$/), module)
<%_ } _%>
