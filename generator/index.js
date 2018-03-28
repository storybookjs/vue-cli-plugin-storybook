module.exports = api => {
  api.extendPackage({
    scripts: {
      storybook: "vue-cli-service start-storybook",
      "build-storybook": "vue-cli-service start-storybook"
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
