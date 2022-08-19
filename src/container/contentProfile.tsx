/* eslint-disable no-restricted-globals */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable consistent-return */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from "react";
import { styled, keyframes } from "@stitches/react";
import { useParams } from "react-router-dom";
import axios from "axios";
import * as template from "./contentTemplate";
import * as theme from "../theme/theme";
import { checkNameValid, getUserSearch } from "../network/api/axios.custom";

// Profile Zone

function Profile(props: any) {
  const { response, profile } = props;

  const [nickname, setNickname] = useState(response?.user_info.userName);
  const [profileURI, setProfileURI] = useState(`${window.location.origin}${response.user_info.userImage}`);

  const tier = theme.getTierColor(response?.rank_info?.rank_score);

  const ProfileZone = styled("div", {
    justifyContent: "center",
    alignItems: "center",
    marginTop: "-6vh",
  });

  const ProfileImage = styled(theme.ProfileImage, {
    width: "20vh",
    height: "20vh",
    overflow: "hidden",
    position: "relative",
    top: "0rem",
    left: "0rem",
    marginBottom: "-10px",
    borderRadius: "50%",
    border: `5px solid ${tier.color}`,
    boxShadow: `0 0 20px ${tier.color}`,
    cursor: "pointer",
  });

  const ProfileTier = styled("div", {
    marginTop: "1vh",
    fontSize: "2.5vh",
    fontWeight: "bold",
    textOverflow: "ellipsis",
    marginBottom: "-70px",
    color: tier.color,
    textShadow: `0px 0px 10px ${tier.color}`
  });

  const ProfileName = styled("input", {
    fontSize: "6vh",
    width: "80%",
    fontWeight: "bold",
    textOverflow: "ellipsis",
    marginBottom: "10px",
    color: "white",
    background: "none",
    textAlign: "center",
    border: "0",
    textShadow: "0px 0px 10px white"
  });

  const ProfilePictureChangeEvent = async (event:any) => {
    if (!event.target.files[0]) {
      return;
    }
    try {
      const formData = new FormData();
      formData.append("file", event.target.files[0]);
      const imgUp = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      await axios.patch("/api/users/profile", {
        nickName: profile.nickname,
        email: profile.email,
        secAuthStatus: profile.secAuthStatus ? profile.secAuthStatus : false,
        avatarImgUri: imgUp.data,
      });
      setProfileURI(`${window.location.origin}${imgUp.data}`);
    } catch (e) {
      location.reload();
    }
  }

  const ProfileNameChangeEvent = (event:any) => {
    if (event.key === "Enter") {
      if (checkNameValid(event.target.value) === true) {
        axios.patch("/api/users/profile", {
          nickName: event.target.value,
          email: profile.email,
          secAuthStatus: profile.secAuthStatus ? profile.secAuthStatus : false,
          avatarImgUri: profile.avartarImgUri,
        }).then(() => {
          setNickname(event.target.value);
          location.reload();
        });
      } else {
        // location.reload();
      }
    }
  }

  return (
    <ProfileZone>
      <input
        type="file"
        accept="image/jpg, image/png, image/jpeg, image/gif"
        onChange={ProfilePictureChangeEvent}
        style={{ display: "none" }}
        id="picture_change_input"
      />
      <ProfileImage
        src={profileURI}
        onClick={() => {
          document.getElementById("picture_change_input")?.click();
        }}
      />
      <ProfileTier>
        <div
          style={{
            marginLeft: "35px",
            float: "left",
            width: "calc(33% - 20px)", }}
        >
          <hr
            style={{
              width: "50%",
              marginRight: "0%",
              border: `solid 4px ${tier.color}`,
              boxShadow: `0 0 20px ${tier.color}`,
              borderRadius: "10px 0 0 10px", }}
          />
        </div>
        <div
          style={{
            float: "left",
            width: "calc(33% - 20px)",
            fontWeight: "300", }}
        >{tier.name}
        </div>
        <div
          style={{
            float: "left",
            width: "calc(33% - 20px)", }}
        ><hr
          style={{
            width: "50%",
            marginLeft: "0%",
            border: `solid 4px ${tier.color}`,
            boxShadow: `0 0 20px ${tier.color}`,
            borderRadius: "0 10px 10px 0", }}
        />
        </div>
      </ProfileTier>
      <ProfileName
        type="text"
        defaultValue={nickname}
        onKeyPress={ProfileNameChangeEvent}
      />
    </ProfileZone>
  )
}

