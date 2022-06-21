import { useEffect } from "react";
import axios from "axios";
import store from "../../redux/store";
import { LoggedUserData, setLoggedUser } from "../../redux/slices/loggedUser";
import { AuthData, setAuth } from "../../redux/slices/auth";

function ReqLoggedUserDate() {
  axios.get("https://bongcheonmountainclub.iptime.org/api/users/profile").then((response) => {
    if (response.status === 200) {
      // test
      console.log("in req req: ", response);
      const recvData = Object.values(response.data);
      if (recvData.length === 4) {
        useEffect(() => {
          store.dispatch(setAuth({ auth: true } as AuthData));
          // eslint-disable-next-line max-len
          store.dispatch(setLoggedUser({ nick: recvData[0], mail: recvData[1], img: recvData[3], status: recvData[2] } as LoggedUserData));
        }, []);
      }
    } else if (response.status === 401) {
      useEffect(() => {
        store.dispatch(setAuth({ auth: false } as AuthData));
      }, []);
    }
  });
}

export { ReqLoggedUserDate };
