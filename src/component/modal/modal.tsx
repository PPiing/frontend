import React, { useState } from "react";
import Modal from "react-modal";
import { styled } from "@stitches/react";
import { useSelector, useDispatch } from "react-redux";
import * as theme from "../../theme/theme";
import { ReducerType } from "../../redux/rootReducer";
import { DisplayData, setModalTrigger } from "../../redux/slices/display";
// import * as display

let ModalContent = <p>ModalContent</p>;
let ModalWidth = "0";
let ModalHeight = "0";
let ModalTop = "0";
let ModalLeft = "0";

export function SetModalSize(width: string, height: string, top: string, left: string) {
  ModalWidth = width;
  ModalHeight = height;
  ModalTop = top;
  ModalLeft = left;
}

export function SetModalContent(content: JSX.Element) {
  ModalContent = content;
}

export function CallModal() {
  const display = useSelector<ReducerType, DisplayData>((state) => state.display);
  const dispatch = useDispatch();
  return (
    <Modal
      isOpen={display.ismodal}
      onRequestClose={
          () => { dispatch(setModalTrigger({ ismodal: false } as DisplayData)); }}
      shouldCloseOnOverlayClick
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
          top: `${ModalTop}`,
          left: `${ModalLeft}`,
          color: "white",
          width: `${ModalWidth}`,
          height: `${ModalHeight}`,
          background: "black",
          border: `3px solid ${theme.NEON_RED}`,
          filter: `drop-shadow(0 0 10px ${theme.NEON_RED}) brightness(1.6)`,
          overflow: "auto",
          WebkitOverflowScrolling: "touch",
          borderRadius: "20px",
          outline: "none",
          padding: "20px"
        },
      }}
    >
      {ModalContent}
      {/* eslint-disable-next-line react/button-has-type */}
      {/* <button onClick={() => setModalIsOpen(false)}>Modal Open</button> */}
    </Modal>
  );
}
