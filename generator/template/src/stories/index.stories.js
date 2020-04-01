<%_ if (hasEslintPluginImport) { _%>
/* eslint-disable import/no-extraneous-dependencies */
<%_ } _%>
<%_ if (!csf) { _%>
import { storiesOf } from '@storybook/vue'
<%_ } _%>
import { action } from '@storybook/addon-actions'
<%_ if (hasBabel) { _%>
import { linkTo } from '@storybook/addon-links'
<%_ } _%>

import MyButton from '../components/MyButton.vue'

<%_ if (!csf) { _%>
storiesOf('Button', module)
  .add('With Text', () => ({
    components: { MyButton },
    template: '<my-button @click="action">Hello Button</my-button>',
    methods: { action: action('clicked') }
  }))
  <%_ if (hasBabel) { _%>
  .add('With JSX', () => ({
    render() {
      return <MyButton onClick={linkTo('Button', 'With Some Emoji')}>With JSX</MyButton>;
    }
  }))
  <%_ } _%>
  .add('With Some Emoji', () => ({
    components: { MyButton },
    template: '<my-button>😀 😎 👍 💯</my-button>'
  }))
<%_ } else { _%>
export default {
  <%_ if (is_5_3) { _%>
  component: MyButton,
  <%_ } _%>
  title: 'Button'
}

export const withText = () => ({
  components: { MyButton },
  template: '<my-button @click="action">Hello Button</my-button>',
  methods: { action: action('clicked') }
})
<%_ if (hasBabel) { _%>

export const withJSX = () => ({
  render() {
    return <MyButton onClick={linkTo('Button', 'With Some Emoji')}>With JSX</MyButton>;
  }
})
<%_ } _%>

export const withSomeEmoji = () => ({
  components: { MyButton },
  template: '<my-button>😀 😎 👍 💯</my-button>'
})
<%_ } _%>
