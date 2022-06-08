import React from "react";
import { styled } from "@stitches/react";
import { ViewTemplate } from "./viewTemplate";
import * as theme from "../theme/theme";

import { ContainerContents } from "../container/contentHome";

export function Home() {
  return (
    <ViewTemplate content={<ContainerContents />} />
  );
}

export default Home;
