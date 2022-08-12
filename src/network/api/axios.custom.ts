import { useSelector } from "react-redux";
import { ReducerType } from "../../redux/rootReducer";
import { addChoosableAlam, ChoosableAlamData, clearChoosableAlamList, removeChoosableAlam } from "../../redux/slices/choosableAlamList";
import { addCommonAlam, CommonAlamData, clearCommonAlamList, removeCommonAlam } from "../../redux/slices/commonAlam";
import { addFriend, FriendData, removeFriendList } from "../../redux/slices/friendList";
import { LoggedUserData, setLoggedUser } from "../../redux/slices/loggedUser";
import store from "../../redux/store";
import * as axios from "./axios.instance";

/**
 * example
 *
 * API_NAME : export해서 사용하기 위한 API 요청 변수 이름
 * HTTP_METHOD : HTTP method 종류
 *               get | post | delete | patch | put | head | options
 * [, DATA] : HTTP 요청의 데이터
 *            post, put, patch에만 적용
 *            {
 *              userId: 1,
 *              roomName: "testroom",
 *              roomType: "public",
 *            }
 * [, CONFIG] : HTTP 요청에 대한 설정
 *              객체 형태로 전달
 *              {
 *                params: {
 *                  userId: 1,
 *                },
 *                timeout: 0,
 *              }
 *
 * export const API_NAME = async() => {
 *   try{
 *     const response = await axios.instance.HTTP_METHOD.('API URL'[, DATA][, CONFIG]);
 *     // response 에 대한 작업
 *     return (response);
 *   } catch(error) {
 *     // error 에 대한 작업
 *     return (error);
 *   }
 * }
 */

// --------------------------------------------------------------
// utils

export function checkNameValid(name: string) {
  const regex = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/;
  return (regex.test(name));
}

export const getLoggedUserProfile = async () => {
  try {
    const response = await axios.instance.get("/users/profile");

    store.dispatch(setLoggedUser(
      {
        seq: response.data.user_info.userSeq,
        nick: response.data.user_info.userName,
        mail: response.data.user_info.userEmail,
        img: response.data.user_info.userImage,
        status: response.data.user_info.userStatus
      } as LoggedUserData
    ));
    return (null);
  } catch (error) {
    return (error);
  }
};

// --------------------------------------------------------------
// API for Navbar feature

export const getFriendList = async () => {
  try {
    const response = await axios.instance.get("/community/friends");

    store.dispatch(removeFriendList({} as FriendData));
    for (let i = 0; i < response.data.length; i += 1) {
      store.dispatch(addFriend({
        seq: response.data[i].userSeq,
        nick: response.data[i].nickname,
        img: response.data[i].avatarImgUri,
        status: response.data[i].status } as FriendData));
    }
    return (null);
  } catch (error) {
    return (error);
  }
}

export const getCommonAlamList = async () => {
  try {
    const response = await axios.instance.get("/alarm/alerts");

    store.dispatch(clearCommonAlamList({} as CommonAlamData));
    for (let i = 0; i < response.data.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const response2 = await axios.instance.get(`/users/profile/${response.data[i].from}`);
      store.dispatch(addCommonAlam({
        seq: response.data[i].alarmSeq,
        from_seq: response.data[i].from,
        from_nick: response2.data.user_info.userName,
        type: response.data[i].type,
        code: response.data[i].code } as CommonAlamData));
    }
    return (null);
  } catch (error) {
    return (error);
  }
}

export const getConfirmAlamList = async () => {
  try {
    const response = await axios.instance.get("/alarm/confirms");

    console.log("Confirm alarm list process start!", response);
    store.dispatch(clearChoosableAlamList({} as ChoosableAlamData));
    console.log("Confirm alarm clear!");
    for (let i = 0; i < response.data.length; i += 1) {
      console.log("Confirm alarm list loop!", i);
      // eslint-disable-next-line no-await-in-loop
      const response2 = await axios.instance.get(`/users/profile/${response.data[i].from}`);
      console.log("Confirm alarm list response2 = ", response2);
      let typeNum: number = 0;
      if (response.data[i].code === "ALAM21") {
        typeNum = 1;
      }
      const alarmList
      = useSelector<ReducerType, ChoosableAlamData[]>((state) => state.choosableAlamList);
      console.log("Confirm alarm list = ", alarmList);
      const newAlarmCell: ChoosableAlamData = {
        seq: response.data[i].alarmSeq,
        from_seq: response.data[i].from,
        from_nick: response2.data.user_info.userName,
        type: typeNum,
      };
      console.log("New confirm alarm list = ", newAlarmCell);
      if (!alarmList.includes(newAlarmCell)) {
        console.log("Confirm alarm pushed");
        store.dispatch(addChoosableAlam(newAlarmCell));
      }
    }
    return (null);
  } catch (error) {
    return (error);
  }
}

