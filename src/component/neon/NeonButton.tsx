import React from "react";
import { styled } from "@stitches/react";
import { useNavigate } from "react-router-dom";
import * as theme from "../../theme/theme";

const NeonBox = styled(theme.NeonHoverRed, {
  width: "180px",
  height: "60px",
  borderRadius: "50px",
  backgroundColor: "transparent",
  fontWeight: "bold",
  fontSize: "2.3rem",
  color: "Gray",
  marginLeft: "10px",
  marginRight: "10px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export function NeonButton(props: any) {
  const { text, viewPath } = props;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(viewPath);
  };
  return (
    <NeonBox onClick={handleClick}>
      {text}
    </NeonBox>
  );
}

/*
<button><p><
*/
