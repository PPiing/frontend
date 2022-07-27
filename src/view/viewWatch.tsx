import React from "react";
import { ViewTemplate } from "./viewTemplate";

import { ContainerContents } from "../container/contentWatch";

export function Watch() {
  return (
    <ViewTemplate content={<ContainerContents />} />
  );
}

export default Watch;
