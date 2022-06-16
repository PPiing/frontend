import React from "react";
import { styled } from "@stitches/react";
import { ViewWrapper } from "./viewTemplate";
import * as theme from "../theme/theme";

import { ContainerContents } from "../container/contentLogin";

const LoginWapper = styled(ViewWrapper, {
  margin: "0",
  padding: "0",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "black"
});

export function Login() {
  return (
    <LoginWapper>
      <ContainerContents />
    </LoginWapper>
  );
}

export default Login;
