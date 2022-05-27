// imports
import { createStitches, globalCss, styled, } from "@stitches/react";

// background color settings
export const BACKGROUND_BRICK = "url(../asset/background_brick.png)";
export const BACKGROUND_BLACK = "#191a1a";
export const BACKGROUND_YELLOW = "";
// export const BACKGROUND_YELLOW = "#fdc202";
export const BORDER_BASIC = "1px solid red";

// container sizes
export const NAV_TOP_HEIGHT = "10%";
export const NAV_BOTTOM_HEIGHT = "90%";
export const NAV_RIGHT_HEIGHT = "100%";

// community nav zone
export const NAV_ALARM_HEIGHT = "10%";
export const NAV_SEARCH_HEIGHT = "10%";
export const NAV_FRIEND_HEIGHT = "45%";
export const NAV_FRIEND_BOX_HEIGHT = "20%";
export const NAV_INVITE_HEIGHT = "35%";
export const NAV_INVITE_BOX_HEIGHT = "25%";

// neon color list
export const NEON_RED = "#FF0086";
export const NEON_BLU = "#00FFF0";
export const NEON_GRE = "#05FF00";

// fonts
export const NEONFONT_MARQUEE_MOON = "url(../asset/font/marquee_moon.ttf)";

// default neon hover event setting
export const NeonHoverRed = styled("div", {
  border: "3px solid gray",
  transition: "all 0.5s",
  filter: "drop-shadow(0 0 2px gray)",
  "&:hover": {
    border: `3px solid ${NEON_RED}`,
    color: `${NEON_RED}`,
    filter: `drop-shadow(0 0 2px ${NEON_RED}) brightness(1.6)`,
  },
});

// global style
export const globalStyles = globalCss({
  body: {
    margin: 0,
    background: "#151515",
    backgroundImage: BACKGROUND_BRICK,
  },
});

// size settings for several devices
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

export const { css } = createStitches({
  media: {
    mobile: theme.mobile,
    tabletS: theme.tabletS,
    tabletM: theme.tabletM,
    tabletL: theme.tabletL,
    laptop: theme.laptop,
    desktop: theme.desktop
  },
});
