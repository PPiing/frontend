/* eslint-disable prefer-destructuring */
import React, { useState, useEffect } from "react";
import { styled } from "@stitches/react";
import { useSelector, useDispatch } from "react-redux";
import * as theme from "../../../theme/theme";
import { ReducerType } from "../../../redux/rootReducer";
import { StatusDisplayDistributor } from "../../../feat/profile/utils";
import { ReqUserProfile } from "../../../feat/profile/request";
import { LoggedUserData } from "../../../redux/slices/loggedUser";
import * as modal from "../modal";
import { DisplayData, setModalTrigger } from "../../../redux/slices/display";
import { getUserSearch } from "../../../network/api/axios.custom";

/*
  Define Rules
*/

type ButtonPair = {
  name: string,
  link: string,
  able: boolean,
};

type ButtonVector = {
  type: string,
  buttons: ButtonPair[],
  status: boolean,
}

const DefineList: ButtonVector[] = [
  {
    type: "friend",
    buttons: [
      { name: "profile", link: "/profile", able: true },
      { name: "DM", link: "/chat", able: true },
      { name: "friend", link: "#", able: true },
      { name: "block", link: "#", able: true },
      { name: "watch", link: "/watch", able: true },
      { name: "game", link: "/game", able: true },
    ],
    status: true,
  },
  {
    type: "stranger",
    buttons: [
      { name: "profile", link: "/profile", able: true },
      { name: "DM", link: "/chat", able: true },
      { name: "friend", link: "#", able: true },
      { name: "block", link: "#", able: true },
      { name: "watch", link: "/watch", able: true },
      { name: "game", link: "/game", able: true },
    ],
    status: false,
  },
  {
    type: "myself",
    buttons: [
      { name: "profile", link: "/profile", able: true },
      { name: "logout", link: "/logout", able: true },
    ],
    status: true,
  },
]

/*
  Profile Zone
*/
function Profile(props: any) {
  const { response, renderList } = props;

  const tier = theme.getTierColor(response?.rank_info?.rank_score);
  const ProfileZone = styled("div", {
  });

  const ProfileImage = styled(theme.ProfileImage, {
    width: "8rem",
    height: "8rem",
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
  });

  return (
    <ProfileZone>
      <ProfileImage
        src={`${window.location.origin}${response.user_info.user_image}`}
        style={{
          border: `3px solid ${tier.color}`,
          boxShadow: `0 0 15px ${tier.color}` }}
      />
      {/* <ProfileStatus style={{ backgroundColor: StatusColor }} /> */}
      <ProfileTier style={{ color: `${tier.color}`, filter: `textShadow(0px 0px 10px ${tier.color})` }}>
        - - - - {tier.name} - - - -
      </ProfileTier>
      <ProfileName>
        {response.user_info.user_name}
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
  if (status === "online") return ("green");
  if (status === "offline") return ("grey");
  if (status === "in game") return ("yellow");
  return ("red");
};

function Status(props: any) {
  const { status, renderList } = props;

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

  if (renderList.status === true) {
    return (
      <StatusZone>
        <StatusIcon style={{ backgroundColor: statusColor }} />
        <StatusString>
          {StatusDisplayDistributor(status)}
        </StatusString>
      </StatusZone>
    );
  }
  return (<div />);
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

const ButtonTd = styled("td", {
  width: "280px",
  marginLeft: "10px",
  marginRight: "10px",
  height: "30px",
});

const ButtonTemplate = styled("div", {
  paddingTop: "5px",
  paddingBottom: "5px",
  marginBottom: "15px",
  fontSize: "18px",
  backgroundColor: "black",
  color: "white",
  border: "1.5px solid white",
  borderRadius: "5px",
  filter: "drop-shadow(0 0 3px white) brightness(1.6)",
  textShadow: "0 0 2px #808080",
  cursor: "pointer",
});

function Buttons(props: any) {
  const { response, renderList } = props;
  const result = [];
  const dispatch = useDispatch();

  function ButtonClickHref(link: string) {
    dispatch(setModalTrigger({ ismodal: false } as DisplayData));
    window.location.href = link;
  }

  for (let i = 0; i < renderList.buttons.length; i += 2) {
    let buttonLink0 = renderList.buttons[i].link;
    let buttonLink1 = renderList.buttons[i + 1].link;
    if (renderList.buttons[i].name === "profile") {
      buttonLink0 += `/${response.user_info.userSeq}`;
    }
    if (renderList.buttons[i + 1].name === "profile") {
      buttonLink1 += `/${response.user_info.userSeq}`;
    }
    result.push(
      <tr key={i}>
        <ButtonTd key={i}>
          <ButtonTemplate onClick={() => ButtonClickHref(buttonLink0)}>
            {renderList.buttons[i].name}
          </ButtonTemplate>
        </ButtonTd>
        <ButtonTd key={i + 1}>
          <ButtonTemplate onClick={() => ButtonClickHref(buttonLink1)}>
            {renderList.buttons[i + 1].name}
          </ButtonTemplate>
        </ButtonTd>
      </tr>
    );
  }
  return (
    <ButtonZone>
      <table>
        <tbody>
          {result}
        </tbody>
      </table>
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
  console.log("user props : ", user);
  const [content, setContent] = useState<JSX.Element>(
    <div>
      <b>로딩중입니다.</b>
    </div>
  )
  const logged = useSelector<ReducerType, LoggedUserData>((state) => state.loggedUser);

  useEffect(() => {
    let searchSeq: any = "-1";
    if (isNumber(user.seq)) searchSeq = user.seq.toString();
    getUserSearch(user.seq).then((response) => {
      const anyResponse: any = response;
      const userInfo: any = anyResponse?.data;
      if (anyResponse?.name !== "AxiosError") {
        let Define = DefineList[0];
        if (userInfo.user_info.isFriend === true) Define = DefineList[1];
        if (logged.nick === userInfo.user_info.userName) Define = DefineList[2];
        setContent(
          <>
            <Profile response={userInfo} renderList={Define} />
            <Status status={user.status} renderList={Define} />
            <Buttons response={userInfo} renderList={Define} />
          </>
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
