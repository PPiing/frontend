/* eslint-disable react/destructuring-assignment */
/* eslint-disable consistent-return */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable prefer-destructuring */
import React, { useState, useEffect } from "react";
import { styled } from "@stitches/react";
import { useSelector } from "react-redux";
import * as theme from "../../theme/theme";
import { ReducerType } from "../../redux/rootReducer";
import { StatusDisplayDistributor } from "../../feat/profile/utils";
import { LoggedUserData } from "../../redux/slices/loggedUser";
import { getUserSearch, postConfirm, postFriendDelete, postFriendRequest, postGameInvite, postNewDM, requestUserBlock, requestUserUnblock, } from "../../network/api/axios.custom";
import { FriendData } from "../../redux/slices/friendList";
import { ChoosableAlamData } from "../../redux/slices/choosableAlamList";
import { gameRule, GameRuleData, setGameRuleData } from "../../redux/slices/gameRule";
import store from "../../redux/store";
import socketManager from "../../network/api/socket";

/*
  Define Rules
*/

type ButtonType = {
  name: string;
  onClick: () => void;
  disabled: boolean;
}

const socketGame = socketManager.socket("/");

socketGame.connect();

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

  const myRule = useSelector<ReducerType, GameRuleData>((state) => state.gameRule);

  const [content, setContent] = useState<JSX.Element>(
    <b>... loading ...</b>
  )
  const logged = useSelector<ReducerType, LoggedUserData>((state) => state.loggedUser);
  const friendsList = useSelector<ReducerType, FriendData[]>((state) => state.friendList);
  const confirmList
    = useSelector<ReducerType, ChoosableAlamData[]>((state) => state.choosableAlamList);

  function buttonClickHref(link: string) {
    window.location.href = link;
  }

  const [gameButtonToggle, setGameButtonToggle] = useState(0);
  const [friendButtonToggle, setFriendButtonToggle] = useState(0);
  const [blockButtonToggle, setBlockButtonToggle] = useState(0);

  useEffect(() => {
    socketGame.on("game:ready", (res) => {
      console.log("Invite Game ready!=> ");
      // eslint-disable-next-line max-len
      store.dispatch(setGameRuleData({ ...myRule, blueUser: res.blueUser, redUser: res.redUser } as GameRuleData));
      socketGame.emit("game:ready", { roomId: res.roomId });
    });

    getUserSearch(user?.seq).then((response) => {
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
            onClick: () => {
              postNewDM(userInfo.user_info.userSeq);
              buttonClickHref("/chat");
            },
            disabled: false,
          });
          let bFriend: boolean = false;
          for (let i = 0; i < friendsList.length; i += 1) {
            if (friendsList[i].seq === userInfo.user_info.userSeq) {
              bFriend = true;
              break;
            }
          }
          let bFriendAlarm: boolean = false;
          let friendAlarmIndex: number = -1;
          for (let i = 0; i < confirmList.length; i += 1) {
            if (confirmList[i].from_seq === userInfo.user_info.userSeq) {
              bFriendAlarm = true;
              friendAlarmIndex = i;
              break;
            }
          }
          if (friendButtonToggle === 0) {
            if (bFriend) {
              defineList.push({
                name: "delete friend",
                onClick: () => {
                  postFriendDelete(userInfo.user_info.userSeq);
                  setFriendButtonToggle(1);
                },
                disabled: false,
              });
            } else {
              // eslint-disable-next-line no-lonely-if
              if (bFriendAlarm) {
                defineList.push({
                  name: "accept friend",
                  onClick: () => {
                    postConfirm(
                      userInfo.user_info.userSeq,
                      confirmList[friendAlarmIndex].seq,
                      true,
                      0
                    );
                    setFriendButtonToggle(1);
                  },
                  disabled: false,
                });
              } else {
                defineList.push({
                  name: "add friend",
                  onClick: () => {
                    postFriendRequest(userInfo.user_info.userSeq);
                    setFriendButtonToggle(1);
                  },
                  disabled: false,
                });
              }
            }
          } else if (friendButtonToggle === 1) {
            if (bFriend) {
              defineList.push({
                name: "delete friend complete",
                onClick: () => {},
                disabled: true,
              });
            } else {
              defineList.push({
                name: "friend request ongoing...",
                onClick: () => {},
                disabled: true,
              });
            }
          }
          if (blockButtonToggle === 0) {
            if (userInfo.relation_info === "R03") {
              defineList.push({
                name: "unblock",
                onClick: () => {
                  requestUserUnblock(userInfo.user_info.userSeq);
                  setBlockButtonToggle(1);
                },
                disabled: false,
              });
            } else {
              defineList.push({
                name: "block",
                onClick: () => {
                  requestUserBlock(userInfo.user_info.userSeq);
                  setBlockButtonToggle(1);
                },
                disabled: false,
              });
            }
          } else if (blockButtonToggle === 1) {
            if (userInfo.relation_info === "R03") {
              defineList.push({
                name: "unblock complete",
                onClick: () => {},
                disabled: true,
              });
            } else {
              defineList.push({
                name: "block complete",
                onClick: () => {},
                disabled: true,
              });
            }
          }
          if (gameButtonToggle === 0) {
            if (userInfo.user_info.userStatus === "USST10") {
              let bGameReq: boolean = false;
              let gameReqIndex: number = -1;
              for (let i = 0; i < confirmList.length; i += 1) {
                if (confirmList[i].from_seq === userInfo.user_info.userSeq) {
                  bGameReq = true;
                  gameReqIndex = i;
                  break;
                }
              }
              if (bGameReq) {
                defineList.push({
                  name: "accept game",
                  onClick: () => {
                    postConfirm(
                      userInfo.user_info.userSeq,
                      confirmList[gameReqIndex].seq,
                      true,
                      1
                    );
                    setGameButtonToggle(1);
                  },
                  disabled: false,
                });
              } else {
                defineList.push({
                  name: "game",
                  onClick: () => {
                    postGameInvite(userInfo.user_info.userSeq);
                    setGameButtonToggle(1);
                  },
                  disabled: false,
                });
              }
            }
          } else if (gameButtonToggle === 1) {
            if (userInfo.user_info.userStatus === "USST10") {
              defineList.push({
                name: "game request ongoing...",
                onClick: () => {},
                disabled: true,
              });
            }
          }
          if (userInfo.user_info.userStatus === "USST30") {
            defineList.push({
              name: "watch",
              onClick: () => { buttonClickHref("/watch"); },
              disabled: false,
            });
          }
        }

        const realContent: JSX.Element[] = []
        realContent.push(<Profile key={0} response={userInfo} />);
        realContent.push(<Status key={1} status={user.status} />)
        realContent.push(<Buttons key={2} render={defineList} />);

        setContent(
          <>{ realContent }</>
        );
      }
    }).catch((error) => {
      setContent(
        <b style={{ color: "red" }}>An error occurred. {error}</b>
      );
    });
  }, [friendButtonToggle, gameButtonToggle, blockButtonToggle]);

  return (
    <ModalContentDiv>
      {content}
    </ModalContentDiv>
  );
}
/*
  Main Zone End
*/