// Profile Zone End

// Progress Zone

function Progress(props: any) {
  const { response } = props;

  const tier = theme.getTierColor(response?.rank_info.rank_score);
  const value = Math.floor(theme.getTierPercent(response?.rank_info.rank_score));

  const Load = keyframes({
    "0%": { width: "0" },
    "100%": { width: `${value}%` },
  });

  const ProgressDiv = styled("div", {
    background: "rgba(255,255,255,0.1)",
    justifyContent: "flex-start",
    borderRadius: "100px",
    alignItems: "center",
    position: "relative",
    padding: "0",
    display: "flex",
    height: "22px",
    width: "70%",
    marginLeft: "15%",
  });

  const ProgressValue = styled("div", {
    background: `${tier.color}`,
    borderRadius: "1000px",
    overflow: "hidden",
    height: "22px",
    boxShadow: `0 2px 30px -3px ${tier.color}`,
    width: "0",
    animation: `${Load} 3s normal forwards`,
    fontSize: "18px",
    fontWeight: "bold",
    color: "rgba(0,0,0,0.6)",
  });

  return (
    <ProgressDiv>
      <ProgressValue>{value}%</ProgressValue>
    </ProgressDiv>
  )
}

// Progress Zone End

// History Zone

function History(props: any) {
  const { response } = props;
  const tier = theme.getTierColor(response?.rank_info.rank_score);

  const HistoryWrapper = styled("div", {
    width: "76%",
    height: "50vh",
    background: "black",
    marginLeft: "12%",
    marginTop: "1.5vh",
    borderRadius: "5px",
    border: "1px solid white",
    boxShadow: "0 0 5px white",
    transition: "all 0.5s",
  });

  const HistoryZone = styled("div", {
    width: "calc(100% - 16px)",
    height: "calc(100% - 16px)",
    margin: "8px",
    overflowY: "scroll",
    overflowX: "hidden",
    "&::-webkit-scrollbar": {
      width: "8px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: `${tier.color}`,
      borderRadius: "10px",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "darkgrey",
      borderRadius: "10px",
    },
  });

  const HistoryBox = styled("div", {
    width: "calc(100% - 8px)",
    height: "20%",
  });

  const boxes = [];
  for (let i = 0; i < response?.game_log.length; i += 1) {
    let name = response?.game_log[i].winner_name;
    let state = "LOSE";
    let stateColor = "red";
    if (response?.game_log[i].winner_name === response?.user_info.userName) {
      name = response?.game_log[i].loser_name;
      state = "WIN";
      stateColor = "yellow";
    }
    boxes.push(
      <HistoryBox key={i}>
        <table style={{ width: "100%", height: "100%" }}>
          <tbody>
            <tr key={0}>
              <td rowSpan={2} style={{ width: "35%", textAlign: "left" }}>
                <div style={{
                  fontSize: "25px",
                  color: "white",
                  fontWeight: "bold",
                  textShadow: "0px 0px 10px white",
                }}
                >
                  <b style={{
                    marginLeft: "10px",
                    fontSize: "20px",
                    color: "#FFFFFF90",
                    fontWeight: "bold",
                    textShadow: "0px 0px 10px #FFFFFF90",
                  }}
                  >vs:&nbsp;
                  </b>{name}
                </div>
              </td>
              <td style={{ textAlign: "right", }}>
                <b style={{
                  color: "gray",
                  fontSize: "10px",
                  fontWeight: "0",
                  fontStyle: "italic",
                }}
                >{response?.game_log[i].start_time}&nbsp;&nbsp;
                </b>
                <b style={{
                  color: `${stateColor}`,
                  fontSize: "20px",
                  fontWeight: "bold",
                  fontStyle: "italic",
                  textShadow: `0px 0px 10px ${stateColor}`,
                }}
                >{state}
                </b>
              </td>
            </tr>
            <tr key={1}>
              <td style={{
                height: "30px",
                marginTop: "-15px",
                textAlign: "right",
              }}
              >
                <b style={{
                  color: "white",
                  fontSize: "30px",
                  fontWeight: "bold",
                  fontStyle: "italic",
                  textShadow: `0px 0px 10px ${stateColor}`,
                }}
                >{response?.game_log[i].loser_score} : {response?.game_log[i].winner_score}
                </b>
              </td>
            </tr>
          </tbody>
        </table>
      </HistoryBox>
    );
    if (i !== response?.game_log.length - 1) {
      boxes.push(<hr style={{
        width: "40%",
        boxShadow: `0 0 5px ${tier.color}`,
      }}
      />);
    }
  }
  if (response?.game_log.length === 0) {
    boxes.push(
      <div
        style={{
          color: "gray",
          fontSize: "24px",
          fontWeight: "300",
          marginTop: "12px",
        }}
        key={0}
      >
        Game history is empty -_-
      </div>
    );
  }
  return (
    <HistoryWrapper>
      <HistoryZone>
        {boxes}
      </HistoryZone>
    </HistoryWrapper>
  );
}

