import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getLoggedUserProfile } from "../network/api/axios.custom";
import { ReducerType } from "../redux/rootReducer";
import { AuthData } from "../redux/slices/auth";

export function RootControl() {
  const auth = useSelector<ReducerType, AuthData>((state) => state.auth);

  getLoggedUserProfile();

  if (!auth.auth || (auth.isRequire2f && !auth.auth2f)) {
    return (<Navigate replace to="/login" />);
  }

  return (
    <Navigate replace to="/home" />
  );
}
