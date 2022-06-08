import React from "react";
import { styled } from "@stitches/react";
import { ViewTemplate } from "./viewTemplate";
import * as theme from "../theme/theme";

import { ContainerContents } from "../container/contentProfile";

export function Profile() {
  return (
    <ViewTemplate content={<ContainerContents />} />
  );
}

export default Profile;