// History Zone End

// Setting Zone

function Setting(props: any) {
  const { response, profile } = props;
  const SettingWrapper = styled("div", {
    color: "white",
    margin: "1vh",
    marginBottom: "-5vh"
  });
  const tier = theme.getTierColor(response?.rank_info.rank_score);
  const secAuthText = response?.user_info.userSecAuthStatus ? "ON" : "OFF";
  const secAuthColor = response?.user_info.userSecAuthStatus ? tier.color : "#D8D8D8";

  const SecAuthToggle = () => {
    axios.patch("/api/users/profile", {
      nickName: profile.nickname,
      email: profile.email,
      secAuthStatus: !(profile.secAuthStatus),
      avatarImgUri: profile.avartarImgUri,
    }).then(() => {
      // console.log("updated!", res);
      location.reload();
    }).catch(() => {
      // console.log("error!", err);
      location.reload();
    });
  }

  return (
    <SettingWrapper>
      <button
        type="button"
        id="toggle"
        style={{
          margin: "1vh",
          width: "15vw",
          height: "2.5vh",
          display: "inline-block",
          borderRadius: "2rem",
          backgroundColor: `${secAuthColor}`,
          cursor: "pointer",
          color: "black",
          fontSize: "1rem",
          border: "none",
          boxShadow: `0 0 10px ${secAuthColor}`,
        }}
        onClick={SecAuthToggle}
      >
        2nd Verification: <b>{secAuthText}</b>
      </button>
    </SettingWrapper>
  );
}

// Setting Zone End

// Achievement Zone

