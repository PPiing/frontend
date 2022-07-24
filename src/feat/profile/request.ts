import { useEffect } from "react";
import axios from "axios";
import store from "../../redux/store";
import { AuthData, setAuth } from "../../redux/slices/auth";

async function ReqUserProfile(userId: string) {
  await axios.get(
    `${window.location.origin}/api/users/search/${userId}`
  // eslint-disable-next-line consistent-return
  ).then((response) => {
    if (response.status === 200) {
      const rst = Object.values(response.data);
      return (rst);
    } if (response.status === 401) {
      useEffect(() => {
        store.dispatch(setAuth({ auth: false } as AuthData));
      }, []);
    }
  });
}

export { ReqUserProfile };
