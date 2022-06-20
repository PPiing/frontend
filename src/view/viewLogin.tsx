import React from "react";
import { styled } from "@stitches/react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { ViewWrapper } from "./viewTemplate";

import { ContainerContents } from "../container/contentLogin";
import { ReducerType } from "../redux/rootReducer";
import { AuthData } from "../redux/slices/auth";

const LoginWapper = styled(ViewWrapper, {
  margin: "0",
  padding: "0",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "black"
});

export function Login() {
  const auth = useSelector<ReducerType, AuthData>((state) => state.auth);

  if (auth.auth || (auth.auth && auth.auth2f && auth.isRequire2f)) {
    return (<Navigate replace to="/home" />);
  }

  return (
    <LoginWapper>
      <ContainerContents />
    </LoginWapper>
  );
}

export default Login;
