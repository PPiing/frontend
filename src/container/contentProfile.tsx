import React from "react";
import { styled } from "@stitches/react";
import { Routes, Route, useParams } from "react-router-dom";
import * as template from "./contentTemplate";
import * as theme from "../theme/theme";

const Contents = styled(template.Contents, {

});

const ProfileTop = styled("div", {
  borderBottom: "3px solid white",
  width: "100%",
  height: "30%"
});

function ContentProfile() {
  const { userId } = useParams();
  return (
    <Contents>
      <ProfileTop>profile: {userId}</ProfileTop>
    </Contents>
  );
}

export function ContainerContents() {
  return (
    <ContentProfile />
  );
}