function Achievement(props: any) {
  const { response } = props;
  const tier = theme.getTierColor(response?.rank_info.rank_score);

  const AchievementZone = styled("div", {
    width: "calc(100% - 16px)",
    height: "calc(100% - 16px)",
    overflowY: "scroll",
    overflowX: "hidden",
    "&::-webkit-scrollbar": {
      width: "8px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: `${tier.color}`,
      borderRadius: "10px",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "darkgrey",
      borderRadius: "10px",
    },
  });

  const AchievementBox = styled("div", {
    width: "calc(100% - 8px)",
    height: "15%",
    // display: "flex",
    // justifyContent: "center",
    position: "relative",
  });

  const AchievementImage = styled("img", {
    height: "13vh",
    width: "13vh",
    position: "absolute",
    left: "13px",
    top: "0",
  })

  const AchievementText = styled("b", {
    marginLeft: "1vh",
    position: "absolute",
    transform: "translate(0,-50%)",
    textAlign: "left",
  });

  const boxes = [];
  for (let i = 0; i < response?.achiv_info.length; i += 1) {
    let title = response?.achiv_info[i].achiv_title.substr(0, 15);
    let textColor = "white";
    let tierColor = tier.color;
    let opacity = 1.0;
    if (response?.achiv_info[i].achiv_title.length > 15) {
      title += "...";
    }
    if (response?.achiv_info[i].achiv_complete === false) {
      tierColor = "gray";
      textColor = "gray";
      opacity = 0.3;
    }
    boxes.push(
      <AchievementBox key={i.toString()}>
        <AchievementImage
          alt="error"
          src="/asset/achiv.jpg"
          style={{
            border: `1px solid ${tierColor}`,
            boxShadow: `0 0 10px ${tierColor}`,
            opacity: `${opacity}`,
          }}
        />
        <AchievementText
          style={{
            color: "white",
            fontSize: "4vh",
            textShadow: "0px 0px 8px white",
            top: "40%",
            left: "15vh",
          }}
        >
          {title}
        </AchievementText><br />
        <AchievementText
          style={{
            color: `${textColor}`,
            fontSize: "3vh",
            textShadow: `0px 0px 4px ${textColor}`,
            fontWeight: "300",
            top: "70%",
            left: "15vh",
          }}
        >
          {response?.achiv_info[i].achiv_condition}aa
        </AchievementText>
      </AchievementBox>
    );
    if (i !== response?.achiv_info?.length - 1) {
      boxes.push(<hr
        style={{
          marginRight: "10%",
          width: "60%",
          boxShadow: `0 0 5px ${tier.color}`,
        }}
        key={(i + response?.achiv_info.length).toString()}
      />);
    }
  }

  return (
    <AchievementZone>
      {boxes}
    </AchievementZone>
  );
}

// Achievement Zone End

const DividedLeftSection = styled(template.DividedLeftSection, {
  justifyContent: "center",
  textAlign: "center",
  overflow: "hidden",
  width: "550px",
});

const DividedRightSection = styled(template.DividedRightSection, {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  textAlign: "center",
  width: "calc(100% - 570px)",
});

function isNumber(str: any): boolean {
  if (typeof str !== "string") {
    return false;
  }

  if (str.trim() === "") {
    return false;
  }

  return !Number.isNaN(Number(str));
}

export function ContainerContents() {
  const { userSeq } = useParams();

  const [left, setLeft] = useState<JSX.Element>(
    <div>
      <b>존재하지 않는 유저입니다.</b>
    </div>
  );
  const [right, setRight] = useState<JSX.Element>(
    <div>
      <b>존재하지 않는 유저입니다.</b>
    </div>
  );
  useEffect(() => {
    let searchSeq: any = "-1";
    if (isNumber(userSeq)) searchSeq = userSeq;
    getUserSearch(searchSeq).then((response) => {
      const anyResponse: any = response
      const userInfo = anyResponse?.data;
      const profile = {
        nickname: userInfo?.user_info?.userName,
        email: userInfo?.user_info?.userEmail,
        secAuthStatus: userInfo?.user_info?.userSecAuthStatus,
        avartarImgUri: userInfo?.user_info?.userImage,
      };
      if (anyResponse?.name !== "AxiosError") {
        setLeft(
          <>
            <Profile response={userInfo} profile={profile} />
            <Progress response={userInfo} profile={profile} />
            <History response={userInfo} profile={profile} />
            <Setting response={userInfo} profile={profile} />
          </>
        );
        setRight(
          <>
            <Achievement response={userInfo} profile={profile} />
          </>
        );
      }
    });
  }, []);
  return (
    <template.DividedContents>
      <DividedLeftSection>
        {left}
      </DividedLeftSection>
      <DividedRightSection>
        {right}
      </DividedRightSection>
    </template.DividedContents>
  );
}
