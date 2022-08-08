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

// API for Nav

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
    const response = await axios.instance.get(`/users/search/nickname/${searchString}`);
    return (response);
  } catch (error) {
    return (error);
  }
}

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
        from_nick: response2.data.userName,
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

    store.dispatch(clearChoosableAlamList({} as ChoosableAlamData));
    for (let i = 0; i < response.data.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const response2 = await axios.instance.get(`/users/profile/${response.data[i].from}`);
      let typeNum: number = 0;
      if (response.data[i].code === "ALAM21") {
        typeNum = 1;
      }
      store.dispatch(addChoosableAlam({
        seq: response.data[i].alarmSeq,
        from_seq: response.data[i].from,
        from_nick: response2.data.userName,
        type: typeNum,
      } as ChoosableAlamData));
    }
    return (null);
  } catch (error) {
    return (error);
  }
}

export const postConfirm = async (alamSeq: string, isAccept: boolean) => {
  try {
    if (isAccept) {
      await axios.instance.post(`/community/friends/accept/${alamSeq}`);
      store.dispatch(removeChoosableAlam({ seq: alamSeq } as ChoosableAlamData));
    } else {
      await axios.instance.post(`/community/friends/reject/${alamSeq}`);
      store.dispatch(removeChoosableAlam({ seq: alamSeq } as ChoosableAlamData));
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
    await axios.instance.post(`/chatroom/new/dm/${userSeq}`);
    return (null);
  } catch (error) {
    return (error);
  }
}

// API for Login

// API for Profile

// API for Game

// API for Chat

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

export const inviteUser = async (userSeq: number, chatSeq: number) => {
  try {
    const response = await axios.instance.put(`/chatrooms/invite/${userSeq}/${chatSeq}`);
    return (response);
  } catch (error) {
    return (error);
  }
}
