module.exports = {
  // Use only this configuration
  root: true,
  // File parser
  parser: "vue-eslint-parser",
  parserOptions: {
    // Use babel-eslint for JavaScript
    parser: "babel-eslint",
    ecmaVersion: 2017,
    // With import/export syntax
    sourceType: "module"
  },
  // Environment global objects
  env: {
    browser: true,
    es6: true,
    jest: true
  },
  extends: ["prettier", "plugin:vue/recommended"],
  rules: {
    "vue/html-closing-bracket-newline": [
      "error",
      {
        singleline: "never",
        multiline: "always"
      }
    ],
    "vue/html-closing-bracket-spacing": [
      "error",
      {
        startTag: "never",
        endTag: "never",
        selfClosingTag: "never"
      }
    ],
    "vue/max-attributes-per-line": [
      "error",
      {
        singleline: 2,
        multiline: {
          max: 1,
          allowFirstLine: false
        }
      }
    ],
    // Warn
    "vue/require-default-prop": "warn",
    "vue/require-prop-types": "warn"
  }
};
