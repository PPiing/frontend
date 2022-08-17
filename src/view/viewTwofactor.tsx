import React from "react";
import { styled } from "@stitches/react";
import { useSelector } from "react-redux";
import { ViewWrapper } from "./viewTemplate";

// eslint-disable-next-line import/no-unresolved
import { ContainerContents } from "../container/contentTwoFactor";
import { ReducerType } from "../redux/rootReducer";
import { AuthData } from "../redux/slices/auth";

const TwofactorWrapper = styled(ViewWrapper, {
  margin: "0",
  padding: "0",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "black"
});

export function Twofactor() {
  return (
    <TwofactorWrapper>
      <ContainerContents />
    </TwofactorWrapper>
  );
}

export default Twofactor;
