/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { styled } from "@stitches/react";
import { useSelector } from "react-redux";
import { ReducerType } from "../../redux/rootReducer";
import { LoggedUserData } from "../../redux/slices/loggedUser";

const Contents = styled("div", {
  width: "100%",
  height: "100%",
  padding: "0",
  border: 0,
  boxShadow: "none",

  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "left",

  color: "white",
  overflowX: "hidden",
  overflowY: "scroll",
  "&:hover": {
    filter: "brightness(1)",
    border: 0,
    boxShadow: "none",
  },
  "&::-webkit-scrollbar": {
    background: "none",
    width: "0.6rem",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "#222222",
    borderRadius: "3rem",
    width: "0.4rem",
    right: "60px",
  },
});

export function ModalFirstLogin() {
  const loggedUser = useSelector<ReducerType, LoggedUserData>((state) => state.loggedUser);
  function ButtonClickHref() {
    window.location.href = `/profile/${loggedUser.seq}`;
  }
  return (
    <Contents>
      <div onClick={ButtonClickHref}>
        <img
          style={{
            margin: "0",
            height: "90vh",
            cursor: "pointer" }}
          alt="x"
          src="/asset/tutorial.png"
        />
      </div>
    </Contents>
  );
}
