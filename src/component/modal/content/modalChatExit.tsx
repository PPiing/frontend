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
  marginTop: "8vh",
  marginBottom: "2vh",
  fontSize: "2vw",
  fontWeight: "bold",
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
  fontSize: "1.5vw",
  fontWeight: "bold",
  width: "4vw",
  height: "4vw",
  borderRadius: "5px",
  color: "black",
  cursor: "pointer",
  margin: "1.5vw",
  marginTop: "1vh",
});

const ExitButtonGreen = styled(ExitButton, {
  backgroundColor: "#28c231",
  boxShadow: "0px 0px 10px #28c231",
  transition: "0.7s",
  "&:hover": {
    backgroundColor: "green",
    boxShadow: "0px 0px 10px green",
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
  console.log(`room number : ${room}`);
  const dispatch = useDispatch();
  return (
    <ExitZone>
      <ExitText>Are you sure you want to<ExitTextBold> leave </ExitTextBold>the room?
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
              src="/asset/check_mark.svg"
              style={{ width: "3.5vw", height: "3.5vw", marginTop: "0.25vw" }}
            />
          </a>
        </ExitButtonGreen>
        <ExitButtonRed
          onClick={() => {
            dispatch(setModalTrigger({ ismodal: false } as DisplayData));
          }}
        >
          <a>
            <img
              alt="X"
              src="/asset/x_mark.svg"
              style={{ width: "3.5vw", height: "3.5vw", marginTop: "0.25vw" }}
            />
          </a>
        </ExitButtonRed>
      </ExitButtonZone>
    </ExitZone>
  )
}
