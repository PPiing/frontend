import { createStitches, globalCss } from "@stitches/react";

export const BACKGROUND_BRICK = "url(../asset/background_brick.png)";
export const BACKGROUND_BLACK = "#191a1a";
export const BACKGROUND_YELLOW = "#fdc202";
export const BORDER_BASIC = "1px solid red";

//
export const NAVTOP_HEIGHT = "10%";
export const NAVBOTTOM_HEIGHT = "90%";
export const NAVRIGHT_HEIGHT = "100%";

// community nav zone
export const NAVALARM_HEIGHT = "20%";
export const NAVSEARCH_HEIGHT = "12%";
export const NAVFRIEND_HEIGHT = "40%";
export const NAVFRIENDBOX_HEIGHT = "10%";
export const NAVINVITE_HEIGHT = "28%";

export const NEON_RED = "#FF0086";
export const NEON_BLU = "#00FFF0";
export const NEON_GRE = "#05FF00";

export const NEONFONT_MARQUEE_MOON = "url(../asset/font/marquee_moon.ttf)";

export const globalStyles = globalCss({
  body: {
    margin: 0,
    // backgroundImage: BACKGROUND_BRICK,
    background: "black",
  },
});

const size = {
  mobile: "770px",
  tabletS: "1023px",
  tabletM: "1220px",
  tabletL: "1280px",
  laptop: "1460px",
  desktop: "1700px"
};

const theme = {
  mobile: `(max-width: ${size.mobile})`,
  tabletS: `(max-width: ${size.tabletS})`,
  tabletM: `(max-width: ${size.tabletM})`,
  tabletL: `(max-width: ${size.tabletL})`,
  laptop: `(max-width: ${size.laptop})`,
  desktop: `(max-width: ${size.desktop})`
};

export const { styled, css } = createStitches({
  media: {
    mobile: theme.mobile,
    tabletS: theme.tabletS,
    tabletM: theme.tabletM,
    tabletL: theme.tabletL,
    laptop: theme.laptop,
    desktop: theme.desktop
  },
});
