import React from "react";
import { styled } from "@stitches/react";
import * as template from "./contentTemplate";
import * as theme from "../theme/theme";

const Contents = styled(template.Contents, {

});

export function ContainerContents() {
  return (
    <Contents className="contents">
      Chat
    </Contents>
  );
}
