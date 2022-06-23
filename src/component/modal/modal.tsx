import React, { useState } from "react";
import Modal from "react-modal";
import { styled } from "@stitches/react";
import { useSelector, useDispatch } from "react-redux";
import * as theme from "../../theme/theme";
import { ReducerType } from "../../redux/rootReducer";
import { DisplayData, setModalTrigger } from "../../redux/slices/display";
// import * as display

export function CallModal(props: any) {
  const { width, height, left, top, content, } = props;
  const display = useSelector<ReducerType, DisplayData>((state) => state.display);
  const dispatch = useDispatch();
  return (
    <Modal
      isOpen={display.ismodal}
      onRequestClose={
          () => { dispatch(setModalTrigger({ ismodal: 0 } as DisplayData)); }}
      shouldCloseOnOverlayClick={1}
      style={{
        overlay: {
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
        content: {
          margin: "0",
          position: "absolute",
          top: `${top}`,
          left: `${left}`,
          color: "white",
          width: `${width}`,
          height: `${height}`,
          background: "black",
          border: `8px solid ${theme.NEON_RED}`,
          filter: `drop-shadow(0 0 10px ${theme.NEON_RED}) brightness(1.6)`,
          overflow: "auto",
          WebkitOverflowScrolling: "touch",
          borderRadius: "20px",
          outline: "none",
          padding: "20px"
        },
      }}
    >
      {content}
      {/* eslint-disable-next-line react/button-has-type */}
      {/* <button onClick={() => setModalIsOpen(false)}>Modal Open</button> */}
    </Modal>
  );
}
