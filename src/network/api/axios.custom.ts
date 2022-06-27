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
        nick: response.data.userName,
        mail: response.data.userEmail,
        img: response.data.userImage,
        status: response.data.userStatus
      } as LoggedUserData
    ));
  } catch (error) {
    console.log(error);
  }
};

export const getUserSearch = async (searchString: string) => {
  try {
    await axios.instance.get(`/users/search/${searchString}`);
  } catch (error) {
    console.log(error);
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
    console.log(error);
    return (error);
  }
};
