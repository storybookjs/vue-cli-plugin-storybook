import { configure } from "@storybook/vue";

<%_ if (hasTS) { _%>
const req = require.context("../../src/stories", true, /.stories.ts$/);
<%_ } else { _%>
const req = require.context("../../src/stories", true, /.stories.js$/);
<%_ } _%>
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
