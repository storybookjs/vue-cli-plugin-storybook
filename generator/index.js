module.exports = api => {
  // TODO: Typescript support
  // TODO: Lint after generation
  // TODO: Storybook moving to babel@7

  api.extendPackage({
    scripts: {
      storybook: "start-storybook -p 6006 -c config/storybook",
      "build-storybook": "build-storybook -c config/storybook"
    },
    "devDependencies": {
      "@storybook/addon-actions": "^4.0.0-alpha.13",
      "@storybook/addon-knobs": "^4.0.0-alpha.13",
      "@storybook/addon-links": "^4.0.0-alpha.13",
      "@storybook/addon-notes": "^4.0.0-alpha.13",
    },
  });

  api.render("./template");
};
