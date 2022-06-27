import React from "react";
import { styled } from "@stitches/react";
import * as theme from "../../../theme/theme";

const ProfileImage = styled(theme.ProfileImage, {
  width: "30%",
  height: "30%",
});

const ModalContentDiv = styled("div", {

});

export function ModalNavFriendBox(props: any) {
  const { friend } = props;
  return (
    <ModalContentDiv>
      <ProfileImage src={friend.img} />
    </ModalContentDiv>
  );
}
