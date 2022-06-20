import axios from "axios";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import store from "../redux/store";
import { ReducerType } from "../redux/rootReducer";
import { AuthData, setAuth } from "../redux/slices/auth";

export function RootControl() {
  const auth = useSelector<ReducerType, AuthData>((state) => state.auth);

  axios.defaults.withCredentials = true;
  // 요청 url 변경 필요.
  axios.get("https://bongcheonmountainclub.iptime.org/api/users/profile").then((response) => {
    if (response.status === 200) {
      useEffect(() => {
        store.dispatch(setAuth({ auth: true } as AuthData));
      }, []);
    }
  });

  if (auth.auth) {
    if (auth.isRequire2f) {
      if (auth.auth2f) {
        return (<Navigate replace to="/home" />);
      }
      return (<Navigate replace to="/login" />); // Fix require to 2f login page.
    }
    return (<Navigate replace to="/home" />);
  }

  return (<Navigate replace to="/login" />);
}
