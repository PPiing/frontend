/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from "react";
import { styled, keyframes } from "@stitches/react";
import { Routes, Route, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import * as template from "./contentTemplate";
import * as theme from "../theme/theme";
import { getUserSearch } from "../network/api/axios.custom";
import * as modal from "../component/modal/modal";
import { ModalNavFriendBox } from "../component/modal/content/modalNavFriendBox";
import { DisplayData, setModalTrigger } from "../redux/slices/display";

// Profile Zone

function Profile(props: any) {
  const { response, profile } = props;

  const tier = theme.getTierColor(response.rank_info.rank_score);

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
    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    console.log("formData :", formData);
    const uploadFile = await axios.post("/api/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("uploadFileName :", uploadFile.data);
    await axios.patch("/api/users/profile", {
      nickName: profile.nickName,
      email: profile.email,
      secAuthStatus: profile.secAuthStatus,
      avatarImgUri: `/api/upload/${uploadFile.data}`, // "f1ece5d0-93a8-458a-8363-f4da888b118a.jpeg"
    }).then((res) => {
      console.log("updated :", res);
    }).then((err) => {
      console.log("error :", err);
    });
  }

  const ProfileNameChangeEvent = (event:any) => {
    if (event.key === "Enter") {
      axios.patch("/api/users/profile", {
        nickName: event.target.value,
        email: profile.email,
        secAuthStatus: profile.secAuthStatus,
        avatarImgUri: profile.avartarImgUri,
      }).then((res) => {
        console.log("updated!", res);
      }).then((err) => {
        console.log("error!", err);
      });
    }
  }

  return (
    <ProfileZone>
      <input
        type="file"
        accept="image/jpg,impge/png,image/jpeg,image/gif"
        onChange={ProfilePictureChangeEvent}
        style={{ display: "none" }}
        id="picture_change_input"
      />
      <ProfileImage
        src={response.user_info.userImage}
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
              width: "75%",
              marginRight: "-20%",
              border: `solid 8px ${tier.color}`,
              boxShadow: `0 0 20px ${tier.color}`,
              borderRadius: "2px 0 0 10px", }}
          />
        </div>
        <div
          style={{
            float: "left",
            width: "calc(33% - 20px)", }}
        >{tier.name}
        </div>
        <div
          style={{
            float: "left",
            width: "calc(33% - 20px)", }}
        ><hr
          style={{
            width: "75%",
            marginLeft: "-20%",
            border: `solid 4px ${tier.color}`,
            boxShadow: `0 0 20px ${tier.color}`,
            borderRadius: "0 10px 10px 0", }}
        />
        </div>
      </ProfileTier>
      <ProfileName
        type="text"
        defaultValue={response.user_info.userName}
        onKeyPress={ProfileNameChangeEvent}
      />
    </ProfileZone>
  )
}

// Profile Zone End

// Progress Zone

