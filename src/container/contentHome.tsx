/* eslint-disable react/button-has-type */
import React, { useEffect, useState } from "react";
import { styled } from "@stitches/react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import * as template from "./contentTemplate";
import * as theme from "../theme/theme";
import { ModalFirstLogin } from "../component/modal/modalFirstLogin";
import { isFirstLogin } from "../network/api/axios.custom";

const Contents = styled(template.Contents, {
  height: `calc(${theme.NAV_LEFT_HEIGHT} - 6vh)`,
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "left",
  color: "white",
  padding: "3vh",
  overflowX: "hidden",
  overflowY: "scroll",
  "&:hover": {
    filter: "brightness(1)",
  },
  "&::-webkit-scrollbar": {
    background: "none",
    width: "0.6rem",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "#222222",
    borderRadius: "3rem",
    width: "0.4rem",
    right: "60px",
  },
});

const Title0 = styled("div", {
  fontSize: "4vh",
  width: "100%",
  color: "rgba(233, 185, 30)",
  textAlign: "center",
  margin: 0,
  textShadow: "5px 5px 15px black",
});

const Title1 = styled("div", {
  fontSize: "3vh",
  fontWeight: "300",
  margin: 0,
  marginTop: "1.5vh",
  marginBottom: "1.5vh",
  // fontFamily: "Blippo",
});

const Text1 = styled("div", {
  fontSize: "2vh",
  fontWeight: "300",
  margin: 0,
  marginLeft: "1.2vh",
  width: "100%",
});

export function ContainerContents() {
  const style = theme.modalStyle;
  style.top = "50%";
  style.left = "50%";
  style.width = "90vw";
  style.height = "90vh";
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  let control = true;

  useEffect(() => {
    isFirstLogin().then((response: any) => {
      if (response?.data === true && control === true) {
        setOpen(true);
        control = false;
      }
    })
  }, []);

  return (
    <Contents className="contents">
      <Modal open={open} onClose={handleClose}>
        <Box sx={style} component="div">
          <ModalFirstLogin />
        </Box>
      </Modal>
      <div
        style={{
          width: "70%",
          marginLeft: "15%",
        }}
      >
        <img
          style={{
            display: "block",
            margin: "0",
            width: "100%", }}
          alt="x"
          src="/asset/PongShort.gif"
        />
      </div>
      <Title0>! <b>WELCOME TO PINGPONG</b> !</Title0>
      <hr style={{ width: "70%", marginLeft: "15%", border: "1px solid rgba(233, 185, 30)", }} />
      <Title1><b>First at this site?</b></Title1>
      <Text1 onClick={handleOpen} style={{ cursor: "pointer", padding: "5px 10px 5px 10px", border: "1px solid gray", borderRadius: "30px", width: "auto", }}>
        Please click here and get helped to set your account.
      </Text1>
      <br /><hr style={{ width: "90%", marginLeft: "5%", border: "1px dashed gray" }} />
      <Title1><b>About the project</b></Title1>
      <Text1>
        This site is a project <b>'ft_transcendence'</b> of 42 schools<br />
        that implements the classic game <b>'pong'</b> with React.js and Next.js.
        <br /><br />
        10 members have participated, and you can watch our full code on <a href="https://github.com/PPiing" style={{ color: "rgba(233, 185, 30)", fontWeight: "bold", }}>Github/PPiing</a>.<br />
        Implemented feature list:<br />
        <ul style={{ width: "90%", marginLeft: "2%", backgroundColor: "black", padding: "3%", border: "1px solid gray" }}>
          <li>
            <p style={{ margin: 0, marginBottom: "5px", }}><b>Authentication</b> (42signup/login, email auth)</p>
          </li>
          <li>
            <p style={{ margin: 0, marginBottom: "5px", }}><b>Community</b> (friend management, user block, profile, alarm, user status)</p>
          </li>
          <li>
            <p style={{ margin: 0, marginBottom: "5px", }}><b>Chatting</b> (public/protected/private, DM, setting, ban/mute/admin)</p>
          </li>
          <li>
            <p style={{ margin: 0, marginBottom: "5px", }}><b>Game</b> (3D Game Play, rule setting, game invitation, tier, achievements, watch)</p>
          </li>
        </ul>
      </Text1>

    </Contents>
  );
}
