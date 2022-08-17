/* eslint-disable no-restricted-globals */
import React from "react";
import { styled } from "@stitches/react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { LoggedUserData } from "../../redux/slices/loggedUser";
import { getLoggedUserProfile } from "../../network/api/axios.custom";
import { ReducerType } from "../../redux/rootReducer";
import { ToolTip } from "../button/ToolTip";

const ExitZone = styled("div", {
  width: "100%",
  height: "100%",
  // backgroundColor: "#FFFFFF",
});

const ExitText = styled("div", {
  // background: "red",
  textAlign: "center",
  verticalAlign: "bottom",
  marginTop: "1.5vh",
  marginBottom: "2vh",
  fontSize: "2vw",
  //   fontWeight: "bold",
  textShadow: "0px 0px 1px #ffffff",
});

const ExitButtonZone = styled("div", {
  width: "100%",
  textAlign: "center",
});

const ExitButton = styled("div", {
  display: "inline-block",
  fontSize: "1.3vw",
  fontWeight: "bold",
  width: "4vw",
  height: "4vw",
  borderRadius: "5px",
  color: "black",
  cursor: "pointer",
  marginTop: "1vh",
});

const ExitButtonGreen = styled(ExitButton, {
  backgroundColor: "#00FF40",
  boxShadow: "0px 0px 10px #00FF40",
  transition: "0.7s",
  "&:hover": {
    backgroundColor: "#04B404",
    boxShadow: "0px 0px 10px #04B404",
  }
});

const ExitButtonRed = styled(ExitButton, {
  backgroundColor: "#fd4546",
  boxShadow: "0px 0px 10px #fd4546",
  transition: "0.7s",
  "&:hover": {
    backgroundColor: "red",
    boxShadow: "0px 0px 10px red",
  }
});

function ModalChatTemplate(props:any) {
  const { text, onClick } = props;
  return (
    <ExitZone>
      <ExitText>{text}</ExitText>
      <ExitButtonZone>
        <ExitButtonGreen onClick={onClick}>
          <a>
            <img
              alt="Y"
              src="/asset/icon_check.svg"
              style={{ width: "3.5vw", height: "3.5vw", marginTop: "0.25vw" }}
            />
          </a>
        </ExitButtonGreen>
      </ExitButtonZone>
    </ExitZone>

  )
}

export function ModalChatExit(props: any) {
  const { room } = props;

  const ExitTextBold = styled("b", {
    color: "red",
    textShadow: "0px 0px 10px red",
    transition: "1s",
    cursor: "not-allowed",
  })

  return (
    <ModalChatTemplate
      text={<p>Are you sure you want to<ExitTextBold> leave </ExitTextBold>this room?</p>}
      onClick={() => {
        axios.delete(`/api/chatrooms/leave/${room}`).then((response) => {
          console.log("response :", response);
          location.reload();
        }).catch((error) => {
          console.log("error :", error);
        });
      }}
    />
  );
}

export function ModalUserBan(props: any) {
  const { seq, room } = props;

  const AdminTextBold = styled("b", {
    color: "red",
    textShadow: "0px 0px 10px red",
    transition: "1s",
    cursor: "progress",
  });

  return (
    <ModalChatTemplate
      text={(
        <div className="myToolTipParent">
          Are you sure to <AdminTextBold>Ban</AdminTextBold> this user?
          <ToolTip style={{ fontWeight: "normal", textShadow: "0", fontSize: "18px", }} content="The user will be kicked forever." />
        </div>
      )}
      onClick={() => {
        axios.put(`/api/chatrooms/ban/${seq}/${room}`);
      }}
    />
  );
}

export function ModalUserMute(props: any) {
  const { seq, room } = props;

  const AdminTextBold = styled("b", {
    color: "red",
    textShadow: "0px 0px 10px red",
    transition: "1s",
    cursor: "progress",
  });

  return (
    <ModalChatTemplate
      text={(
        <div className="myToolTipParent">
          Are you sure to <AdminTextBold>Mute</AdminTextBold> this user?
          <ToolTip style={{ fontWeight: "normal", textShadow: "0", fontSize: "18px", }} content="User can`t chat during time limit." />
        </div>
      )}
      onClick={() => {
        axios.put(`/api/chatrooms/mute/${seq}/${room}/300`);
      }}
    />
  );
}

export function ModalUserAdmin(props: any) {
  const { seq, room } = props;

  const AdminTextBold = styled("b", {
    color: "#00FF40",
    textShadow: "0px 0px 10px #00FF40",
    transition: "1s",
    cursor: "progress",
  });

  return (
    <ModalChatTemplate
      text={(
        <div className="myToolTipParent">
          Are you sure you want to set this user as <AdminTextBold>Admin</AdminTextBold>?
          <ToolTip style={{ fontWeight: "normal", textShadow: "0", fontSize: "18px", }} content="Admin can ban or mute users." />
        </div>
      )}
      onClick={() => {
        axios.put(`/api/chatrooms/manager/${seq}/${room}`);
      }}
    />
  );
}
