import React from "react";
import { styled } from "@stitches/react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { ReducerType } from "../redux/rootReducer";
import { AuthData } from "../redux/slices/auth";

import { ContainerNavMenu } from "../container/navMenu";
import { ContainerNavCommunity } from "../container/navCommunity";

export const ContainerLeftBox = styled("div", {
  width: "calc(80% - 40px)",
  height: "calc(100% - 40px)",
  padding: "20px",
  backgroundSize: "cover",
});

export const ContainerRightBox = styled("div", {
  width: "calc(20% - 40px)",
  height: "calc(100% - 40px)",
  padding: "20px",
  boxShadow: "0 0 0.8rem #fff, 0 0 1.1rem #ffffff50,",
});

export const ViewWrapper = styled("div", {
  display: "flex",
  flexDirection: "row",
  width: "100vw",
  height: "100vh",
  overflow: "hidden",
});

export function ViewTemplate({ content } : any) {
  const auth = useSelector<ReducerType, AuthData>((state) => state.auth);

  // test
  console.log("in viewTemplate: ", auth);
  if (!auth.auth || (auth.isRequire2f && !auth.auth2f)) {
    return (<Navigate replace to="/login" />);
  }

  return (
    <ViewWrapper className="view">
      <ContainerLeftBox>
        {content}
      </ContainerLeftBox>
      <ContainerRightBox>
        <ContainerNavMenu />
        <ContainerNavCommunity />
      </ContainerRightBox>
    </ViewWrapper>
  );
}

export default ViewTemplate;
