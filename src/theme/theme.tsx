import { createStitches } from "@stitches/react";

export const BACKGROUND_BLACK = "#191a1a";
export const BACKGROUND_YELLOW = "#fdc202";
export const BORDER_BASIC = "1px solid red";
export const NAVTOP_HEIGHT = "10vh";
export const NAVRIGHT_WIDTH = "20vw";
export const NAVFRIEND_HEIGHT = "7vh";

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
