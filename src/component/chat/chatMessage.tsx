/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { styled } from "@stitches/react";
import * as theme from "../../theme/theme";
import { ModalNavFriendBox } from "../modal/modalNavFriendBox";
import { getUserSimpleSearch } from "../../network/api/axios.custom";
import { FriendData } from "../../redux/slices/friendList";

const Message = styled("div", {
  display: "flex",
  flexDirection: "row",
  width: "96%",
  minHeight: "2.5rem",
  paddingTop: "1%",
  paddingBottom: "1%",
  backgroundColor: "#252525",
  borderRadius: "1rem",
  fontSize: "1.2rem",
  margin: "0.5rem",
  marginTop: "1.2rem",
  marginBottom: "0rem",
  cursor: "pointer",
});

const MessageSender = styled("div", {
  display: "flex",
  alignItems: "center",
  marginLeft: "3%",
  width: "16.5%",
  marginRight: "0.5%",
  whiteSpace: "nowrap",
  overflowY: "hidden",
  overflowX: "scroll",
  fontWeight: "350",
  "&::-webkit-scrollbar": {
    display: "none",
  },
});

const MessageText = styled("div", {
  display: "flex",
  color: "white",
  alignItems: "center",
  width: "100%",
  backgroundColor: "#252525",
  marginLeft: "10px",
  wordBreak: "break-all",
});

// const MessageWhen = styled("div", {
//   display: "flex",
//   color: "white",
//   alignItems: "center",
//   textAlign: "right",
//   marginLeft: "2%",
//   width: "10%",
//   fontSize: "0.8rem",
//   fontWeight: "350",
//   backgroundColor: "#252525",
// })

export function ChatMessage(props: any) {
  const { nickname, msg } = props;

  const [user, setUser] = useState<FriendData>();
  useEffect(() => {
    getUserSimpleSearch(nickname).then((res: any) => {
      for (let i = 0; i < res.data.length; i += 1) {
        if (res.data[i].nickName === nickname) {
          setUser({
            seq: res.data[i].userSeq,
            nick: res.data[i].nickName,
            img: res.data[i].userImage,
            status: res.data[i].userStatus,
          });
        }
      }
    });
  }, []);

  const style = theme.modalStyle;
  style.top = "50%";
  style.left = "50%";
  style.width = "300px";
  style.height = "auto";
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Message>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style} component="div">
          <ModalNavFriendBox user={user} />
        </Box>
      </Modal>
      <MessageSender>
        <b onClick={handleOpen}>{nickname}</b>
      </MessageSender>
      <MessageText>{msg}</MessageText>
      {/* <MessageWhen>
        {`${date.getFullYear()}`}<br />
        {`${month}-${date.getDate()}`}<br /><br />
        {`${hour}:${minute}`}
      </MessageWhen> */}
    </Message>
  );
}
