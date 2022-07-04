import React from "react";
import { styled } from "@stitches/react";
import * as theme from "../../../theme/theme";
import { StatusDisplayDistributor } from "../../../feat/profile/utils";
import { ReqUserProfile } from "../../../feat/profile/request";
import * as modal from "../modal";

let TierColor = "#000";
let TierString = "gold";
let StatusColor = "green";

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
      { name: "DM", link: "#", able: true },
      { name: "friend", link: "#", able: true },
      { name: "block", link: "#", able: true },
      { name: "watch", link: "#", able: true },
      { name: "game", link: "#", able: true },
    ],
    status: true,
  },
  {
    type: "stranger",
    buttons: [
      { name: "profile", link: "/profile", able: true },
      { name: "DM", link: "#", able: true },
      { name: "friend", link: "#", able: true },
      { name: "block", link: "#", able: true },
      { name: "watch", link: "#", able: true },
      { name: "game", link: "#", able: true },
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

const ProfileZone = styled("div", {
});

const ProfileImage = styled(theme.ProfileImage, {
  width: "8rem",
  height: "8rem",
  position: "relative",
  top: "0rem",
  left: "0rem",
  marginBottom: "-25px",
  borderRadius: "50%",
});

const ProfileTier = styled("p", {
  color: "color",
  fontSize: "25px",
  fontWeight: "bold",
  textOverflow: "ellipsis",
  marginBottom: "-50px",
});

const ProfileName = styled("p", {
  fontSize: "50px",
  fontWeight: "bold",
  textOverflow: "ellipsis",
  marginBottom: "10px",
});

function Profile(props: any) {
  const { user, renderList } = props;
  return (
    <ProfileZone>
      <ProfileImage
        src={user.img}
        style={{
          border: `3px solid ${TierColor}`,
          boxShadow: `0 0 15px ${TierColor}` }}
      />
      {/* <ProfileStatus style={{ backgroundColor: StatusColor }} /> */}
      <ProfileTier style={{ color: TierColor, filter: `textShadow(0px 0px 10px ${TierColor})` }}>
        - - - - {TierString} - - - -
      </ProfileTier>
      <ProfileName>
        {user.nick}
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

const StatusZone = styled("div", {
  display: "inline-block",
});

const StatusIcon = styled("div", {
  width: "0.8rem",
  height: "0.8rem",
  borderRadius: "50%",
//   marginTop: "-37px",
//   marginLeft: "110px",
});

const StatusString = styled("div", {
  fontSize: "22px",
  marginLeft: "30px",
  marginTop: "-22px",
  textAlign: "left",
});

function setStatusColor(status:string) {
  if (status === "online") return ("green");
  if (status === "offline") return ("grey");
  if (status === "in game") return ("yellow");
  return ("red");
};

function Status(props: any) {
  const { user, renderList } = props;
  if (renderList.status === true) {
    return (
      <StatusZone>
        <StatusIcon style={{ backgroundColor: StatusColor }} />
        <StatusString style={{ color: StatusColor }}>
          {StatusDisplayDistributor(user.status)}
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

const ButtonTemplate = styled("button", {
  width: "46%",
  margin: "2%",
  height: "35px",
  fontSize: "18px",
  backgroundColor: "black",
  color: "white",
  border: "1.5px solid white",
  borderRadius: "5px",
  filter: "drop-shadow(0 0 3px white) brightness(1.6)",
  textShadow: "0 0 2px #808080",
  marginBottom: "15px",
  cursor: "pointer",
});

// const friends: User[] = [
//   {
//     name: "skim1",
//     profile_link: "/asset/profileImage/default.png",
//     status: "online",
//   },
//   {
//     name: "skim2",
//     profile_link: "/asset/profileImage/default.png",
//     status: "offline",
//   },
//   {
//     name: "skim3",
//     profile_link: "/asset/profileImage/default.png",
//     status: "in game",
//   },
//   {
//     name: "skim4",
//     profile_link: "/asset/profileImage/default.png",
//     status: "??",
//   },
//   {
//     name: "skim5",
//     profile_link: "/asset/profileImage/default.png",
//     status: "online",
//   }
// ];

function Buttons(props: any) {
  const { user, renderList } = props;
  const result = [];
  for (let i = 0; i < renderList.buttons.length; i += 1) {
    result.push(<ButtonTemplate key={i}>{renderList.buttons[i].name}</ButtonTemplate>)
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

export function ModalNavFriendBox(props: any) {
  const { user } = props;

  // const user = ReqUserProfile(nick);
  TierColor = "darkblue";
  StatusColor = setStatusColor(StatusDisplayDistributor(user.status));
  TierString = "diamond";

  return (
    <ModalContentDiv>
      <Profile user={user} renderList={DefineList[2]} />
      <Status user={user} renderList={DefineList[2]} />
      <Buttons user={user} renderList={DefineList[2]} />
    </ModalContentDiv>
  );
}

/*
  Main Zone End
*/
