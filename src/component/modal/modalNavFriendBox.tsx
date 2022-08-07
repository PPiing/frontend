/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable prefer-destructuring */
import React, { useState, useEffect } from "react";
import { styled } from "@stitches/react";
import { useSelector } from "react-redux";
import * as theme from "../../theme/theme";
import { ReducerType } from "../../redux/rootReducer";
import { StatusDisplayDistributor } from "../../feat/profile/utils";
import { LoggedUserData } from "../../redux/slices/loggedUser";
import { getUserSearch } from "../../network/api/axios.custom";

/*
  Define Rules
*/

type ButtonType = {
  name: string;
  onClick: () => void;
  disabled: boolean;
}

/*
  Profile Zone
*/
function Profile(props: any) {
  const { response } = props;

  const tier = theme.getTierColor(response?.rank_info?.rank_score);
  const ProfileZone = styled("div", {
  });

  const ProfileImage = styled(theme.ProfileImage, {
    width: "150px",
    height: "150px",
    position: "relative",
    top: "0.8rem",
    left: "0rem",
    marginBottom: "-25px",
    borderRadius: "50%",
  });

  const ProfileTier = styled("p", {
    color: "color",
    fontSize: "25px",
    fontWeight: "bold",
    textOverflow: "ellipsis",
    marginTop: "40px",
    marginBottom: "-50px",
  });

  const ProfileName = styled("p", {
    fontSize: "50px",
    fontWeight: "bold",
    textOverflow: "ellipsis",
    marginBottom: "5px",
    textShadow: "0 0 5px white",
  });

  return (
    <ProfileZone>
      <ProfileImage
        src={`${window.location.origin}${response.user_info.userImage}`}
        style={{
          border: `3px solid ${tier.color}`,
          boxShadow: `0 0 15px ${tier.color}` }}
      />
      <ProfileTier style={{ color: `${tier.color}`, textShadow: `0px 0px 10px ${tier.color}` }}>
        - - - - {tier.name} - - - -
      </ProfileTier>
      <ProfileName>
        {response.user_info.userName}
      </ProfileName>
    </ProfileZone>
  )
}

/*
  Profile Zone End
*/

/*
  Status Zone
*/

function setStatusColor(status:string) {
  if (status === "online") return ("#00d100");
  if (status === "offline") return ("grey");
  if (status === "in game") return ("yellow");
  return ("red");
};

function Status(props: any) {
  const { status } = props;

  const statusColor = setStatusColor(StatusDisplayDistributor(status));

  const StatusZone = styled("div", {
    display: "inline-block",
    marginBottom: "-15px",
  });

  const StatusIcon = styled("div", {
    width: "0.8rem",
    height: "0.8rem",
    borderRadius: "50%",
    boxShadow: `0 0 15px ${statusColor}`,
    marginRight: "-5px",
  });

  const StatusString = styled("div", {
    fontSize: "22px",
    marginLeft: "30px",
    marginTop: "-22px",
    textAlign: "left",
    color: statusColor,
    textShadow: `0 0 10px ${statusColor}`,
  });

  return (
    <StatusZone>
      <StatusIcon style={{ backgroundColor: statusColor }} />
      <StatusString>
        {StatusDisplayDistributor(status)}
      </StatusString>
    </StatusZone>
  );
}

/*
  Status Zone End
*/

/*
  Button Render Zone
*/

const ButtonZone = styled("div", {
  width: "80%",
  marginLeft: "10%",
  marginTop: "10%",
});

// const ButtonTd = styled("td", {
//   width: "280px",
//   marginLeft: "10px",
//   marginRight: "10px",
//   height: "30px",
// });

const ButtonTemplate = styled("div", {
  width: "70%",
  marginLeft: "15%",
  paddingTop: "5px",
  paddingBottom: "5px",
  marginBottom: "15px",
  fontSize: "18px",
  backgroundColor: "black",
  color: "white",
  border: "1.5px solid white",
  borderRadius: "5px",
  filter: "drop-shadow(0 0 2px white) brightness(1.6)",
  textShadow: "0 0 2px #808080",
  cursor: "pointer",
  transition: "all 0.3s",
  "&:hover": {
    background: "#303030",
    border: "1.5px solid #808080",
    filter: "drop-shadow(0 0 2px #808080) brightness(1.6)",
  }
});

function Buttons(props: any) {
  const { render } = props;
  const result = [];

  for (let i = 0; i < render.length; i += 1) {
    result.push(
      <ButtonTemplate onClick={render[i].onClick} key={i}>
        {render[i].name}
      </ButtonTemplate>
    );
  }
  return (
    <ButtonZone>
      {result}
    </ButtonZone>
  );
}

/*
  Button Render Zone End
*/

/*
  Main Zone
*/

const ModalContentDiv = styled("div", {
  textAlign: "center",
  // display: "flex",
  alignItems: "center",
  verticalAlign: "middle",
  overflow: "hidden",
});

function isNumber(str: any): boolean {
  if (typeof str !== "string") {
    return false;
  }
  if (str.trim() === "") {
    return false;
  }
  return !Number.isNaN(Number(str));
};

export function ModalNavFriendBox(props: any) {
  const { user } = props;

  const [content, setContent] = useState<JSX.Element>(
    <div>
      <b>로딩중입니다.</b>
    </div>
  )
  const logged = useSelector<ReducerType, LoggedUserData>((state) => state.loggedUser);

  function buttonClickHref(link: string) {
    window.location.href = link;
  }

  function buttonClickAxios() {

  }

  useEffect(() => {
    let searchSeq: any = "-1";
    if (isNumber(user.seq)) searchSeq = user.seq.toString();
    getUserSearch(user.seq).then((response) => {
      const anyResponse: any = response;
      const userInfo: any = anyResponse?.data;
      const defineList: ButtonType[] = [];
      if (anyResponse?.name !== "AxiosError") {
        defineList.push({
          name: "profile",
          onClick: () => { buttonClickHref(`/profile/${userInfo.user_info.userSeq}`); },
          disabled: false,
        });
        if (userInfo.user_info.userName === logged.nick) {
          defineList.push({
            name: "logout",
            onClick: () => { buttonClickHref("/api/auth/logout"); },
            disabled: false,
          });
        } else {
          defineList.push({
            name: "DM",
            onClick: () => { /*DM 방 생성 axios, Redirection*/ buttonClickHref("/chat/") },
            disabled: false,
          });
          defineList.push({
            name: "friend",
            onClick: () => { /* 친구신청/해제 토글 */ },
            disabled: false,
          });
          defineList.push({
            name: "block",
            onClick: () => { /* 유저차단/해제 토글 */ },
            disabled: false,
          });
          defineList.push({
            name: "game",
            onClick: () => { /* 게임신청 */ },
            disabled: false,
          });
        }

        const content: JSX.Element[] = []
        content.push(<Profile response={userInfo} />);
        if (userInfo.user_info.isFriend === true) content.push(<Status status={user.status} />)
        content.push(<Buttons render={defineList} />);

        setContent(
          <>{ content }</>
        );
      }
    }).catch((error) => {
      setContent(
        <b style={{ color: "red" }}>An error occurred. {error}</b>
      );
    });
  }, []);

  return (
    <ModalContentDiv>
      {content}
    </ModalContentDiv>
  );
}

/*
  Main Zone End
*/
