import axios from "axios";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import store from "../redux/store";
import { ReducerType } from "../redux/rootReducer";
import { AuthData, setAuth } from "../redux/slices/auth";

export function RootControl() {
  const auth = useSelector<ReducerType, AuthData>((state) => state.auth);
  
  const dispatch2 = useDispatch();

  // test
  console.log("in RootControl: ", auth);

  let temp: boolean = false;
  // 요청 url 변경 필요.
  axios.get("https://bongcheonmountainclub.iptime.org/api/users/profile").then((response) => {
    if (response.status === 200) {
      // test
      temp = true;
      console.log("in rootControl req: ", response);
      store.dispatch(setAuth({ auth: true } as AuthData));
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
