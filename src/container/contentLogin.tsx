import React from "react";
import { styled, keyframes } from "@stitches/react";
import * as theme from "../theme/theme";

const Spin = keyframes({
  "100%": {
    transform: "rotate(360deg)"
  }
});

const FontSpin = keyframes({
  from: {
    filter: "hue-rotate(0deg)",
  },
  to: {
    filter: "hue-rotate(-360deg)",
  }
});

const LoginSpace = styled("div", {
  backgroundImage: "url(/asset/background_neon_retro.jpeg)",
  width: "90%",
  height: "90%",
  borderRadius: "100px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  transform: "translate(-50%, -50%)",
  position: "absolute",
  top: "50%",
  left: "50%",
  boxShadow: "0 20px 35px rgba(0, 0, 0, 0.3)",
  overflow: "hidden",
  "&": {},
  "&:before": {
    content: "",
    position: "absolute",
    height: "220%",
    width: "220%",
    background: "conic-gradient(#fd004c,#fe9000,#fff020,#3edf4b,#3363ff,#b102b7,#fd004c)",
    left: "-60%",
    top: "-60%",
    animation: `${Spin} 1.5s infinite`,
  },
  "&:after": {
    padding: "0",
    margin: "0",
    borderRadius: "100px",
    boxSizing: "border-box",
    content: "",
    position: "absolute",
    backgroundColor: "#ffffff80",
    backgroundImage: "url(/asset/background_neon_retro.jpeg)",
    backgroundSize: "cover",
    height: "calc(100% - 10px)",
    width: "calc(100% - 10px)",
    top: "",
    left: "",
    // opacity: "0.5",
  },
});

const TmpSpace = styled("div", {
  zIndex: "100",
  textAlign: "center",
});

const String1 = styled("p", {
  fontSize: "9rem",
  fontWeight: "bold",
  fontStyle: "italic",
  color: "transparent",
  backgroundImage: "conic-gradient(#fd004c86,#fe900086,#fff02086,#3edf4b86,#3363ff86,#b102b786,#fd004c86)",
  "-webkit-background-clip": "text",
  animation: `${FontSpin} 10s infinite`,
});

const String2 = styled("p", {
  fontSize: "17rem",
  marginTop: "-14rem",
  fontWeight: "bold",
  fontStyle: "italic",
  color: "transparent",
  //   backgroundImage: "conic-gradient(#fd004c,#fe9000,#fff020,#3edf4b,#3363ff,#b102b7,#fd004c)",
  backgroundImage: "conic-gradient(red, orange, yellow, green, blue, purple, red)",
  "-webkit-background-clip": "text",
  animation: `${FontSpin} 10s infinite`,
});

const ButtonLogin = styled("button", {
  margin: "0",
  padding: "0",
  marginTop: "-11500rem",
  borderRadius: "100px",
  border: "4px solid #FF0086",
  background: "none",
  color: "white",
  width: "11rem",
  height: "3.7rem",
  fontSize: "1.8rem",
  fontWeight: "bold",
//   fontStyle: "italic",
});

const ButtonLogin2 = styled(ButtonLogin, {
  marginLeft: "17px",
});

export function ContainerContents() {
  const logIn = () => {
    window.location.href = "/api/auth/42";
  };
  return (
    <LoginSpace>
      <TmpSpace>
        <String1>Ping Pong</String1>
        <String2>3D</String2>
        <ButtonLogin onClick={logIn}>
          42 LOGIN
        </ButtonLogin>
        <ButtonLogin2 onClick={logIn}>
          GUEST
        </ButtonLogin2>
      </TmpSpace>
    </LoginSpace>
  );
}
