import React from "react";
import { styled } from "@stitches/react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import * as modal from "../modal";
import { DisplayData, setModalTrigger } from "../../../redux/slices/display";
import { LoggedUserData } from "../../../redux/slices/loggedUser";
import { getLoggedUserProfile } from "../../../network/api/axios.custom";
import { ReducerType } from "../../../redux/rootReducer";

const ExitZone = styled("div", {
  width: "100%",
  height: "100%",
  overflow: "hidden",
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

const ExitTextBold = styled("b", {
  color: "red",
  textShadow: "0px 0px 1px red",
  transition: "1s",
  cursor: "not-allowed",
})

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

export function ModalChatExit(props: any) {
  const { room } = props;
  const LoggedUser = useSelector<ReducerType, LoggedUserData>((state) => state.loggedUser);
  return (
    <ExitZone>
      <ExitText>Are you sure you want to<ExitTextBold> leave </ExitTextBold>this room?
      </ExitText>
      <ExitButtonZone>
        <ExitButtonGreen
          onClick={() => {
            axios.delete(`/api/chatrooms/leave/${room}/${LoggedUser?.seq}`).then((response) => {
              console.log("response :", response);
            }).catch((error) => {
              console.log("error :", error);
            });
          }}
        >
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
