import React from "react";
import { ViewTemplate } from "./viewTemplate";

import { ContainerContents } from "../container/contentProfile";

export function Profile() {
  return (
    <ViewTemplate content={<ContainerContents />} />
  );
}

export default Profile;
