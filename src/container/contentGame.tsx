import React, { useState, useEffect, useMemo } from "react";
import { styled, } from "@stitches/react";
import { Canvas, extend } from "@react-three/fiber";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { CameraShake, OrbitControls, Stars, Text, Text3D } from "@react-three/drei";
import * as theme from "../theme/theme";
import * as template from "./contentTemplate";
import fontPath from "../font/Neon 80s_Regular.json";

extend({ TextGeometry });

function Basic() {
  const [redRacketYPos, setRedRacketYPos] = useState(0);
  const [blueRacketYPos, setBlueRacketYPos] = useState(0);
  const gamer1Name = "Polabear\n";
  const gamer1Score = "0";
  const gamer2Name = " Polabear\n";
  const gamer2Score = "42";
  const gameBoardHeight = 5;
  const gameBoardWidth = 7;

  const gameFont = new FontLoader().parse(fontPath);

  const RacketMoveSpeed = 0.6;
  const RacketSize = 1;

  const nameTextConfig = useMemo(
    () => ({ size: 0.5,
      height: 0.1,
      curveSegments: 0.2,
      bevelEnabled: true,
      bevelThickness: 0.1,
      bevelSize: 0.01,
      bevelOffset: 0,
      bevelSegments: 8 }),
    []
  );

  const scoreTextConfig = useMemo(
    () => ({ size: 2,
      height: 0.1,
      curveSegments: 0.2,
      bevelEnabled: true,
      bevelThickness: 0.1,
      bevelSize: 0.01,
      bevelOffset: 0,
      bevelSegments: 8 }),
    []
  );

  const controlMyRacket = (e:any) => {
    // console.log(e.key, "  =>   ", redRacketYPos);
    if (e.key === "ArrowUp") {
      if (redRacketYPos < (-gameBoardHeight / 2 + RacketSize * 0.6)) {
        return -1;
      }
      setRedRacketYPos(redRacketYPos - RacketMoveSpeed);
    }
    if (e.key === "ArrowDown") {
      if (redRacketYPos > (gameBoardHeight / 2 - RacketSize * 0.6)) {
        return -1;
      }
      setRedRacketYPos(redRacketYPos + RacketMoveSpeed);
    }
    return 0;
  };

  const controlOppRacket = (e:any) => {
    // console.log("down => ", e.key, "  =>   ", redRacketYPos);
    if (e.key === "ArrowUp") {
      setBlueRacketYPos(redRacketYPos - RacketMoveSpeed);
    }
    if (e.key === "ArrowDown") {
      setBlueRacketYPos(redRacketYPos + RacketMoveSpeed);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", controlMyRacket);
    return () => {
      window.removeEventListener("keydown", controlMyRacket);
    };
  });

  return (
    <Canvas dpr={[1, 1.5]} camera={{ fov: 35, position: [0, 5, 10] }}>
      <OrbitControls />
      <Stars />
      <ambientLight intensity={1} />

      {/* 메인 게임필드 */}
      <mesh position={[0, 0, 0]}>
        <boxBufferGeometry attach="geometry" args={[gameBoardWidth, 0.1, gameBoardHeight]} />
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

      {/* Score & Name */}
      <mesh position={[-3.5, 1, -4]}>
        <Text3D font={fontPath} {...scoreTextConfig}>
          {gamer1Score}
          <meshNormalMaterial />
        </Text3D>
        <meshLambertMaterial attach="material" color={theme.NEON_BLU} />
      </mesh>
      <mesh position={[-3.5, 0.2, -4]}>
        <Text3D font={fontPath} {...nameTextConfig}>
          {gamer1Name}
          <meshNormalMaterial />
        </Text3D>
        <meshLambertMaterial attach="material" color={theme.NEON_BLU} />
      </mesh>
      <mesh position={[0.7, 1, -4]}>
        <Text3D font={fontPath} {...scoreTextConfig}>
          {gamer2Score}
          <meshNormalMaterial />
        </Text3D>
        <meshLambertMaterial attach="material" color={theme.NEON_BLU} />
      </mesh>
      <mesh position={[0.5, 0.2, -4]}>
        <Text3D font={fontPath} {...nameTextConfig}>
          {gamer2Name}
          <meshNormalMaterial />
        </Text3D>
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
    filter: "drop-shadow(0 0 2px gray)"
  },
});
