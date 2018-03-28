module.exports = api => {
  api.extendPackage({
    scripts: {
      storybook: "start-storybook -p 6006 -c config/storybook",
      "build-storybook": "build-storybook -c config/storybook"
    }
  });

  api.render("template", {
    hasTS: api.hasPlugin("typescript")
  });
};
