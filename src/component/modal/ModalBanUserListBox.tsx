import React, { useEffect, useState } from "react";
import { styled } from "@stitches/react";
import { getNickName } from "../../network/api/axios.custom";
import { ToolTip } from "../button/ToolTip";
import * as axios from "../../network/api/axios.custom";

const UserListBox = styled("div", {
  width: "100%",
  height: "7vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  fontSize: "1rem",
  transition: "all 0.5s",
  "&:hover": {
    fontSize: "1.1rem",
    textShadow: "0px 0px 7px #ffffff",
  },
});

const UserNicknameZone = styled("div", {
  width: "60%",
  marginLeft: "1%",
  color: "gray",
});

const UserNicknameBold = styled("a", {
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
});

const ButtonZone = styled("div", {
  display: "flex",
  flexDirection: "row",
});

const ButtonDiv = styled("div", {
  width: "2.5rem",
  height: "2.5rem",
  borderRadius: "100%",
  marginRight: "1rem",
  position: "relative",
  cursor: "pointer",
  transition: "all 0.3s",
  "&:hover": {
    backgroundColor: "#424242",
  },
});

const ButtonImg = styled("div", {
  position: "absolute",
  width: "1.8rem",
  height: "1.8rem",
  transform: "translate(-50%, -50%)",
  top: "50%",
  left: "50%",
  cursor: "pointer",
});

interface ModalBanUserListBoxProps {
  userSeq: number;
  roomSeq: string;
  myAuth: number;
}

interface UnBanButtonProps {
  userSeq: number;
  myAuth: number;
  chatSeq: string;
  setButtonResult: any;
}

function UnBanButton(props: UnBanButtonProps) {
  const { userSeq, myAuth, chatSeq, setButtonResult } = props;
  function BanButton(userSeq: number, myAuth: number, chatSeq: string, setButtonResult: any) {
    if (myAuth === 3) {
      axios
        .unBan(chatSeq, userSeq)
        .then((response) => {
          setButtonResult(<pre style={{ color: "rgb(0, 255, 15)", margin: 0 }}>success!</pre>);
          // eslint-disable-next-line no-restricted-globals
          location.reload();
        });
    } else {
      setButtonResult(<pre style={{ color: "red", margin: 0, textShadow: "0 0 5px red" }}>You are not permitted to do this task.</pre>);
    }
  }

  return (
    <ButtonZone>
      <ButtonDiv>
        <ButtonImg className="myToolTipParent" onClick={() => BanButton(userSeq, myAuth, chatSeq, setButtonResult)}>
          <img
            style={{ filter: "invert(90%)", background: "none", }}
            src="/asset/icon_ban.svg"
            alt="unset Ban"
          />
          <ToolTip content="UnBan the user from chatroom." />
        </ButtonImg>
      </ButtonDiv>
    </ButtonZone>
  )
}

function ModalBanUserListBox(props: ModalBanUserListBoxProps) {
  const { userSeq, roomSeq, myAuth } = props;
  const [userName, setUserName] = useState<JSX.Element>(
    <UserNicknameBold>로딩중입니다.</UserNicknameBold>
  );
  const [buttonResult, setButtonResult] = React.useState<JSX.Element>(
    <pre style={{ color: "white", display: "none", }}>no process working.</pre>
  );

  useEffect(() => {
    getNickName(userSeq).then((response: string) => {
      setUserName(<UserNicknameBold>{response}</UserNicknameBold>);
    }).catch((err) => {
      setUserName(<UserNicknameBold style={{ color: "red" }}>Error occured</UserNicknameBold>);
    });
  }, []);

  function ButtonClickHref(userSeq: any) {
    window.location.href = `/profile/${userSeq}`;
  }

  return (
    <UserListBox>
      <UserNicknameZone onClick={() => { ButtonClickHref(userSeq); }}>
        {userName}
      </UserNicknameZone>
      <UnBanButton
        userSeq={userSeq}
        chatSeq={roomSeq}
        myAuth={myAuth}
        setButtonResult={setButtonResult}
      />
    </UserListBox>
  );
}

export default ModalBanUserListBox;
