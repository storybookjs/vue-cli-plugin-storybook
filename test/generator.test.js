const assert = require("assert");
const ejs = require("ejs");
const { stripIndent } = require("common-tags");

const getScriptContent = str => {
  const result = str.match(/<script>(.*?)<\/script>/gs);
  return result[0].replace(/<\/?script>/g, "").trim();
};

describe("Generator", function() {
  describe("{ hasTS: false }", function() {
    it("should generate Welcome.vue", function(done) {
      const filename = "./generator/template/src/components/Welcome.vue";
      const data = { hasTS: false };
      const options = {};

      ejs.renderFile(filename, data, options, function(err, str) {
        assert.equal(
          getScriptContent(str),
          stripIndent`
          const log = () => console.log("Welcome to storybook!");

          export default {
            name: "welcome",

            props: {
              showApp: {
                type: Function,
                default: log
              }
            },

            methods: {
              onClick(event) {
                event.preventDefault();
                this.showApp();
              }
            }
          };
          `
        );
        done();
      });
    });

    it("should generate MyButton.vue", function(done) {
      const filename = "./generator/template/src/components/MyButton.vue";
      const data = { hasTS: false };
      const options = {};

      ejs.renderFile(filename, data, options, function(err, str) {
        assert.equal(
          getScriptContent(str),
          stripIndent`
          export default {
            name: "my-button",

            methods: {
              onClick() {
                this.$emit("click");
              }
            }
          };
          `
        );
        done();
      });
    });

    it("should generate config.js", function(done) {
      const filename = "./generator/template/config/storybook/config.js";
      const data = { hasTS: false };
      const options = {};

      ejs.renderFile(filename, data, options, function(err, str) {
        assert.equal(
          str.trim(),
          stripIndent`
          import { configure } from "@storybook/vue";

          const req = require.context("../../src/stories", true, /.stories.js$/);
          function loadStories() {
            req.keys().forEach(filename => req(filename));
          }

          configure(loadStories, module);
          `
        );
        done();
      });
    });
  });

  describe("{ hasTS: true }", function() {
    it("should generate Welcome.vue", function(done) {
      const filename = "./generator/template/src/components/Welcome.vue";
      const data = { hasTS: true };
      const options = {};

      ejs.renderFile(filename, data, options, function(err, str) {
        assert.equal(
          getScriptContent(str),
          stripIndent`
          import Vue from "vue";

          const log = () => console.log("Welcome to storybook!");

          export default Vue.extend({
            name: "welcome",

            props: {
              showApp: {
                type: Function,
                default: log
              }
            },

            methods: {
              onClick(event) {
                event.preventDefault();
                this.showApp();
              }
            }
          });
          `
        );
        done();
      });
    });

    it("should generate MyButton.vue", function(done) {
      const filename = "./generator/template/src/components/MyButton.vue";
      const data = { hasTS: true };
      const options = {};

      ejs.renderFile(filename, data, options, function(err, str) {
        assert.equal(
          getScriptContent(str),
          stripIndent`
          import Vue from "vue";

          export default Vue.extend({
            name: "my-button",

            methods: {
              onClick() {
                this.$emit("click");
              }
            }
          });
          `
        );
        done();
      });
    });

    it("should generate config.js", function(done) {
      const filename = "./generator/template/config/storybook/config.js";
      const data = { hasTS: true };
      const options = {};

      ejs.renderFile(filename, data, options, function(err, str) {
        assert.equal(
          str.trim(),
          stripIndent`
          import { configure } from "@storybook/vue";

          const req = require.context("../../src/stories", true, /.stories.ts$/);
          function loadStories() {
            req.keys().forEach(filename => req(filename));
          }

          configure(loadStories, module);
          `
        );
        done();
      });
    });
  });
});
