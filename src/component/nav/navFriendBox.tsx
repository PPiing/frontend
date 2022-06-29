import React from "react";
import { styled } from "@stitches/react";
import { useDispatch } from "react-redux";
import * as theme from "../../theme/theme";
import * as modal from "../modal/modal";
import { ModalNavFriendBox } from "../modal/content/modalNavFriendBox";
import { StatusDisplayDistributor } from "../../feat/profile/utils";
import { DisplayData, setModalTrigger } from "../../redux/slices/display";

const ProfileImage = styled("img", {
  width: "70px",
  height: "70px",
  padding: "0",
  margin: "0",
  border: "none",
  borderRadius: "50%",
});

const NavFriendBox = styled(theme.NeonHoverRed, {
  color: "grey",
  fontSize: "2rem",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  background: `${theme.BACKGROUND_YELLOW}`,
  height: "28px",
  minHeight: "90px",
  border: "0",
  margin: "2px 4px",
  padding: "0px 10px",
  cursor: "pointer",
  filter: "none",
  "&:hover": {
    filter: "brightness(1.6)",
    border: "0",
  },
});

const ProfileName = styled("div", {
});

const StatusCircle = styled("div", {
  position: "relative",
  right: "10px",
  top: "10px",
  width: "10px",
  height: "10px",
  borderRadius: "50%",
  backgroundColor: "white",
  margin: "0",
  padding: "0",
  marginLeft: "12px",
});

const StatusMessage = styled("div", {
  margin: "0",
  padding: "0",
  width: "80px",
  fontColor: "white",
  fontSize: "20px",
});

const Profile = styled("div", {
  display: "flex",
  flexDirection: "column",
  marginLeft: "10px",
});

const Status = styled("div", {
  display: "flex",
  flexDirection: "row",
});

export function ComponentNavFriendBox(props: any) {
  const dispatch = useDispatch();
  const setStatusColor = (status:string) => {
    if (status === "online") return ("green");
    if (status === "offline") return ("grey");
    if (status === "in game") return ("yellow");
    return ("red");
  };
  const { friend } = props;

  const statusColor:string = setStatusColor(StatusDisplayDistributor(friend.status));
  return (
    <NavFriendBox
      onClick={() => {
        dispatch(setModalTrigger({ ismodal: true } as DisplayData));
        modal.SetModalSize("20%", "40%", "30%", "60%");
        modal.SetModalContent(<ModalNavFriendBox friend={friend} />);
      }}
    >
      {/* eslint-disable-next-line react/button-has-type */}
      <ProfileImage src={friend.img} className="profile" />
      <Profile>
        <ProfileName> {friend.nick} </ProfileName>
        <Status>
          <StatusCircle style={{ backgroundColor: statusColor }} />
          <StatusMessage> {StatusDisplayDistributor(friend.status)} </StatusMessage>
        </Status>
      </Profile>
    </NavFriendBox>
  );
}
