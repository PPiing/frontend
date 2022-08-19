import { addBlockUser, BlockData, clearBlockList } from "../../redux/slices/blockList";
import { addChoosableAlam, ChoosableAlamData, clearChoosableAlamList, removeChoosableAlam, removeOverlapChoosableAlam } from "../../redux/slices/choosableAlamList";
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
  // const regex = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]{1-11}+$/;
  const regex = /^[a-zA-Zㄱ-ㅎ가-힣0-9]+$/;
  if (regex.test(name)) {
    if (name.length < 11 && name.length >= 1) return true;
  }
  return false;
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

export const getBlockUserList = async () => {
  try {
    const response = await axios.instance.get("/community/friends/blocklist");
    store.dispatch(clearBlockList({} as BlockData));
    for (let i = 0; i < response.data.length; i += 1) {
      store.dispatch(addBlockUser({
        seq: response.data[i]
      } as BlockData));
    }
    return (null);
  } catch (error) {
    return (error);
  }
}

export const getFriendList = async () => {
  try {
    const response = await axios.instance.get("/community/friends");
    const { blockList } = store.getState();

    store.dispatch(removeFriendList({} as FriendData));
    for (let i = 0; i < response.data.length; i += 1) {
      let bBlock: boolean = false;
      for (let ii = 0; ii < blockList.length; ii += 1) {
        if (blockList[ii].seq === String(response.data[i].userSeq)) {
          bBlock = true;
          break;
        }
      }
      if (!bBlock) {
        store.dispatch(addFriend({
          seq: response.data[i].userSeq,
          nick: response.data[i].nickname,
          img: response.data[i].avatarImgUri,
          status: response.data[i].status } as FriendData));
      }
    }
    return (null);
  } catch (error) {
    return (error);
  }
}

export const getCommonAlamList = async () => {
  try {
    const response = await axios.instance.get("/alarm/alerts");
    const { blockList } = store.getState();

    store.dispatch(clearCommonAlamList({} as CommonAlamData));
    for (let i = 0; i < response.data.length; i += 1) {
      let bBlock: boolean = false;
      for (let ii = 0; ii < blockList.length; ii += 1) {
        if (blockList[ii].seq === String(response.data[i].userSeq)) {
          bBlock = true;
          break;
        }
      }
      if (!bBlock) {
        // eslint-disable-next-line no-await-in-loop
        const response2 = await axios.instance.get(`/users/profile/${response.data[i].from}`);
        store.dispatch(addCommonAlam({
          seq: response.data[i].alarmSeq,
          from_seq: response.data[i].from,
          from_nick: response2.data.user_info.userName,
          type: response.data[i].type,
          code: response.data[i].code } as CommonAlamData));
      }
    }
    return (null);
  } catch (error) {
    return (error);
  }
}

export const getConfirmAlamList = async () => {
  try {
    const response = await axios.instance.get("/alarm/confirms");
    const { blockList } = store.getState();

    store.dispatch(clearChoosableAlamList({} as ChoosableAlamData));
    for (let i = 0; i < response.data.length; i += 1) {
      let bBlock: boolean = false;
      for (let ii = 0; ii < blockList.length; ii += 1) {
        if (blockList[ii].seq === String(response.data[i].userSeq)) {
          bBlock = true;
          break;
        }
      }
      if (!bBlock) {
        // eslint-disable-next-line no-await-in-loop
        const response2 = await axios.instance.get(`/users/profile/${response.data[i].from}`);
        let typeNum: number = 0;
        if (response.data[i].code === "ALAM21") {
          typeNum = 1;
        }
        const newAlarmCell: ChoosableAlamData = {
          seq: response.data[i].alarmSeq,
          from_seq: response.data[i].from,
          from_nick: response2.data.user_info.userName,
          type: typeNum,
        };
        store.dispatch(addChoosableAlam(newAlarmCell));
      }
    }
    console.log("Heal CD");
    store.dispatch(removeOverlapChoosableAlam({} as ChoosableAlamData));
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

export const getNickName = async (searchSeq: number) => {
  try {
    const response = await axios.instance.get(`/users/profile/${searchSeq}`);
    return (response?.data.user_info.userName);
  } catch (error) {
    return (error);
  }
}

export const getUserSimpleSearch = async (searchString: string) => {
  try {
    if (checkNameValid(searchString) === false) {
      throw new Error("username is invalid!");
    }
    const response = await axios.instance.get(`/users/search/nickname/${searchString}`);
    return (response);
  } catch (error) {
    return (error);
  }
}

// --------------------------------------------------------------
// API for Game feature

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

export const getChatInfo = async (chatSeq: string) => {
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

export const inviteUser = async (userSeq: number, chatSeq: number) => {
  try {
    const response = await axios.instance.put(`/chatrooms/invite/${userSeq}/${chatSeq}`);
    return (response);
  } catch (error) {
    return (error);
  }
}

export const getBanList = async (chatSeq: string) => {
  try {
    const response = await axios.instance.get(`chatrooms/ban/${chatSeq}`);
    return (response);
  } catch (error) {
    return (error);
  }
}

// --------------------------------------------------------------
// auth

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
    const response = await axios.instance.get(`/auth/twofactor/code?code=${code}`);
    return (response);
  } catch (error) {
    return (error);
  }
}

export const isFirstLogin = async () => {
  try {
    const response = await axios.instance.get("/auth/login/firstlogin");
    return (response);
  } catch (error) {
    return (error);
  }
}
