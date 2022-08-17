import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import * as template from "./navBoxTemplate";
import * as theme from "../../theme/theme";
import { ModalNavFriendBox } from "../modal/modalNavFriendBox";
import { StatusDisplayDistributor } from "../../feat/profile/utils";

export function ComponentNavFriendBox(props: any) {
  const setStatusColor = (status:string) => {
    if (status === "online") return ("#00d100");
    if (status === "offline") return ("grey");
    if (status === "in game") return ("yellow");
    return ("red");
  };
  const { user } = props;

  const statusColor:string = setStatusColor(StatusDisplayDistributor(user.status));

  const style = theme.modalStyle;
  style.top = "40%";
  style.width = "300px";
  style.height = "auto";
  style.left = "calc(100% - 450px)";
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <template.NavBox>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={style} component="div">
          <ModalNavFriendBox user={user} />
        </Box>
      </Modal>
      <template.ProfileImage
        src={`${window.location.origin}${user.img}`}
        className="profile"
        onClick={handleOpen}
      />
      <template.Profile>
        <template.ProfileName> {user.nick} </template.ProfileName>
        <template.StatusMessage style={{ color: statusColor }}>
          {StatusDisplayDistributor(user.status)}
        </template.StatusMessage>
      </template.Profile>
    </template.NavBox>
  );
}
