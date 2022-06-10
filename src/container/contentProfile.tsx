import React from "react";
import { styled } from "@stitches/react";
import { Routes, Route, useParams } from "react-router-dom";
import * as template from "./contentTemplate";
import * as theme from "../theme/theme";

const Contents = styled(template.Contents, {

});

function ContentProfile() {
  const { userId } = useParams();
  return (<Contents>profile: {userId}</Contents>);
}

export function ContainerContents() {
  return (
    <ContentProfile />
  );
}
