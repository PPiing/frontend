import React, { useState, useEffect, useRef } from "react";
import { styled, } from "@stitches/react";
import * as THREE from "three";
import { Canvas, extend } from "@react-three/fiber";
import { CameraShake, OrbitControls, Stars, Text3D, Text } from "@react-three/drei";
import * as theme from "../theme/theme";
import * as template from "./contentTemplate";

// => 기본 game Stage 렌더링중 _ 주석을 지우지 마세요!

// const config = {
//   maxYaw: 0.1, // Max amount camera can yaw in either direction
//   maxPitch: 0.1, // Max amount camera can pitch in either direction
//   maxRoll: 0.1, // Max amount camera can roll in either direction
//   yawFrequency: 0.1, // Frequency of the the yaw rotation
//   pitchFrequency: 0.1, // Frequency of the pitch rotation
//   rollFrequency: 0.1, // Frequency of the roll rotation
//   intensity: 0.8, // initial intensity of the shake
//   decay: false, // should the intensity decay over time
//   decayRate: 0.65, // if decay = true this is the rate at which intensity will reduce at
//   controls: undefined, // if using orbit controls, pass a ref here so we can update the rotation
// };
// <CameraShake {...config} />
// <Cloud opacity={0.5} speed={0.4} width={10} depth={1.5} segments={20} />

// function Font() {
//   return (
//     <Text color="black" anchorX="center" anchorY="middle">
//       hello world!
//     </Text>
//   );
// }

// function Basic2() {
//   return (
//     <Canvas dpr={[1, 1.5]} camera={{ fov: 35, position: [0, 5, 10] }}>
//       <OrbitControls />
//       <Stars />
//       <ambientLight intensity={1.5} />
//       <spotLight position={[5, 20, 15]} angle={5} />
//       <mesh position={[0, 0, 0]}>
//         <boxBufferGeometry attach="geometry" args={[5, 0.8, 5]} />
//         <meshLambertMaterial attach="material" color={theme.NEON_BLU} />
//       </mesh>
//     </Canvas>
//   );
// }

// function PlayerScore() {
//   return (
//     <mesh position={[0, 1.5, -4]}>
//       <Text
//         scale={[5, 5, 5]}
//         color={theme.NEON_GRE}
//         anchorX="right"
//         anchorY="middle"
//       >
//         {gamer1Name}
//         {gamer1Score}
//       </Text>
//       <meshLambertMaterial attach="material" color={theme.NEON_BLU} />
//     </mesh>
//   );
// };

function Basic() {
  const [redRacketYPos, setRedRacketYPos] = useState(0);
  const gamer1Name = "Polabear : \n";
  const gamer1Score = "0";
  const gamer2Name = " Dall\n";
  const gamer2Score = "999";

  let blueRacketYPos = 0;

  const controlRacket = (e:any) => {
    console.log("down => ", e.key, "  =>   ", redRacketYPos);
    if (e.key === "ArrowUp") {
      setRedRacketYPos(redRacketYPos - 0.1);
    }
    if (e.key === "ArrowDown") {
      setRedRacketYPos(redRacketYPos + 0.1);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", controlRacket);
  }, []);

  // window.addEventListener("keydown", controlRacket);
  // window.removeEventListener("keydown", controlRacket);

  return (
    <Canvas dpr={[1, 1.5]} camera={{ fov: 35, position: [0, 5, 10] }}>
      <OrbitControls />
      <Stars />
      <ambientLight intensity={1} />

      {/* 메인 게임필드 */}
      <mesh position={[0, 0, 0]}>
        <boxBufferGeometry attach="geometry" args={[7, 0.1, 5]} />
        <meshLambertMaterial attach="material" color="#000000" />
      </mesh>

      {/* Red 게임바 */}
      <mesh position={[3.1, 0.3, redRacketYPos]}>
        <boxBufferGeometry attach="geometry" args={[0.1, 0.1, 1]} />
        <meshLambertMaterial attach="material" color="#FF0086" />
      </mesh>

      {/* Blue 게임바 */}
      <mesh position={[-3.1, 0.3, blueRacketYPos]}>
        <boxBufferGeometry attach="geometry" args={[0.1, 0.1, 1]} />
        <meshLambertMaterial attach="material" color="#00FFF0" />
      </mesh>

      {/* Ball */}
      <mesh position={[0, 0.3, 0]}>
        {/* <sphereBufferGeometry attach="geometry" args={[0.07, 20, 20]} /> */}
        <boxBufferGeometry attach="geometry" args={[0.1, 0.1, 0.1]} />
        <meshLambertMaterial attach="material" color="#FAFF00" />
      </mesh>

      <mesh position={[0, 1.5, -4]}>
        <Text
          scale={[5, 5, 5]}
          color={theme.NEON_GRE}
          anchorX="right"
          anchorY="middle"
        >
          {gamer1Name}
          {gamer1Score}
        </Text>
        <Text
          scale={[5, 5, 5]}
          color={theme.NEON_GRE}
          anchorX="left"
          anchorY="middle"
        >
          {gamer2Name}
          {gamer2Score}
        </Text>
        <meshLambertMaterial attach="material" color={theme.NEON_BLU} />
      </mesh>
    </Canvas>
  );
}

export function ContainerContents() {
  return (
    <Contents className="contents">
      <Basic />
    </Contents>
  );
}

const Contents = styled(template.Contents, {
  "&:hover": {
    border: `3px solid ${theme.NEON_RED}`,
    filter: "drop-shadow(0 0 2px gray)",
  },
});

// export const NeonHoverRed = styled("div", {
//   border: "3px solid gray",
//   transition: "all 0.5s",
//   filter: "drop-shadow(0 0 2px gray)",
//   "&:hover": {
//     border: `3px solid ${NEON_RED}`,
//     color: `${NEON_RED}`,
//     filter: `drop-shadow(0 0 2px ${NEON_RED}) brightness(1.6)`,
//   },
// });