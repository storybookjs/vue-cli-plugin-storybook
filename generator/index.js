module.exports = api => {
  api.extendPackage({
    scripts: {
      storybook: "vue-cli-service start-storybook",
      "build-storybook": "vue-cli-service start-storybook"
    },
    devDependencies: {
      "@storybook/addon-actions": "^3.3.15",
      "@storybook/addon-knobs": "^3.3.15",
      "@storybook/addon-notes": "^3.3.15",
      "@storybook/addons": "^3.3.15",
      "@storybook/vue": "^3.3.15",
      "@types/storybook__addon-actions": "^3.0.3",
      "@types/storybook__addon-knobs": "^3.2.3",
      "@types/storybook__addon-links": "^3.3.0",
      "@types/storybook__addon-notes": "^3.3.1",
      "@types/storybook__vue": "^3.3.0",
      storybook: "^1.0.0",
      "vue-storybook": "^0.2.0",
      "webpack-merge": "^4.1.2"
    }
  });

  api.render("templates/js");

  //   if (api.hasPlugin("typescript")) {
  //     api.render(files => {
  //       files["tests/unit/.eslintrc"] = JSON.stringify(
  //         {
  //           env: { jest: true },
  //           rules: {
  //             "import/no-extraneous-dependencies": "off"
  //           }
  //         },
  //         null,
  //         2
  //       );
  //     });
  //   }
};
