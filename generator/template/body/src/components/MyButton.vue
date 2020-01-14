<template>
  <button class="button is-primary" @click="onClick">
    <slot></slot>
  </button>
</template>

<%_ if (hasTS) { _%>
<script lang="ts">
<%_ } else { _%>
<script>
<%_ } _%>
export default {
  name: 'my-button',

  methods: {
    onClick() {
      this.$emit('click')
    }
  }
}
</script>

<style scoped>
button {
  border: 1px solid #eee;
  border-radius: 3px;
  background-color: #ffffff;
  cursor: pointer;
  font-size: 15pt;
  padding: 3px 10px;
  margin: 10px;
}
</style>
