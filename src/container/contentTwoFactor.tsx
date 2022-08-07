import React from "react";
import { keyframes } from "@stitches/react";
import * as theme from "../theme/theme";
// import { styled } from "../theme/theme";

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

const TwofactorSpace = theme.styled("div", {
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
  transition: "all 0.5s",
  "&": {},
  "&:before": {
    content: "",
    position: "absolute",
    height: "220%",
    width: "220%",
    background: "conic-gradient(#fd004c,#fe9000,#fff020,#3edf4b,#3363ff,#b102b7,#fd004c)",
    left: "-60%",
    top: "-60%",
    animation: `${Spin} 1.75s infinite`,
  },
  "&:after": {
    padding: "0",
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

const TmpSpace = theme.styled("div", {
  transition: "all 0.5s",
  zIndex: "1",
  textAlign: "center",
  "@tabletS": {
    // display: "none"
  }
});

const String1 = theme.styled("p", {
  transition: "all 0.5s",
  margin: "0",
  fontWeight: "bold",
  fontStyle: "italic",
  color: "transparent",
  backgroundImage: "conic-gradient(#fd004c91,#fe900091,#fff02091,#3edf4b91,#3363ff91,#b102b791,#fd004c91)",
  backgroundClip: "text",
  animation: `${FontSpin} 7s infinite`,
  "-webkit-text-stroke": "3px white",
  fontSize: "180px",
  "@desktop": {
    "-webkit-text-stroke": "2.6px white",
    fontSize: "140px",
  },
  "@laptop": {
    "-webkit-text-stroke": "2.0px white",
    fontSize: "110px",
  },
  "@tabletL": {
    "-webkit-text-stroke": "1.6px white",
    fontSize: "90px",
  },
  "@mobile": {
    "-webkit-text-stroke": "1px white",
    fontSize: "75px",
  },
});

const String2 = theme.styled("p", {
  transition: "all 0.5s",
  margin: "0",
  fontWeight: "bold",
  fontStyle: "italic",
  color: "transparent",
  backgroundImage: "conic-gradient(red, orange, yellow, green, blue, purple, red)",
  backgroundClip: "text",
  "-webkit-text-stroke": "5px white",
  animation: `${FontSpin} 7s infinite`,
  marginTop: "-120px",
  fontSize: "330px",
  "@desktop": {
    "-webkit-text-stroke": "4px white",
    fontSize: "280px",
    marginTop: "-90px",
  },
  "@laptop": {
    "-webkit-text-stroke": "3px white",
    fontSize: "220px",
    marginTop: "-60px",
  },
  "@tabletL": {
    "-webkit-text-stroke": "2px white",
    fontSize: "160px",
    marginTop: "-50px",
  },
  "@mobile": {
    "-webkit-text-stroke": "2px white",
    fontSize: "130px",
    marginTop: "-40px",
  },
});

const ButtonLogin = theme.styled("button", {
  padding: "0",
  borderRadius: "100px",
  background: "none",
  fontWeight: "bold",
  zIndex: "10",
  cursor: "pointer",
  color: "white",
  transition: "all 0.5s",
  fontSize: "1.8rem",
  width: "11rem",
  height: "3.5rem",
  border: "0.1rem solid #FF0086",
  textShadow: "0 0 0 0.3rem hsl(0 0% 100% / 0.3), 0 0 0.4em currentColor",
  boxShadow: "inset 0 0 0.7em #FF0086",
  "&:hover": {
    backgroundColor: "#FF0086",
    color: "black",
  },
  "@desktop": {
    fontSize: "1.5rem",
    width: "9.5rem",
    height: "3rem",
    border: "0.07rem solid #FF0086",
    textShadow: "0 0 0 0.07rem hsl(0 0% 100% / 0.3), 0 0 0.4em currentColor",
    boxShadow: "inset 0 0 0.7em #FF0086",
  },
  "@laptop": {
    fontSize: "1.3rem",
    width: "8rem",
    height: "2.5rem",
    border: "0.07rem solid #FF0086",
    textShadow: "0 0 0 0.07rem hsl(0 0% 100% / 0.3), 0 0 0.4em currentColor",
    boxShadow: "inset 0 0 0.7em #FF0086",
  },
  "@tabletL": {
    fontSize: "1.1rem",
    width: "7rem",
    height: "2rem",
    border: "0.07rem solid #FF0086",
    textShadow: "0 0 0 0.07rem hsl(0 0% 100% / 0.3), 0 0 0.4em currentColor",
    boxShadow: "inset 0 0 0.7em #FF0086",
  },
  "@mobile": {
    fontSize: "0.9rem",
    width: "5rem",
    height: "1.7rem",
    border: "0.07rem solid #FF0086",
    textShadow: "0 0 0 0.07rem hsl(0 0% 100% / 0.3), 0 0 0.4em currentColor",
    boxShadow: "inset 0 0 0.7em #FF0086",
  },
});

const ButtonLogin2 = theme.styled(ButtonLogin, {
  marginLeft: "17px"
});

export function ContainerContents() {
  const logIn = () => {
    window.location.href = "/api/auth/login";
  };
  return (
    <TwofactorSpace>
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
    </TwofactorSpace>
  );
}
