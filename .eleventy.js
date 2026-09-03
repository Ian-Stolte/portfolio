const Image = require("@11ty/eleventy-img").default;

const IMG_OPTS = {
  formats: ["webp"],
  outputDir: "_site/img/",
  urlPath: "/img/",
  sharpWebpOptions: { quality: 78 },
};

// "/images/art/x.png" -> "images/art/x.png" (path on disk, from project root)
const toDiskPath = (src) => src.replace(/^\/+/, "");

// -> [{ url, width, height }, ...] ascending by width (no upscaling past the source)
async function optimize(src, widths) {
  const meta = await Image(toDiskPath(src), { ...IMG_OPTS, widths });
  return meta.webp;
}

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

  // Gallery tiles: { id -> { src, srcset, w, h, full } }. Computed once per
  // build and passed into the (sync) tile macro, since async filters don't
  // run reliably inside Nunjucks macros.
  eleventyConfig.addAsyncFilter("galleryImages", async (pieces) => {
    const out = {};
    for (const [id, p] of Object.entries(pieces)) {
      if (p.hidden || p.video) continue;
      const sizes = await optimize(p.src, [400, 800, 1200, 1600]);
      const largest = sizes[sizes.length - 1];
      out[id] = {
        src: sizes[0].url,
        srcset: sizes.map((s) => `${s.url} ${s.width}w`).join(", "),
        w: largest.width,
        h: largest.height,
        full: largest.url,
      };
    }
    return out;
  });

  // Lightbox-only "process" shots: flat list, one large webp per image
  // (videos pass through). scripts/art-gallery.js reads this as JSON.
  eleventyConfig.addAsyncFilter("lightboxShots", async (pieces) => {
    const out = [];
    for (const [group, p] of Object.entries(pieces)) {
      if (p.hidden || !p.process) continue;
      for (const shot of p.process) {
        if (shot.video) {
          out.push({ group, src: shot.src, caption: shot.caption, video: true });
        } else {
          const [s] = (await optimize(shot.src, [1600])).slice(-1);
          out.push({ group, src: s.url, caption: shot.caption, w: s.width, h: s.height });
        }
      }
    }
    return out;
  });

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
