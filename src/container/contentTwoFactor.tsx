import React, { useState } from "react";
import { keyframes } from "@stitches/react";
import * as theme from "../theme/theme";
import { sendAuthCode } from "../network/api/axios.custom";
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

const ButtonInput = theme.styled("input", {
  padding: "0",
  height: "2.3vw",
  width: "2.3vw",
  // width: "10vw",
  // letterSpacing: "0.1vw",
  margin: "0.2vw",
  textAlign: "center",
  fontSize: "1.3vw",
  fontWeight: "bold",
  background: "none",
  border: "0.1rem solid #FF0086",
  boxShadow: "inset 0 0 0.7em #FF0086",
  color: "white",
});

const ButtonLogin = theme.styled("button", {
  padding: "0",
  margin: "0",
  borderRadius: "100px",
  background: "none",
  zIndex: "10",
  cursor: "pointer",
  color: "white",
  transition: "all 0.5s",
  border: "0.1rem solid #FF0086",
  boxShadow: "inset 0 0 0.7em #FF0086",
  fontSize: "1.35vw",
  width: "43vw",
  height: "3vw",
  fontWeight: "300",
  textShadow: "0 0 1px white",
  "&:hover": {
    backgroundColor: "#FF0086",
    color: "black",
    textShadow: "0 0 1px black",
  },
});

export function ContainerContents() {
  const [Input1, setInput1] = useState("");
  const [Input2, setInput2] = useState("");
  const [Input3, setInput3] = useState("");
  const [Input4, setInput4] = useState("");
  const [SendResult, setSendResult] = useState(<>.</>);

  function onChangeInput(e: any, setInput: any) {
    setInput(e.target.value.replace(/[^0-9]/g, ""));
  }

  function onEnterPress(e: any) {
    if (e.key === "Enter") {
      const code = Input1 + Input2 + Input3 + Input4;
    }
  }

  const logIn = () => {
    sendAuthCode().then((response) => {
      console.log(response);
    })

    // setSendResult(<div />);
  };

  return (
    <TwofactorSpace>
      <TmpSpace>
        <String1>Ping Pong</String1>
        <String2>3D</String2>

        <ButtonLogin onClick={logIn}>
          <b>Click here</b> to send 4-digit verification code to registered e-mail.
        </ButtonLogin>
        {SendResult}
        <br /><br />
        <pre style={{ fontSize: "1.5vh", textAlign: "center", color: "white", }}>
          Input 4-Digit Code to below Text box and press ENTER button to check.<br />
          <b style={{ fontSize: "2vh", }}>Numberic Only!</b>
        </pre>
        <ButtonInput maxLength={1} inputMode="numeric" type="text" value={Input1} onChange={(e) => onChangeInput(e, setInput1)} onKeyPress={(e) => onEnterPress(e)} />
        <ButtonInput maxLength={1} inputMode="numeric" type="text" value={Input2} onChange={(e) => onChangeInput(e, setInput2)} onKeyPress={(e) => onEnterPress(e)} />
        <ButtonInput maxLength={1} inputMode="numeric" type="text" value={Input3} onChange={(e) => onChangeInput(e, setInput3)} onKeyPress={(e) => onEnterPress(e)} />
        <ButtonInput maxLength={1} inputMode="numeric" type="text" value={Input4} onChange={(e) => onChangeInput(e, setInput4)} onKeyPress={(e) => onEnterPress(e)} />
      </TmpSpace>
    </TwofactorSpace>
  );
}
