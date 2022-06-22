import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import store from "../redux/store";
import { ReducerType } from "../redux/rootReducer";
import { AuthData, setAuth } from "../redux/slices/auth";

export function RootControl() {
  const auth = useSelector<ReducerType, AuthData>((state) => state.auth);

  // 요청 url 변경 필요.
  axios.get("https://bongcheonmountainclub.iptime.org/api/users/profile").then((response) => {
    if (response.status === 200) {
      store.dispatch(setAuth({ auth: true } as AuthData));
    } else if (response.status === 401) {
      store.dispatch(setAuth({ auth: false } as AuthData));
    }
  });

  if (!auth.auth || (auth.isRequire2f && !auth.auth2f)) {
    return (
      <Navigate replace to="/login" />
    );
  }
  return (
    <Navigate replace to="/home" />
  );
}
