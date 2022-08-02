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
export const TIER = {
  lol:
  { name: "개못핵",
    color: "#000000",
    minMMR: null,
    maxMMR: -50 },
  iron:
  { name: "iron",
    color: "#A4A4A4",
    minMMR: -50,
    maxMMR: 150 },
  gold:
  { name: "gold",
    color: "#FFFF00",
    minMMR: 150,
    maxMMR: 300 },
  master:
  { name: "master",
    color: "#FF4000",
    minMMR: 300,
    maxMMR: 500 },
  challenger:
  { name: "challenger",
    color: "#00FFFF",
    minMMR: 500,
    maxMMR: 1000 },
  god:
  { name: "god",
    color: "#FFFFFF",
    minMMR: 1000,
    maxMMR: null },
};

export function getTierColor(mmr: number) {
  if (mmr > TIER.god.minMMR) {
    return (TIER.god);
  }
  if (mmr > TIER.challenger.minMMR) {
    return (TIER.challenger);
  }
  if (mmr > TIER.master.minMMR) {
    return (TIER.master);
  }
  if (mmr > TIER.gold.minMMR) {
    return (TIER.gold);
  }
  if (mmr > TIER.iron.minMMR) {
    return (TIER.iron);
  }
  return (TIER.lol);
}

export function getTierPercent(mmr: number) {
  const tier = getTierColor(mmr);
  if (tier.minMMR === null) {
    return (100);
  }
  if (tier.maxMMR === null) {
    return (100);
  }
  // eslint-disable-next-line no-unreachable, consistent-return, no-mixed-operators, max-len
  return (Math.floor((mmr - (tier.minMMR < 0 ? 0 : tier.minMMR)) / (tier.maxMMR - tier.minMMR) * 100));
}

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
  border: "2px solid #424242",
  boxShadow: "0px 0px 5px #424242",
  transition: "all 0.5s",
  overflow: "hidden",
  "&:hover": {
    border: `2px solid ${NEON_RED}`,
    boxShadow: `0px 0px 10px ${NEON_RED}`,
    filter: "brightness(1.3)",
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
  padding: "0%",
  margin: "0%",
  marginLeft: "10px",
  border: "none",
  borderRadius: "50%",
  aspectRatio: 1,
});

//
// *****************************************************************************
// modal style && template comment
// *****************************************************************************
//
export const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  height: "auto",
  bgcolor: "black",
  border: "2px solid #000",
  color: "white",
  p: 4,
  boxShadow: "0 0 10px #fff",
  overflow: "hidden"
};

/*
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const style = theme.modalStyle;
const [open, setOpen] = useState(false);
const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);

<Button onClick={handleOpen}>Open modal</Button>
<Modal
  open={open}
  onClose={handleClose}
>
  <Box sx={style} component="div">
    <div>{content}</div>
  </Box>
</Modal>
*/

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
