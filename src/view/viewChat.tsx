import React from "react";
import { ViewTemplate } from "./viewTemplate";

import { ContainerContents } from "../container/contentChat";

export function Chat() {
  return (
    <ViewTemplate content={<ContainerContents />} />
  );
}

export default Chat;
