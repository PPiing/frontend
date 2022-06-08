import React from "react";
import { styled } from "@stitches/react";
import * as theme from "../theme/theme";

const LoginWapper = styled("button", {
  margin: "0",
  padding: "0",
  width: "100vw",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "Aqua"
});

const ButtonLogin = styled("button", {
  margin: "0",
  padding: "0",
  width: "300px",
  height: "100px",
});

export function Login() {
  const logIn = () => {
    window.location.href = "https://bongcheonmountainclub.iptime.org/api/auth/42";
  };

  return (
    <LoginWapper>
      <div>
        로그인을 누르지 마시옹 젭알
      </div>
      <ButtonLogin onClick={logIn}>
        L o g I n
      </ButtonLogin>
    </LoginWapper>
  );
}

export default Login;
