<%_ if (!is_5_3) { _%>
/* eslint-disable import/no-extraneous-dependencies */
import { configure } from '@storybook/vue'

configure(require.context('../../src', true, /\.stories\.(jsx?|tsx?|mdx)$/), module)
<%_ } _%>
