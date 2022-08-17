import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import * as theme from "../../theme/theme";
import * as template from "./navBoxTemplate";
import { StatusDisplayDistributor } from "../../feat/profile/utils";
import { FriendData } from "../../redux/slices/friendList";
import { ModalNavFriendBox } from "../modal/modalNavFriendBox";

export function ComponentNavSearchUserBox(props: any) {
  const setStatusColor = (status:string) => {
    if (status === "online") return ("#00d100");
    if (status === "offline") return ("grey");
    if (status === "in game") return ("yellow");
    return ("red");
  };

  const { searchUser } = props;
  const user:FriendData = {
    seq: searchUser.userSeq,
    nick: searchUser.nickName,
    img: searchUser.userImage,
    status: searchUser.userStatus,
  };

  const style = theme.modalStyle;
  style.top = "40%";
  style.width = "300px";
  style.height = "auto";
  style.left = "calc(100% - 450px)";
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const statusColor:string = setStatusColor(StatusDisplayDistributor(user.status));
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} component="div">
          <ModalNavFriendBox user={user} />
        </Box>
      </Modal>
      <template.NavBox onClick={handleOpen}>

        <template.ProfileImage
          src={`${window.location.origin}${user.img}`}
          className="profile"
        />
        <template.Profile>
          <template.ProfileName> {user.nick} </template.ProfileName>
          <template.StatusMessage style={{ color: statusColor, width: "100%", }}>
            {StatusDisplayDistributor(user.status)}
          </template.StatusMessage>
        </template.Profile>
      </template.NavBox>
    </div>
  );
}
