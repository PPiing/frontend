// imports
import { createStitches, globalCss, } from "@stitches/react";

//
// *****************************************************************************
// design settings
// *****************************************************************************
//
// background color settings
export const BACKGROUND_BRICK = "url(/asset/background_brick.png)";
export const BACKGROUND_BLACK = "#191a1a";
export const BACKGROUND_YELLOW = "";
export const BORDER_BASIC = "1px solid red";

// neon color list
export const NEON_RED = "#FF0086";
export const NEON_BLU = "#00FFF0";
export const NEON_GRE = "#05FF00";

// fonts
export const NEONFONT_MARQUEE_MOON = "url(../asset/font/marquee_moon.ttf)";

//
// *****************************************************************************
// Tier Color settings
// *****************************************************************************
//

const TIER_NOOB_COLOR = "rgba(117, 249, 76)";
const TIER_NOOB_TEXT = "noob";
const TIER_PRO_COLOR = "#83EEFF";
const TIER_PRO_TEXT = "pro";
const TIER_HACKER_COLOR = "rgba(235, 51, 79)";
const TIER_HACKER_TEXT = "hacker";
const TIER_GOD_COLOR = "rgba(255, 255, 255)";
const TIER_GOD_TEXT = "god";
export const TIER_COLOR = new Map();
TIER_COLOR.set(TIER_NOOB_TEXT, TIER_NOOB_COLOR);
TIER_COLOR.set(TIER_PRO_TEXT, TIER_PRO_COLOR);
TIER_COLOR.set(TIER_HACKER_TEXT, TIER_HACKER_COLOR);
TIER_COLOR.set(TIER_GOD_TEXT, TIER_GOD_COLOR);

//
// *****************************************************************************
// Nav bar settings
// *****************************************************************************
//
// nav icons
export const ICON_LINK_HOME = "url(../asset/neon_icon_home.png)";
export const ICON_LINK_CHAT = "url(../asset/neon_icon_chat.png)";
export const ICON_LINK_GAME = "url(../asset/neon_icon_game.png)";
export const ICON_LINK_WATCH = "url(../asset/neon_icon_watch.png)";

// container size
export const NAV_TOP_HEIGHT = "10%";
export const NAV_BOTTOM_HEIGHT = "90%";
export const NAV_LEFT_HEIGHT = "100%";

// community nav zone
export const NAV_ALARM_HEIGHT = "12%";
export const NAV_SEARCH_HEIGHT = "5%";
export const NAV_FRIEND_HEIGHT = "48%";
export const NAV_FRIEND_BOX_HEIGHT = "20%";
export const NAV_INVITE_HEIGHT = "35%";
export const NAV_INVITE_BOX_HEIGHT = "25%";

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

export const Hr = styled("hr", {
  border: "1px solid transparent",
  marginTop: "-5px",
  marginBottom: "20px",
});

//
// *****************************************************************************
// Design template
// *****************************************************************************
//
// default neon hover event setting
export const NeonHoverRed = styled("div", {
  border: "3px solid gray",
  transition: "all 0.5s",
  "&:hover": {
    border: `3px solid ${NEON_RED}`,
    filter: "brightness(0.8)",
  },
});

// default neon event setting for game Zone
export const NeonZone = styled("div", {
  border: "3px solid gray",
  transition: "all 0.5s",
  filter: "drop-shadow(0 0 2px gray)",
  // "&:hover": {
  //   border: `3px solid ${NEON_RED}`,
  //   color: `${NEON_RED}`,
  //   filter: `drop-shadow(0 0 2px ${NEON_RED}) brightness(1.6)`,
  // },
});

export const ProfileImage = styled("img", {
  width: "auto",
  height: "80%",
  padding: "0%",
  margin: "0%",
  marginLeft: "10px",
  border: "none",
  borderRadius: "50%",
});

//
// *****************************************************************************
// global style && reactive
// *****************************************************************************
//
// global style
export const globalStyles = globalCss({
  body: {
    margin: 0,
    background: "#151515",
  },
});
