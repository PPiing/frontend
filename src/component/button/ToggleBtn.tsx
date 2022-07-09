import { styled } from "@stitches/react";
import "./Toggle.css"

import * as theme from "../../theme/theme";

const Label = styled("label", {
  width: "300px",
  height: "55px",
  backgroundColor: theme.BACKGROUND_BLACK,
  borderRadius: "70px",
  alignItems: "center",
  padding: "2px",
  display: "flex",
  position: "relative",
  zIndex: "1"
})

const InvisibleCheckBox = styled("input", {
  opacity: "0",
  position: "absolute",

})

const Active = styled("div", {
  padding: 0,
  margin: 0,
  width: "50%",
  height: "55px",
  borderRadius: "70px",
  backgroundColor: theme.NEON_RED,
  position: "absolute",
  transition: "transform 0.19s linear",
  zIndex: "-1"
})

const ToggleContainer = styled("div", {
  padding: "2em",
  display: "flex",
  justifyContent: "center"
})

function Toggle(props : any) {
  const { selection1, selection2 } = props;

  console.log()

  return (
    <ToggleContainer className="toggle">
      <InvisibleCheckBox id="checkbox" type="checkbox" />
      <Label id="label" htmlFor="checkbox">
        <div id="brief">
          {selection1}
        </div>
        <div id="specize">
          {selection2}
        </div>
        <Active id="activetoggle" />
      </Label>
    </ToggleContainer>
  );
}

export default Toggle;
