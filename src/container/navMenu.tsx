import React from "react";
import { styled } from "@stitches/react";
import * as theme from "../theme/theme";
import { NeonButton } from "../component/neon/NeonButton";

const NavMenu = styled("div", {
  display: "flex",
  minHeight: "100px",
  height: `${theme.NAV_TOP_HEIGHT}`,
  justifyContent: "space-around",
  alignItems: "center",
});

const NavButtonObjects = [
  {
    text: "PLAY",
    className: "memuButton menuButtonPlay",
    neonColor: `${theme.NEON_RED}`,
    viewPath: "/game"
  },
  {
    text: "HOME",
    className: "memuButton menuButtonHome",
    neonColor: `${theme.NEON_BLU}`,
    viewPath: "/"
  },
  {
    text: "CHAT",
    className: "memuButton menuButtonChat",
    neonColor: `${theme.NEON_GRE}`,
    viewPath: "/chat"
  },
  {
    text: "WATCH",
    className: "memuButton menuButtonWatch",
    neonColor: `${theme.NEON_BLU}`,
    viewPath: "/watch"
  }
];

const renderNavButtons = () => {
  const navButtons: any = [];
  for (let i = 0; i < NavButtonObjects.length; i += 1) {
    navButtons.push(
      <NeonButton
        key={i}
        text={NavButtonObjects[i].text}
        className={NavButtonObjects[i].className}
        neonColor={NavButtonObjects[i].neonColor}
        viewPath={NavButtonObjects[i].viewPath}
      />
    );
  }
  return navButtons;
};

export function ContainerNavMenu() {
  return (
    <NavMenu className="navMenu">
      {renderNavButtons()}
    </NavMenu>
  );
}
