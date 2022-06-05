// imports
import { createStitches, globalCss, styled, } from "@stitches/react";

//
// *****************************************************************************
// design settings
// *****************************************************************************
//
// background color settings
export const BACKGROUND_BRICK = "url(../asset/background_brick.png)";
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
// Nav bar settings starts
// *****************************************************************************
//
// nav icons
export const ICON_LINK_HOME = "url(../asset/neon_icon_home.png)";
export const ICON_LINK_CHAT = "url(../asset/neon_icon_chat.png)";
export const ICON_LINK_GAME = "url(../asset/neon_icon_game.png)";
export const ICON_LINK_WATCH = "url(../asset/neon_icon_watch.png)";

export const ICON_DEFAULT = styled("img", {
  width: "25%",
});

// container size
export const NAV_TOP_HEIGHT = "10%";
export const NAV_BOTTOM_HEIGHT = "90%";
export const NAV_LEFT_HEIGHT = "100%";

export const ContainerLeftBox = styled("div", {
  width: "calc(80vw - 40px)",
  height: "calc(100vh - 40px)",
  padding: "20px",
  overflaw: "hidden",
  backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(../asset/background_space.jpeg)",
  backgroundSize: "cover",
});

export const ContainerRightBox = styled("div", {
  width: "calc(20vw - 40px)",
  minWidth: "300px",
  height: "calc(100vh - 40px)",
  padding: "20px",
  overflaw: "hidden",
  borderLeft: "3px solid white",
  boxShadow: "0 0 0.8rem #fff, 0 0 1.1rem #ffffff50,",
});

export const ViewWrapper = styled("div", {
  display: "flex",
  flexDirection: "row",
  width: "100vw",
  height: "100vh",
  overflaw: "hidden",
});

// community nav zone
export const NAV_ALARM_HEIGHT = "10%";
export const NAV_SEARCH_HEIGHT = "10%";
export const NAV_FRIEND_HEIGHT = "45%";
export const NAV_FRIEND_BOX_HEIGHT = "20%";
export const NAV_INVITE_HEIGHT = "35%";
export const NAV_INVITE_BOX_HEIGHT = "25%";

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
  filter: "drop-shadow(0 0 2px gray)",
  "&:hover": {
    border: `3px solid ${NEON_RED}`,
    color: `${NEON_RED}`,
    filter: `drop-shadow(0 0 2px ${NEON_RED}) brightness(1.6)`,
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

//
// *****************************************************************************
// Content template
// *****************************************************************************
//
// content templates
export const Contents = styled(NeonHoverRed, {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: NEON_RED,
  height: `calc(${NAV_LEFT_HEIGHT})`,
  borderRadius: "50px",
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
