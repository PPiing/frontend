import React from "react";
import { styled } from "@stitches/react";
import { Routes, Route, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as template from "./contentTemplate";
import * as theme from "../theme/theme";
import { ReqUserProfile } from "../feat/profile/request";
import * as modal from "../component/modal/modal";
import { ReducerType } from "../redux/rootReducer";
import { DisplayData, setModalTrigger } from "../redux/slices/display";

const ProfileImage = styled(theme.ProfileImage, {
  width: "180px",
  height: "180px",
  display: "block",
  marign: "0px auto",
});

const DividedLeftSection = styled(template.DividedLeftSection, {
  justifyContent: "center",
  textAlign: "center",
});

// function ContentProfile() {
// //   const { userId } = useParams(); // 그거 어케함!
//   //   const { result } = ;
//   //   ReqUserProfile(userId);
//   //   console.log();
//   return (
//     <Contents>
//       profile: {userId}
//     </Contents>
//   );
// }

export function ContainerContents() {
  const { userId } = useParams();
  const dispatch = useDispatch();

  modal.SetModalSize("50%", "40%", "30%", "60%");
  modal.SetModalContent(<div>userId={userId}</div>);
  return (
    <template.DividedContents>
      {/* eslint-disable-next-line react/button-has-type */}
      <button
        onClick={() => { dispatch(setModalTrigger({ ismodal: true } as DisplayData)); }}
      >
        Modal Open
      </button>
      {/* <DividedLeftSection> */}
      {/* <theme.ProfileImage className="profileimg" src={profile.img} /> */}
      {/* <ProfileImage className="profileimg" src="/asset/profileImage/default.png" /> */}
      {/* profile: {userId} */}
      {/* </DividedLeftSection> */}
      {/* <template.DividedRightSection> */}
      {/* profile: {userId} */}
      {/* </template.DividedRightSection> */}
      {/* <template. */}
    </template.DividedContents>
  // <p>profile: {userId}</p>
  );
}
