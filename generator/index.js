module.exports = api => {
  api.extendPackage({
    scripts: {
      storybook: "start-storybook -p 6006 -c config/storybook",
      "build-storybook": "build-storybook -c config/storybook"
    }
  });

  api.render("./template", {
    hasTS: api.hasPlugin("typescript")
  });

  // rename index.stories.js to index.stories.ts
  api.postProcessFiles(files => {
    if (api.hasPlugin("typescript")) {
      const jsFilename = "src/stories/index.stories.js";
      const tsFilename = jsFilename.replace(".js", ".ts");
      if (!files[tsFilename]) {
        const content = files[jsFilename];
        files[tsFilename] = content;
      }
      delete files[jsFilename];
    }
  });
};
