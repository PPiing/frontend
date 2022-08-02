import React from "react";
import { styled } from "@stitches/react";
import * as theme from "../../theme/theme";
import * as template from "./navBoxTemplate";
import { StatusDisplayDistributor } from "../../feat/profile/utils";
import { ModalNavFriendBox } from "../modal/modalNavFriendBox";

export function ComponentNavSearchUserBox(props: any) {
  const setStatusColor = (status:string) => {
    if (status === "online") return ("#00d100");
    if (status === "offline") return ("grey");
    if (status === "in game") return ("yellow");
    return ("red");
  };

  const { searchUser } = props;

  const statusColor:string = setStatusColor(StatusDisplayDistributor(searchUser.userStatus));
  return (
    <template.NavBox>
      <template.ProfileImage
        src={`${window.location.origin}${searchUser.userImage}`}
        className="profile"
      />
      <template.Profile>
        <template.ProfileName> {searchUser.nickName} </template.ProfileName>
        {/* <template.Status> */}
        {/* <template.StatusCircle style={{ backgroundColor: statusColor }} /> */}
        <template.StatusMessage>
          {StatusDisplayDistributor(searchUser.userStatus)}
        </template.StatusMessage>
        {/* </template.Status> */}
      </template.Profile>
    </template.NavBox>
  );
}
