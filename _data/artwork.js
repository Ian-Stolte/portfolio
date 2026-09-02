/* ============================================================
   ART GALLERY DATA  —  edit this file to change the art page.

   LAYOUT
     sections[].desktop : array of columns, each column an array of
                          piece ids, top to bottom. The number of
                          columns is however many arrays you put here
                          (2D uses 3, 3D uses 2). No auto-balancing —
                          a column is exactly what you list.
     sections[].mobile  : one ordered list of ids (also used, flowed
                          into 2 columns, for the tablet width).

   EDITING
     - Move a piece  : cut/paste its id string within/between arrays.
     - Hide for one view : put // in front of its id line.
     - Hide everywhere   : `hidden: true` on the piece (keeps the def).
     - Lightbox extras   : the piece's `process` array.
     - Nudge / scale     : `css: { desktop: "...", mobile: "..." }` on
                           the piece — raw CSS on the tile wrapper,
                           e.g. "margin-top: 50px" or
                           "transform: scale(0.92)".

   A piece's id is also its lightbox group, so its `process` images
   show up when you click it. Unreferenced pieces are simply not shown.
   ============================================================ */

module.exports = {
  sections: [
    {
      heading: "2D ART",
      tool: { name: "Krita", icon: "Krita.png" },

      desktop: [
        ["rat-knight", "glimmer", "entrapta"],
        ["bounty-hunter", "landscape", "trixie"],
        [
          "little-mermaid",
          "bot",
          // "wof-designs",   // set hidden:false on the piece to bring it back
          // "jade-winglet",
          "mara",
        ],
      ],

      mobile: [
        "little-mermaid",
        "jade-winglet",
        "rat-knight",
        "glimmer",
        "trixie",
        "landscape",
        "entrapta",
        "bot",
        "mara",
      ],
    },

    {
      heading: "3D ART",
      tool: { name: "Blender", icon: "Blender.png" },

      // WIP — 2 columns.
      desktop: [
        ["twilight-3d", "vzero-env"],
        ["fdef-models", "reya-walk"],
      ],

      mobile: ["reya-walk", "vzero-env", "fdef-models"],
    },
  ],

  pieces: {
    /* ---------- 2D ---------- */

    "rat-knight": {
      src: "/images/art/RatKnight_final.png",
      alt: "Rat Knight Character Art",
      label: "Illustration",
      caption:
        "One of my characters from a role-playing game— a rat-turned-human-knight with a love of symphonic music",
      process: [
        { src: "/images/art/RatKnight_1.png", caption: "Initial thumbnail sketches, exploring a couple different compositions" },
        { src: "/images/art/RatKnight_2.png", caption: "Different color palettes applied to the composition sketches. I aimed for something a little unearthly and unsettling" },
        { src: "/images/art/RatKnight_3.png", caption: "Final composition sketch, cleaning up the robe and gambeson underneath, and adding details to the hands" },
        { src: "/images/art/RatKnight_4.png", caption: "Flat color pass, locking in shapes and colors without doing shading or details yet" },
      ],
    },

    "glimmer": {
      src: "/images/art/Glimmer.png",
      alt: "Glimmer Character Art",
      label: "Illustration",
      caption:
        "Fanart of the character Glimmer from the animated series She-Ra and the Princesses of Power",
    },

    "entrapta": {
      src: "/images/art/Entrapta.png",
      alt: "Entrapta Character Art",
      label: "Character Practice",
      caption:
        "Fanart of the character Entrapta from the animated series She-Ra and the Princesses of Power",
    },

    "bounty-hunter": {
      src: "/images/art/Bounty Hunter_framed.png",
      alt: "Bounty Hunter Character Art",
      label: "Character Design",
      caption:
        "One of my characters from a role-playing game— a rat-turned-human-knight with a love of symphonic music",
      css: { desktop: "margin-top: 50px" },
      process: [
        { src: "/images/art/Bounty Hunter_lineArt.png", caption: "The line art design." },
      ],
    },

    "landscape": {
      src: "/images/art/Landscape_final.png",
      alt: "Landscape 2D Art",
      label: "Illustration",
      caption: "Digital painting based on a photo taken in Japan",
      css: { desktop: "margin-top: 50px" },
      process: [
        { src: "/images/art/Landscape_thumbnails.png", caption: "Thumbnails for different landscape concepts, focusing on simplifying details and exaggerating the core focus of each" },
      ],
    },

    "trixie": {
      src: "/images/art/Trixie_final.png",
      alt: "Trixie Poster",
      label: "Illustration",
      caption:
        "Fanart of My Little Pony, attempting to combine the show's cartoony, flat-color look with the style of vintage magic show posters",
      process: [
        { src: "/images/art/Trixie_alt.png", caption: "Alternate poster option, with less focus on the character and more emphasis on composition" },
        { src: "/images/art/Trixie_1.png", caption: "Initial thumbnails, where I rapidly roughed out different composition options" },
        { src: "/images/art/Trixie_2.png", caption: "Colored thumbnails, helping me ideate palette and values. I wanted to stay true to the original character's colors but exaggerate the yellows for more excitement" },
        { src: "/images/art/Trixie_3.png", caption: "I narrowed down the compositions I was most interested in and added some details and notes" },
        { src: "/images/art/Trixie_4.png", caption: "Final composition thumbnail, blocking out the face and creating a more active pose" },
        { src: "/images/art/Trixie_5.png", caption: "Flat colors, marking the final shapes and color palette" },
      ],
    },

    "little-mermaid": {
      src: "/images/art/TLM_KeyArt.png",
      alt: "The Little Mermaid Key Art",
      label: "Illustration",
      caption: "Key art from a reimagining of The Little Mermaid",
      process: [
        { src: "/images/art/TLM_Compositions.png", caption: "Initial composition sketches" },
        { src: "/images/art/TLM_Color.png", caption: "Color pass to block out the palette I wanted to use" },
        { src: "/images/art/TLM_InProgress.png", caption: "In-progress image— most elements drawn but not fully rendered" },
      ],
    },

    "bot": {
      src: "/images/art/Bot.png",
      alt: "Rusty Bot Painterly",
      label: "Illustration",
      caption:
        "Practice with a painterly art style, depicting a rusted robot inspired by the animated series She-Ra",
      process: [
        { src: "/images/art/Bot1.png", caption: "Initial thumbnail" },
        { src: "/images/art/Bot2.png", caption: "In-progress look, with most elements partially rendered" },
      ],
    },

    "mara": {
      src: "/images/art/Mara.png",
      alt: "Mara Character Art",
      label: "Illustration",
      caption: "Fanart of the character Mara from the animated series She-Ra",
      css: { desktop: "margin-top: 30px" },
    },

    "jade-winglet": {
      src: "/images/art/WoF_JadeWinglet.png",
      alt: "Wings of Fire Portraits",
      label: "Character Practice",
      caption:
        "Quick portrait studies from the book series Wings of Fire. I kept my lines loose for a more energetic, gestural style.",
      css: { mobile: "margin-top: 20px" },
      process: [
        { src: "/images/art/WoF_Refs.png", caption: "The graphic novel panels I referenced for my piece." },
      ],
    },

    "wof-designs": {
      hidden: true,
      src: "/images/art/WoF_Designs.png",
      alt: "Wings of Fire Designs",
      label: "Character Design",
      caption:
        "Dragon designs based on the book series Wings of Fire, reimagining the characters in a more stylized, graphic novel style.",
      process: [
        { src: "/images/art/HiveWings_Analysis.png", caption: "Source material breakdown and initial sketches for the HiveWing design." },
        { src: "/images/art/LeafWings_Refs.png", caption: "Variations of the LeafWing design to match different characters." },
      ],
    },

    /* ---------- 3D ---------- */

    "twilight-3d": {
      src: "/images/art/Twilight_winter_W.png",
      alt: "Twilight Sparkle 3D Model",
      label: "Modeling",
      caption:
        "3D model + render of Twilight Sparkle (My Little Pony), using a toon shader + black outline to evoke the style of the show.",
      process: [
        { src: "/images/art/Twilight_base.png", caption: "The model before textures, materials, and lighting were added." },
      ],
    },

    "vzero-env": {
      src: "/images/art/VZeroEnv.png",
      alt: "Glitch Environment 3D Model",
      label: "Environment",
      caption: "3D environment for a level in Version: Zero, my sci-fi roguelike",
      process: [
        { src: "/images/art/VZeroEnv_Glitch.png", caption: "Alternate glitched version of this level that appears during the final sequence" },
        { src: "/images/art/VZeroEnv.mp4", video: true, caption: "In-game appearance of the level" },
        { src: "/images/art/VZeroEnv_Glitch.mp4", video: true, caption: "Flythrough of the glitched level" },
      ],
    },

    "fdef-models": {
      src: "/images/art/FDef_Models.png",
      alt: "Flower Defense 3D Models",
      label: "Modeling",
      caption: "Low-poly 3D models for my tower defense game, Flower Defense",
    },

    "reya-walk": {
      src: "/images/art/Reya_3DWalk.mp4",
      video: true,
      poster: "/images/art/Reya_3DWalk_poster.png",
      label: "Animation",
      caption: "Walk cycle for the player character of Version: Zero, my sci-fi roguelike",
      process: [
        { src: "/images/art/Reya_2DConcepts.png", caption: "Initial character concepts" },
        { src: "/images/art/Reya_2DTurnaround.png", caption: "Front & side views for reference when modeling" },
        { src: "/images/art/Reya_3DWalk.png", caption: "Still image of the final 3D model" },
      ],
    },
  },
};
