import React from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { Backdrop, CameraShake, Center, Cloud, Lightformer, OrbitControls, Sky, SpotLight, Stage, Stars } from "@react-three/drei";

import { styled } from "@stitches/react";
import * as theme from "../theme/theme";

const Contents = styled(theme.Contents, {

});

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

function Basic() {
  return (
    <Canvas dpr={[1, 1.5]} camera={{ fov: 35, position: [0, 5, 10] }}>
      <OrbitControls />
      <Stars />
      <ambientLight intensity={1.5} />
      <spotLight position={[5, 20, 15]} angle={5} />
      <mesh position={[0, 0, 0]}>
        <boxBufferGeometry attach="geometry" args={[5, 0.8, 5]} />
        <meshLambertMaterial attach="material" color={theme.NEON_RED} />
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
