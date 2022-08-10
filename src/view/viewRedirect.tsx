import { Navigate } from "react-router-dom";

export function RedirectTwofactor() {
  return (<Navigate replace to="/twofactor" />);
}
