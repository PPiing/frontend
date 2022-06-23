import React from "react";
import { styled } from "@stitches/react";
import { Routes, Route, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
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
  const display = useSelector<ReducerType, DisplayData>((state) => state.display);
  const dispatch = useDispatch();

  return (
    <template.DividedContents>
      <modal.CallModal
        width="20%"
        height="40%"
        left="60%"
        top="30%"
        content={(
          <div>
            Hello
            <p>user Id : {userId}</p>
          </div>
      )}
      />
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
