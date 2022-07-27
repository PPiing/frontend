import { styled } from "@stitches/react";
import "./ToolTip.css"
import * as theme from "../../theme/theme";

export function ToolTip(props: any) {
  const { content } = props;
  return (
    <div className="myToolTipText">
      {content}
    </div>
  );
}
