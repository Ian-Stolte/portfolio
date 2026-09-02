module.exports = function (eleventyConfig) {
  // Copy static assets straight through, unchanged, keeping their paths.
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("scripts");
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("style.css");
  eleventyConfig.addPassthroughCopy("resume.pdf");

  // Keep the (large) images tree out of the rebuild watcher. With input "."
  // a _data/ edit otherwise races with the watch and rebuilds with an empty
  // data dir. Images are still passthrough-copied and still live-reload.
  eleventyConfig.watchIgnores.add("images/**");

  // Keep the current flat URLs: /blue.html, not /blue/.
  eleventyConfig.addGlobalData("permalink", () => (data) =>
    `${data.page.filePathStem}.html`
  );

  return {
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
