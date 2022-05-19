import React from "react";
import { styled } from "@stitches/react";

const ComponentNeonButton = styled("button", {
  fontFamily: "Marquee Moon",
  fontSize: "3.5rem",
  fontWeight: "bold",
  color: "White",
  textShadow: "0 0 5px #fff, 0 0 10px #fff, 0 0 15px #0073e6, 0 0 20px #0073e6, 0 0 25px #0073e6",
  backgroundColor: "transparent",
  boxShadow: "0 0 5px #fff, 0 0 10px #fff, 0 0 15px #0073e6, 0 0 20px #0073e6, 0 0 25px #0073e6",
  borderRadius: "15px",
  marginTop: "1vh",
  height: "5rem",
  width: "12rem",
});

export function NeonButton(props: any) {
  const { text } = props;
  return (
    <ComponentNeonButton>
      {text}
    </ComponentNeonButton>
  );
}