// eslint-disable-next-line max-len
export const postConfirm = async (userSeq: string, alarmSeq: string, isAccept: boolean, alarmType: number) => {
  try {
    if (alarmType === 0) {
      if (isAccept) {
        await axios.instance.post(`/community/friends/accept/${userSeq}`);
        store.dispatch(removeChoosableAlam({ seq: alarmSeq } as ChoosableAlamData));
      } else {
        await axios.instance.post(`/community/friends/reject/${userSeq}`);
        store.dispatch(removeChoosableAlam({ seq: alarmSeq } as ChoosableAlamData));
      }
    } else if (alarmType === 1) {
      if (isAccept) {
        await axios.instance.put(`/game/accept/${alarmSeq}`);
        store.dispatch(removeChoosableAlam({ seq: alarmSeq } as ChoosableAlamData));
      } else {
        await axios.instance.put(`/game/reject/${alarmSeq}`);
        store.dispatch(removeChoosableAlam({ seq: alarmSeq } as ChoosableAlamData));
      }
    }
    return (null);
  } catch (error) {
    return (error);
  }
}

export const putAlarmRead = async (alamSeq: string) => {
  try {
    await axios.instance.put(`/alarm/${alamSeq}`);
    store.dispatch(removeCommonAlam({ seq: alamSeq } as CommonAlamData));
    return (null);
  } catch (error) {
    return (error);
  }
}

export const postFriendRequest = async (userSeq: string) => {
  try {
    await axios.instance.post(`/community/friends/request/${userSeq}`);
    return (null);
  } catch (error) {
    return (error);
  }
}

export const postFriendDelete = async (userSeq: string) => {
  try {
    await axios.instance.post(`/community/friends/delete/${userSeq}`);
    return (null);
  } catch (error) {
    return (error);
  }
}

export const requestUserBlock = async (userSeq: string) => {
  try {
    await axios.instance.get(`/community/friends/block/${userSeq}`);
    return (null);
  } catch (error) {
    return (error);
  }
}

export const requestUserUnblock = async (userSeq: string) => {
  try {
    await axios.instance.get(`/community/friends/unblock/${userSeq}`);
    return (null);
  } catch (error) {
    return (error);
  }
}

export const postNewDM = async (userSeq: string) => {
  try {
    await axios.instance.post(`/chatrooms/new/dm/${userSeq}`);
    return (null);
  } catch (error) {
    return (error);
  }
}

export const postGameInvite = async (userSeq: string) => {
  try {
    await axios.instance.post(`/game/invite/${userSeq}`);
    return (null);
  } catch (error) {
    return (error);
  }
}

// --------------------------------------------------------------
// API for Profile feature

export const getUserSearch = async (searchSeq: string) => {
  try {
    const response = await axios.instance.get(`/users/profile/${searchSeq}`);
    return (response);
  } catch (error) {
    return (error);
  }
}

export const getUserSimpleSearch = async (searchString: string) => {
  try {
    if (checkNameValid(searchString) === false) {
      throw new Error("userName is invalid!");
    }
    const response = await axios.instance.get(`/users/search/nickname/${searchString}`);
    return (response);
  } catch (error) {
    return (error);
  }
}

// --------------------------------------------------------------
// API for Game feature

export const inviteUser = async (userSeq: number, chatSeq: number) => {
  try {
    const response = await axios.instance.put(`/chatrooms/invite/${userSeq}/${chatSeq}`);
    return (response);
  } catch (error) {
    return (error);
  }
}

// --------------------------------------------------------------
// API for Chat feature

export const chatroomsSearch = async () => {
  try {
    const response = await axios.instance.get("/chatrooms/search");
    return (response);
  } catch (error) {
    return (error);
  }
};

export const chatUserCount = async (chatSeq: string) => {
  try {
    const response = await axios.instance.get(`/chatrooms/room/${chatSeq}`);
    return (response);
  } catch (error) {
    return (error);
  }
}

export const getAllMessages = async (chatSeq: number) => {
  try {
    const response = await axios.instance.get(`chatrooms/message/${chatSeq}/-1/10`);
    return (response);
  } catch (error) {
    return (error);
  }
}

// --------------------------------------------------------------
// auth (twofactor)

export const sendAuthCode = async () => {
  try {
    const response = await axios.instance.get("/auth/twofactor/check");
    return (response);
  } catch (error) {
    return (error);
  }
}

export const checkAuthCode = async (code: string) => {
  try {
    const response = await axios.instance.get(`/auth/twofactor/code/${code}`);
    return (response);
  } catch (error) {
    return (error);
  }
}
