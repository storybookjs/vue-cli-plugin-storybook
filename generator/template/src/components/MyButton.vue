<template>
  <button class="button is-primary" @click="onClick">
    <slot></slot>
  </button>
</template>

<script>
<%_ if (hasTS) { _%>
import Vue from "vue";

export default Vue.extend({
  name: "my-button",

  methods: {
    onClick() {
      this.$emit("click");
    }
  }
});
<%_ } else { _%>
export default {
  name: "my-button",

  methods: {
    onClick() {
      this.$emit("click");
    }
  }
};
<%_ } _%>
</script>

<style>
.button-styles {
  border: 1px solid #eee;
  border-radius: 3px;
  background-color: #ffffff;
  cursor: pointer;
  font-size: 15pt;
  padding: 3px 10px;
  margin: 10px;
}
</style>
