import React from "react";
import { styled, keyframes } from "@stitches/react";
import { Routes, Route, useParams } from "react-router-dom";
import * as template from "./contentTemplate";
import * as theme from "../theme/theme";
import { getUserSearch } from "../network/api/axios.custom";
import * as modal from "../component/modal/modal";
import { ReducerType } from "../redux/rootReducer";
import { DisplayData, setModalTrigger } from "../redux/slices/display";

// Profile Zone

function Profile(props: any) {
  const { response, tier } = props;

  const ProfileZone = styled("div", {
    justifyContent: "center",
    alignItems: "center",
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
    border: `5px solid ${tier.tierColor}`,
    boxShadow: `0 0 20px ${tier.tierColor}`
  });

  const ProfileTier = styled("p", {
    marginTop: "1vh",
    fontSize: "2.5vh",
    fontWeight: "bold",
    textOverflow: "ellipsis",
    marginBottom: "-70px",
    color: tier.tierColor,
    textShadow: `0px 0px 10px ${tier.tierColor}`
  });

  const ProfileName = styled("p", {
    fontSize: "6vh",
    fontWeight: "bold",
    textOverflow: "ellipsis",
    marginBottom: "10px",
    color: "white",
    textShadow: "0px 0px 10px white"
  });

  return (
    <ProfileZone>
      <ProfileImage
        src={response.user_info.user_image}
      />
      <ProfileTier>
        ------- {tier.tier} -------
      </ProfileTier>
      <ProfileName>
        {response.user_info.user_name}
      </ProfileName>
    </ProfileZone>
  )
}

// Profile Zone End

// Progress Zone

function Progress(props: any) {
  const { response, tier } = props;

  const Load = keyframes({
    "0%": { width: "0" },
    "100%": { width: `${tier.tierValue}%` },
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
    background: `${tier.tierColor}`,
    borderRadius: "100px",
    height: "22px",
    boxShadow: `0 2px 30px -3px ${tier.tierColor}`,
    width: "0",
    animation: `${Load} 3s normal forwards`,
    fontSize: "18px",
    fontWeight: "bold",
    color: "rgba(0,0,0,0.6)",
  });

  return (
    <ProgressDiv>
      <ProgressValue>{tier.tierValue}%</ProgressValue>
    </ProgressDiv>
  )
}

// Progress Zone End

// Setting Zone

function Setting(props: any) {
  const SettingWrapper = styled("div", {
    color: "white",
    marginBottom: "-5vh"
  });
  return (
    <SettingWrapper>
      <p>Setting</p>
    </SettingWrapper>
  );
}

// Setting Zone End

// History Zone

function History(props: any) {
  const { response, tier } = props;

  const HistoryWrapper = styled("div", {
    width: "88%",
    height: "50vh",
    background: "black",
    marginLeft: "6%",
    marginTop: "5vh",
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
      backgroundColor: `${tier.tierColor}`,
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
    if (response.game_log[i].winner_name === response.user_info.user_name) {
      name = response.game_log[i].loser_name;
      state = "WIN";
      stateColor = "yellow";
    }
    boxes.push(
      <HistoryBox>
        <table style={{ width: "100%", height: "100%" }}>
          <tr>
            <td
              rowSpan={2}
              style={{ width: "35%", textAlign: "left" }}
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
              <b
                style={{
                  fontSize: "25px",
                  color: "white",
                  fontWeight: "bold",
                  textShadow: "0px 0px 10px white",
                }}
              >{name}
              </b>
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
        </table>
      </HistoryBox>
    );
    if (i !== response.game_log.length - 1) {
      boxes.push(<hr style={{
        width: "40%",
        boxShadow: `0 0 5px ${tier.tierColor}`,
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

// Achievement Zone

function Achievement(props: any) {
  const { response, tier } = props;

  const AchievementZone = styled("div", {
    width: "calc(100% - 16px)",
    height: "calc(100% - 16px)",
    margin: "8px",
    overflowY: "scroll",
    overflowX: "hidden",
    "&::-webkit-scrollbar": {
      width: "8px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: `${tier.tierColor}`,
      borderRadius: "10px",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "darkgrey",
      borderRadius: "10px",
    },
  });

  const AchievementBox = styled("div", {
    width: "calc(100% - 8px)",
    height: "20%",
  });

  const boxes = [];
  for (let i = 0; i < response.achiv_info.length; i += 1) {
    let name = response.game_log[i].winner_name;
    let state = "LOSE";
    let stateColor = "red";
    if (response.game_log[i].winner_name === response.user_info.user_name) {
      name = response.game_log[i].loser_name;
      state = "WIN";
      stateColor = "yellow";
    }
    console.log(response.achiv_info[i].achiv_title);
    boxes.push(
      <AchievementBox>
        <table style={{ width: "100%", height: "100%" }}>
          <tr>
            <td
              rowSpan={2}
              style={{ width: "35%", textAlign: "left" }}
            >
              <img
                alt="/asset/profileImage/default.png"
                style={{
                  width: "5rem",
                  height: "5rem",
                }}
                src="/asset/profileImage/default.png"
                // src={response.achiv_info[i].achiv_image}
              />
              <b
                style={{
                  fontSize: "25px",
                  color: "white",
                  fontWeight: "bold",
                  textShadow: "0px 0px 10px white",
                }}
              >{name}
              </b>
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
        </table>
      </AchievementBox>
    );
    if (i !== response.game_log.length - 1) {
      boxes.push(<hr style={{
        width: "40%",
        boxShadow: `0 0 5px ${tier.tierColor}`,
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
});

const DividedRightSection = styled(template.DividedRightSection, {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  textAlign: "center",
});

export function ContainerContents() {
  const { userId } = useParams();
  const response: Promise<any> = getUserSearch(userId);
  response.then((value) => {
    console.log("value : ", value);
  });

  const tier = {
    tier: "master",
    tierColor: theme.TIER_LIST.get("master")[0],
    tierValue: "42",
  };

  const tmpresponse = {
    user_info: {
      user_name: "skim",
      user_email: "skim@42.kr",
      user_secAuthStatus: true,
      user_image: "/asset/profileImage/default.png",
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
    ],
    game_count: {
      count_win: 100,
      count_lose: 100,
      rank_score: 200,
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

  return (
    <template.DividedContents>
      <DividedLeftSection>
        <Profile response={tmpresponse} tier={tier} />
        <Progress response={tmpresponse} tier={tier} />
        <Setting response={tmpresponse} tier={tier} />
        <History response={tmpresponse} tier={tier} />
      </DividedLeftSection>
      <DividedRightSection>
        <Achievement response={tmpresponse} tier={tier} />
      </DividedRightSection>
    </template.DividedContents>
  );
}