function Progress(props: any) {
  const { response, profile } = props;

  const tier = theme.getTierColor(response.rank_info.rank_score);
  const value = Math.floor(theme.getTierPercent(response.rank_info.rank_score));

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
  const { response, profile } = props;
  const dispatch = useDispatch();
  const tier = theme.getTierColor(response.rank_info.rank_score);

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
  for (let i = 0; i < response.game_log.length; i += 1) {
    let name = response.game_log[i].winner_name;
    let state = "LOSE";
    let stateColor = "red";
    if (response.game_log[i].winner_name === response.user_info.userName) {
      name = response.game_log[i].loser_name;
      state = "WIN";
      stateColor = "yellow";
    }
    boxes.push(
      <HistoryBox key={i.toString()}>
        <table style={{ width: "100%", height: "100%" }}>
          <tbody>
            <tr>
              <td
                rowSpan={2}
                style={{ width: "35%", textAlign: "left" }}
              >
                <div
                  style={{
                    fontSize: "25px",
                    color: "white",
                    fontWeight: "bold",
                    textShadow: "0px 0px 10px white",
                  }}
                  onClick={() => {
                    modal.SetModalSize("300px", "460px", "10%", "75%");
                    modal.SetModalContent(<ModalNavFriendBox user={response} />);
                    dispatch(setModalTrigger({ ismodal: true } as DisplayData));
                  }}
                >
                  <b
                    style={{
                      marginLeft: "10px",
                      fontSize: "20px",
                      color: "#FFFFFF90",
                      fontWeight: "bold",
                      textShadow: "0px 0px 10px #FFFFFF90",
                    }}
                  >
                    vs:&nbsp;
                  </b>
                  {name}
                </div>
              </td>
              <td
                style={{
                  textAlign: "right",
                }}
              >
                <b
                  style={{
                    color: "gray",
                    fontSize: "10px",
                    fontWeight: "0",
                    fontStyle: "italic",
                  }}
                >
                  {response.game_log[i].start_time}&nbsp;&nbsp;
                </b>
                <b
                  style={{
                    color: `${stateColor}`,
                    fontSize: "20px",
                    fontWeight: "bold",
                    fontStyle: "italic",
                    textShadow: `0px 0px 10px ${stateColor}`,
                  }}
                >
                  {state}
                </b>
              </td>
            </tr>
            <tr>
              <td
                style={{
                  height: "30px",
                  marginTop: "-15px",
                  textAlign: "right",
                }}
              >
                <b
                  style={{
                    color: "white",
                    fontSize: "30px",
                    fontWeight: "bold",
                    fontStyle: "italic",
                    textShadow: `0px 0px 10px ${stateColor}`,
                  }}
                >
                  {response.game_log[i].loser_score} : {response.game_log[i].winner_score}
                </b>
              </td>
            </tr>
          </tbody>
        </table>
      </HistoryBox>
    );
    if (i !== response.game_log.length - 1) {
      boxes.push(<hr style={{
        width: "40%",
        boxShadow: `0 0 5px ${tier.color}`,
      }}
      />);
    }
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
  const tier = theme.getTierColor(response.rank_info.rank_score);
  const SecAuthText = response.user_info.secAuthStatus === true ? "ON" : "OFF";
  const SecAuthColor = response.user_info.secAuthStatus === true ? tier.color : "#D8D8D8";
  const SecAuthToggle = () => {
    axios.patch("/api/users/profile", {
      nickName: profile.nickName,
      email: profile.email,
      secAuthStatus: !(profile.secAuthStatus),
      avatarImgUri: profile.avartarImgUri,
    }).then((res) => {
      console.log("updated!", res);
    }).then((err) => {
      console.log("error!", err);
    });
  }

  return (
    <SettingWrapper>
      <button
        type="button"
        id="toggle"
        style={{
          margin: "1vh",
          width: "10rem",
          height: "2.5vh",
          display: "inline-block",
          borderRadius: "2rem",
          backgroundColor: `${SecAuthColor}`,
          cursor: "pointer",
          color: "black",
          fontSize: "1rem",
          border: "none",
          boxShadow: `0 0 10px ${SecAuthColor}`,
        }}
        onClick={SecAuthToggle}
      >
        2nd Verification: <b>{SecAuthText}</b>
      </button>
    </SettingWrapper>
  );
}

// Setting Zone End

// Achievement Zone

function Achievement(props: any) {
  const { response, profile } = props;
  const tier = theme.getTierColor(response.rank_info.rank_score);

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

  const AchievementText = styled("b", {
    marginLeft: "1vh",
    position: "absolute",
    transform: "translate(0,-50%)",
    textAlign: "left",
  });

  const boxes = [];
  for (let i = 0; i < response.achiv_info.length; i += 1) {
    let title = response.achiv_info[i].achiv_title.substr(0, 15);
    let textColor = "white";
    let tierColor = tier.color;
    if (response.achiv_info[i].achiv_title.length > 15) {
      title += "...";
    }
    if (response.achiv_info[i].achiv_complete === false) {
      tierColor = "gray";
      textColor = "gray";
    }
    boxes.push(
      <AchievementBox key={i.toString()}>
        <img
          alt="error"
          src={response.achiv_info[i].achiv_image}
          style={{
            height: "13vh",
            width: "13vh",
            position: "absolute",
            left: "13px",
            top: "0",
            border: `3px solid ${tierColor}`,
            boxShadow: `0 0 10px ${tierColor}`,
          }}
        />
        <AchievementText
          style={{
            color: `${textColor}`,
            fontSize: "5vh",
            textShadow: `0px 0px 8px ${textColor}`,
            top: "40%",
            left: "15vh",
          }}
        >
          {title}
        </AchievementText><br />
        <AchievementText
          style={{
            color: `${textColor}`,
            fontSize: "2vh",
            textShadow: `0px 0px 4px ${textColor}`,
            top: "70%",
            left: "15vh",
          }}
        >
          {response.achiv_info[i].achiv_condition}
        </AchievementText>
      </AchievementBox>
    );
    if (i !== response.achiv_info.length - 1) {
      boxes.push(<hr style={{
        marginRight: "10%",
        width: "60%",
        boxShadow: `0 0 5px ${tier.color}`,
      }}
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

export function ContainerContents() {
  const { userId } = useParams();
  const [userInfo, setUserInfo] = useState({} as any);
  const response = getUserSearch(userId || "");

  const tmpresponse = {
    user_info: {
      userSeq: "1",
      userName: "skim",
      userEmail: "skim@42.kr",
      secAuthStatus: true,
      userImage: "/asset/profileImage/default.png",
      isFriend: false,
      isBlock: false,
    },
    achiv_info: [
      {
        achiv_title: "기본",
        achiv_condition: "none",
        achiv_image: "/asset/profileImage/default.png",
        achiv_complete: true,
      },
      {
        achiv_title: "기본2",
        achiv_condition: "none",
        achiv_image: "/asset/profileImage/default.png",
        achiv_complete: true,
      },
      {
        achiv_title: "기본3",
        achiv_condition: "none",
        achiv_image: "/asset/profileImage/default.png",
        achiv_complete: true,
      },
      {
        achiv_title: "기본4",
        achiv_condition: "none",
        achiv_image: "/asset/profileImage/default.png",
        achiv_complete: true,
      },
      {
        achiv_title: "기본5",
        achiv_condition: "none",
        achiv_image: "/asset/profileImage/default.png",
        achiv_complete: true,
      },
      {
        achiv_title: "기본6",
        achiv_condition: "none",
        achiv_image: "/asset/profileImage/default.png",
        achiv_complete: true,
      },
      {
        achiv_title: "기본777777777777777777기본777777777777777777",
        achiv_condition: "100연승이라니!! 너 혹시 미쳤니?",
        achiv_image: "/asset/profileImage/default.png",
        achiv_complete: true,
      },
      {
        achiv_title: "기본8",
        achiv_condition: "none",
        achiv_image: "/asset/profileImage/default.png",
        achiv_complete: true,
      },
      {
        achiv_title: "기본9",
        achiv_condition: "none",
        achiv_image: "/asset/profileImage/default.png",
        achiv_complete: false,
      },
    ],
    rank_info: {
      rank_score: 1500,
      rank_name: "challenger",
    },
    game_log: [
      {
        winner_name: "kkim",
        loser_name: "skim",
        game_type: "rank",
        winner_score: 11,
        loser_score: 9,
        start_time: "2022.07.06 18:12",
      },
      {
        winner_name: "skim",
        loser_name: "kkim",
        game_type: "rank",
        winner_score: 7,
        loser_score: 11,
        start_time: "2022.07.06 18:01",
      },
      {
        winner_name: "kkim",
        loser_name: "skim",
        game_type: "rank",
        winner_score: 11,
        loser_score: 10,
        start_time: "2022.07.06 17:56",
      },
      {
        winner_name: "poopark",
        loser_name: "skim",
        game_type: "rank",
        winner_score: 11,
        loser_score: 2,
        start_time: "2022.07.06 16:08",
      },
      {
        winner_name: "poopark",
        loser_name: "skim",
        game_type: "rank",
        winner_score: 11,
        loser_score: 0,
        start_time: "2022.07.06 15:56",
      },
      {
        winner_name: "spark",
        loser_name: "skim",
        game_type: "rank",
        winner_score: 11,
        loser_score: 10,
        start_time: "2022.07.05 16:08",
      },
    ]
  }

  let profile = {
    nickname: tmpresponse.user_info.userName,
    email: tmpresponse.user_info.userEmail,
    secAuthStatus: tmpresponse.user_info.secAuthStatus,
    avartarImgUri: tmpresponse.user_info.userImage,
  }

  response.then((value) => {
    setUserInfo(value);
    profile = {
      nickname: userInfo.data?.user_info.userName,
      email: userInfo.data?.user_info.userEmail,
      secAuthStatus: userInfo.data?.user_info.secAuthStatus,
      avartarImgUri: userInfo.data?.user_info.userImage,
    }
    console.log("response : ", response);
    console.log("value : ", value);
    console.log("userInfo.data : ", userInfo.data);
    console.log("profile : ", profile);
    return (
      <template.DividedContents>
        <DividedLeftSection>
          <Profile response={userInfo.data} profile={profile} />
          <Progress response={userInfo.data} profile={profile} />
          <History response={userInfo.data} profile={profile} />
          <Setting response={userInfo.data} profile={profile} />
        </DividedLeftSection>
        <DividedRightSection>
          <Achievement response={userInfo.data} profile={profile} />
        </DividedRightSection>
      </template.DividedContents>
    );
  }).catch((error) => {
    return (<template.Contents>존재하지 않는 유저입니다.</template.Contents>)
  });
  return (<template.Contents>존재하지 않는 유저입니다.</template.Contents>)
  // return (
  //   <template.DividedContents>
  //     <DividedLeftSection>
  //       <Profile response={tmpresponse} profile={profile} />
  //       <Progress response={tmpresponse} profile={profile} />
  //       <History response={tmpresponse} profile={profile} />
  //       <Setting response={tmpresponse} profile={profile} />
  //     </DividedLeftSection>
  //     <DividedRightSection>
  //       <Achievement response={tmpresponse} profile={profile} />
  //     </DividedRightSection>
  //   </template.DividedContents>
  // );
}
