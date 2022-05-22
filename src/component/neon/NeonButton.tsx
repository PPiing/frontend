import React from "react";
import { styled } from "@stitches/react";
import { NEON_RED } from "../../theme/theme";

const NeonDiv = styled("div", {
  width: "158px",
  height: "48px",
  boxSizing: "border-box",
  position: "relative",
  cursor: "pointer",
});

const NeonBox = styled("div", {
  width: "156px",
  height: "46px",
  border: `3px solid ${NEON_RED}`,
  borderRadius: "50px",
  position: "absolute",
  transition: "all 0.5s",
  "&:hover": {
    background: NEON_RED,
  },
});

const NeonBoxBlur = styled("div", {
  width: "156px",
  height: "46px",
  border: `3px solid ${NEON_RED}`,
  borderRadius: "50px",
  position: "absolute",
  filter: "blur(5px)",
  transition: "all 0.5s",
  "&:hover": {
    background: NEON_RED,
  },
});

const NeonText = styled("div", {
  color: NEON_RED,
  fontWeight: "bold",
  fontSize: "2.3rem",
  textAlign: "center",
  transition: "all 0.5s",
  "&:hover": {
    color: "White",
  },
});

const NeonTextBlur = styled("div", {
  color: NEON_RED,
  fontWeight: "bold",
  fontSize: "2.3rem",
  textAlign: "center",
  filter: "blur(5px)",
  transition: "all 0.5s",
  "&:hover": {
    color: "White",
  },
});

export function NeonButton(props: any) {
  const { text } = props;
  return (
    <NeonDiv>
      <NeonBoxBlur>
        <NeonTextBlur>
          {text}
        </NeonTextBlur>
      </NeonBoxBlur>
      <NeonBox>
        <NeonText>
          {text}
        </NeonText>
      </NeonBox>
    </NeonDiv>
  );
}
