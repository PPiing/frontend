import React from "react";
import { ViewTemplate } from "./viewTemplate";

import { ContainerContents } from "../container/contentHome";

export function Home() {
  return (
    <ViewTemplate content={<ContainerContents />} />
  );
}

export default Home;
