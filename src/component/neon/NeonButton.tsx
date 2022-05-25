import React from "react";
import { styled } from "@stitches/react";
import * as theme from "../../theme/theme";

const NeonBox = styled("button", {
  width: "156px",
  height: "60px",
  border: "3px solid gray",
  borderRadius: "50px",
  transition: "all 0.5s",
  backgroundColor: "transparent",
  fontWeight: "bold",
  fontSize: "2.3rem",
  color: "Gray",
  marginLeft: "10px",
  marginRight: "10px",
  "&:hover": {
    border: `3px solid ${theme.NEON_RED}`,
    color: `${theme.NEON_RED}`,
    filter: `drop-shadow(0 0 20px ${theme.NEON_RED}) drop-shadow(0 0 60px ${theme.NEON_RED}) brightness(2)`,
  },
});
export function NeonButton(props: any) {
  const { text } = props;
  return (
    <NeonBox>
      {text}
    </NeonBox>
  );
}

/*
<button><p><
*/
