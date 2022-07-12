import * as React from "react";
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
let ModalBottom = "0";
let ModalRight = "0";

export function SetModalSize(width: string, height: string, bottom: string, right: string) {
  ModalWidth = width;
  ModalHeight = height;
  ModalBottom = bottom;
  ModalRight = right;
}

export function SetModalWidth(width: string) {
  ModalWidth = width;
}

export function SetModalHeight(height: string) {
  ModalHeight = height;
}

export function SetModalBottom(bottom: string) {
  ModalBottom = bottom;
}

export function SetModalRight(right: string) {
  ModalRight = right;
}

export function SetModalContent(content: JSX.Element) {
  ModalContent = content;
}

export function CallModal() {
  Modal.setAppElement("#root");
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
          top: `calc(100% - ${ModalHeight} - ${ModalBottom})`,
          left: `calc(100% - ${ModalWidth} - ${ModalRight})`,
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
          padding: "20px",
          //   inset: "0",
        },
      }}
    >
      {ModalContent}
    </Modal>
  );
}
