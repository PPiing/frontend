import { useEffect } from "react";
import axios from "axios";
import store from "../../redux/store";
import { AuthData, setAuth } from "../../redux/slices/auth";

function ReqUserProfile(userId: string) {
//   console.log(userId);
  axios.get(
    `https://bongcheonmountainclub.iptime.org/api/users/search/${userId}`
  ).then((response) => {
    // console.log("test");
    if (response.status === 200) {
      const rst = Object.values(response.data);
      return (rst);
    //   return (rst);
    } if (response.status === 401) {
    //   console.log("test");
      useEffect(() => {
        store.dispatch(setAuth({ auth: false } as AuthData));
      }, []);
    }
  });
}

export { ReqUserProfile };
