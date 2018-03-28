module.exports = api => {
  api.extendPackage({
    scripts: {
      storybook: "start-storybook -p 6006 -c config/storybook",
      "build-storybook": "build-storybook -c config/storybook"
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
