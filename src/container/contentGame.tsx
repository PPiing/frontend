import React, { useState, useEffect, useMemo, useRef, MutableRefObject } from "react";
import { styled, } from "@stitches/react";
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { OrbitControls, Stars, Text3D, Shadow, Float, Sparkles, CameraShake, useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";
import * as theme from "../theme/theme";
import * as template from "./contentTemplate";
import socketManager from "../feat/game/socket";

// import fontPath from "../../public/asset/font/Neon 80s_Regular.json";
import fontPath from "../../public/asset/font/Retro_Stereo_Wide_Regular.json";

extend({ TextGeometry });

const socket = socketManager.socket("/");

let isClicked = 0;

const textureSpace = new THREE.TextureLoader().load("../../asset/background_space.jpeg");
const textureBrick = new THREE.TextureLoader().load("../../asset/background_brick.png");

const fontStr : string = JSON.stringify(fontPath);

let tmpRedY = 0;
let tmpBlueY = 0;

let tmpballX = 0;
let tmpballY = 0;

socket.connect();

socket.on("connect", () => {
  console.log("gameSocket", socket.connected);
});

const gamer1Name = "Polarbear\n";
const gamer1Score = "0";
const gamer2Name = " Polarbear\n";
const gamer2Score = "42";
const gameBoardHeight = 5;
const gameBoardWidth = 7;

const RacketMoveSpeed = 0.2;
const RacketSize = 1;

const nameTextConfig = {
  size: 0.25,
  height: 0.1,
  curveSegments: 0.2,
  bevelEnabled: true,
  bevelThickness: 0.1,
  bevelSize: 0.01,
  bevelOffset: 0,
  bevelSegments: 8
};

const scoreTextConfig = {
  size: 1,
  height: 0.1,
  curveSegments: 0.2,
  bevelEnabled: true,
  bevelThickness: 0.1,
  bevelSize: 0.01,
  bevelOffset: 0,
  bevelSegments: 8
};

const shakeCameraConfig = {
  maxYaw: 0.1, // Max amount camera can yaw in either direction
  maxPitch: 0.1, // Max amount camera can pitch in either direction
  maxRoll: 0.1, // Max amount camera can roll in either direction
  yawFrequency: 3, // Frequency of the the yaw rotation
  pitchFrequency: 3, // Frequency of the pitch rotation
  rollFrequency: 4, // Frequency of the roll rotation
  intensity: 1, // initial intensity of the shake
  additive: true,
  decay: true,
  decayRate: 0.28

};

function Basic() {
  const [redRacketYPos, setRedRacketYPos] = useState(0);
  const [blueRacketYPos, setBlueRacketYPos] = useState(0);
  const [ballXpos, setBallXpos] = useState(0);
  const [ballYpos, setBallYpos] = useState(0);

  // socket.emit("game:render", {
  //   ball: { x: 2, y: -3 },
  //   paddleTop: { x: 0, y: 0 },
  //   paddleBtm: { x: 0, y: 0 }
  // });

  // socket.on("game:paddle", (res) => {
  //   console.log("server =>", res);
  // });

  const spinScore = () => {
    const { camera } = useThree();
    const wowScore : React.Ref<any> = useRef();
    let a = 0;
    useFrame(({ clock }) => {
      a = clock.getElapsedTime();
      if (wowScore !== undefined && a < 4) {
        wowScore.current.rotation.y = (200) / (a * 4);
        wowScore.current.rotation.z = (200) / (a * 4);
        // wowScore.current.rotation.x = THREE.MathUtils.clamp(camera.position.x, -90, 90);
      }
    });
    return (
      <mesh position={[-3.5, 1, -4]} ref={wowScore}>
        <Text3D font={JSON.parse(fontStr)} {...scoreTextConfig}>
          {gamer1Score}
          <meshNormalMaterial />
        </Text3D>
        <meshLambertMaterial attach="material" color={theme.NEON_BLU} />
      </mesh>
    );
  };

  const spinBall = () => {
    const spinBall : React.Ref<any> = useRef();
    useFrame(({ clock }) => {
      const a = clock.getElapsedTime();
      // console.log("=>", clock);
      if (spinBall !== undefined) {
        spinBall.current.rotation.x = a * 8;
        spinBall.current.rotation.y = a * 2;
      }
    });
    return (
      <mesh position={[ballXpos, 0.06, ballYpos]} ref={spinBall}>
        {/* <sphereBufferGeometry attach="geometry" args={[0.07, 20, 20]} /> */}
        <boxBufferGeometry attach="geometry" args={[0.1, 0.1, 0.1]} />
        <Shadow
          color="yellow"
          colorStop={0}
          opacity={0.09}
        />
        <meshLambertMaterial attach="material" color="#FAFF00" wireframe />
      </mesh>
    );
  };

  const ReactiveScore = () => {
    return spinScore();
  };

  const AutoSpinBall = () => {
    return spinBall();
  };

  const controlKeyDown = (e:any) => {
    if (e.key === "ArrowUp") {
      if (redRacketYPos < (-gameBoardHeight / 2 + RacketSize * 0.6)) {
        return -1;
      }
      if (isClicked === 0) {
        isClicked = 1;
        socket.emit("game:paddle", -1);
      }
      // setRedRacketYPos(redRacketYPos - RacketMoveSpeed);
    }
    if (e.key === "ArrowDown") {
      if (redRacketYPos > (gameBoardHeight / 2 - RacketSize * 0.6)) {
        return -1;
      }
      if (isClicked === 0) {
        isClicked = 1;
        socket.emit("game:paddle", 1);
      }
    }
    if (e.key === "p") {
      console.log("Press p");
      tmpballX += 1;
      tmpballY += 1;
      tmpRedY += 1;
      tmpBlueY -= 1;
      socket.emit("game:render", {
        ball: { x: tmpballX, y: tmpballY },
        paddleTop: { x: 0, y: tmpRedY },
        paddleBtm: { x: 0, y: tmpBlueY }
      });
    }
    if (e.key === "o") {
      console.log("Press o");
      tmpballX -= 1;
      tmpballY -= 1;
      tmpRedY -= 1;
      tmpBlueY += 1;
      socket.emit("game:render", {
        ball: { x: tmpballX, y: tmpballY },
        paddleTop: { x: 0, y: tmpRedY },
        paddleBtm: { x: 0, y: tmpBlueY }
      });
    }
    return 0;
  };

  const controlKeyUp = (e:any) => {
    if (e.key === "ArrowUp") {
      if (redRacketYPos < (-gameBoardHeight / 2 + RacketSize * 0.6)) {
        // if (isClicked === 1) {
        //   isClicked = 0;
        //   console.log("up up");
        //   socket.emit("game:paddle", 0);
        // }
        return -1;
      }
      if (isClicked === 1) {
        isClicked = 0;
        socket.emit("game:paddle", 0);
      }
      // setRedRacketYPos(redRacketYPos - RacketMoveSpeed);
    }
    if (e.key === "ArrowDown") {
      if (redRacketYPos > (gameBoardHeight / 2 - RacketSize * 0.6)) {
        // if (isClicked === 1) {
        //   isClicked = 0;
        //   console.log("down up");
        //   socket.emit("game:paddle", 0);
        // }
        return -1;
      }
      if (isClicked === 1) {
        isClicked = 0;
        socket.emit("game:paddle", 0);
      }
      // setRedRacketYPos(redRacketYPos + RacketMoveSpeed);
    }
    return 0;
  };

  useEffect(() => {
    window.addEventListener("keydown", controlKeyDown);
    window.addEventListener("keyup", controlKeyUp);

    socket.on("game:render", (res) => {
      console.log("server =>", res);
      setBallXpos(res.ball.x);
      setBallYpos(res.ball.y);
      setRedRacketYPos(res.paddleTop.y);
      setBlueRacketYPos(res.paddleBtm.y);
    });

    return () => {
      window.removeEventListener("keydown", controlKeyDown);
      window.removeEventListener("keyup", controlKeyUp);
      socket.off("game:render");
    };
  });

  return (
    <Canvas dpr={[1, 1.5]} camera={{ fov: 40, position: [0, 5, 10] }}>
      <OrbitControls maxDistance={50} minDistance={6} makeDefault />
      <Stars radius={10} depth={40} count={5000} factor={3} saturation={3} fade speed={4} />
      <ambientLight intensity={10} />
      <directionalLight args={["#00ff00", 1]} />
      {/* <CameraShake {...shakeCameraConfig} /> */}

      {/* 메인 게임필드 */}
      <mesh position={[0, 0, 0]}>
        <boxBufferGeometry attach="geometry" args={[gameBoardWidth, 0.1, gameBoardHeight]} />
        <Sparkles
          count={40}
          /** Speed of particles (default: 1) */
          speed={0.4}
          scale={5}
          size={3}
          /** Opacity of particles (default: 1) */
          opacity={1}
        />
        <meshLambertMaterial attach="material" transparent opacity={0.1} emissive="#000011" reflectivity={0.8} refractionRatio={0.8} combine={THREE.MultiplyOperation} wireframeLinewidth={0.5} wireframeLinecap="square" wireframeLinejoin="miter" map={textureSpace} />  {/* <meshLambertMaterial attach="material" transparent opacity={0.2} emissive="#000011" reflectivity={0.8} refractionRatio={0.8} combine={THREE.MultiplyOperation} wireframeLinewidth={0.5} wireframeLinecap="square" wireframeLinejoin="miter" map={textureBrick} envMap={textureSpace} /> */}
      </mesh>

      {/* Red 게임바 */}
      <Float
        speed={5} // Animation speed, defaults to 1
        rotationIntensity={0.1} // XYZ rotation intensity, defaults to 1
        floatIntensity={5}
        floatingRange={[-0.02, 0.01]}
      >
        <mesh position={[3.1, 0.3, redRacketYPos]}>
          <boxBufferGeometry attach="geometry" args={[0.1, 0.22, RacketSize]} />
          <meshLambertMaterial attach="material" color="#FF0000" map={textureBrick} />
        </mesh>
      </Float>

      {/* Blue 게임바 */}
      <Float
        speed={5} // Animation speed, defaults to 1
        rotationIntensity={0.1} // XYZ rotation intensity, defaults to 1
        floatIntensity={5}
        floatingRange={[-0.02, 0.01]}
      >
        <mesh position={[-3.1, 0.3, blueRacketYPos]}>
          <boxBufferGeometry attach="geometry" args={[0.1, 0.22, RacketSize]} />
          <meshLambertMaterial attach="material" color="#0000FF" map={textureBrick} />
        </mesh>
      </Float>

      {/* Ball */}
      <Float
        speed={9} // Animation speed, defaults to 1
        rotationIntensity={0.1} // XYZ rotation intensity, defaults to 1
        floatIntensity={2}
        floatingRange={[0.1, 0.2]}
      >
        <AutoSpinBall />
      </Float>

      {/* Score & Name */}
      <Float
        speed={5} // Animation speed, defaults to 1
        rotationIntensity={0.35} // XYZ rotation intensity, defaults to 1
        floatIntensity={4}
        floatingRange={[-0.01, 0.01]}
      >
        {/* <ReactiveScore isRerender={reactiveScore} /> */}
        <ReactiveScore />
        {/* <mesh position={[-3.5, 1, -4]}>
          <Text3D font={JSON.parse(fontStr)} {...scoreTextConfig}>
            {gamer1Score}
            <meshNormalMaterial />
          </Text3D>
          <meshLambertMaterial attach="material" color={theme.NEON_BLU} />
        </mesh> */}
      </Float>
      <Float
        speed={6} // Animation speed, defaults to 1
        rotationIntensity={0.15} // XYZ rotation intensity, defaults to 1
        floatIntensity={9}
        floatingRange={[-0.01, 0.01]}
      >
        <mesh position={[-3.5, 0.2, -4]}>
          <Text3D font={JSON.parse(fontStr)} {...nameTextConfig}>
            {gamer1Name}
            <meshNormalMaterial />
          </Text3D>
          <meshLambertMaterial attach="material" color={theme.NEON_BLU} />
        </mesh>
      </Float>
      <Float
        speed={6} // Animation speed, defaults to 1
        rotationIntensity={0.2} // XYZ rotation intensity, defaults to 1
        floatIntensity={3}
        floatingRange={[-0.002, 0.001]}
      >
        <mesh position={[0.7, 1, -4]}>
          <Text3D font={JSON.parse(fontStr)} {...scoreTextConfig}>
            {gamer2Score}
            <meshNormalMaterial />
          </Text3D>
          <meshLambertMaterial attach="material" color={theme.NEON_BLU} />
        </mesh>
      </Float>
      <Float
        speed={1} // Animation speed, defaults to 1
        rotationIntensity={0.8} // XYZ rotation intensity, defaults to 1
        floatIntensity={3}
        floatingRange={[-0.002, 0.001]}
      >
        <mesh position={[0.5, 0.2, -4]}>
          <Text3D font={JSON.parse(fontStr)} {...nameTextConfig}>
            {gamer2Name}
            <meshNormalMaterial />
          </Text3D>
          <meshLambertMaterial attach="material" color={theme.NEON_BLU} />
        </mesh>
      </Float>
    </Canvas>
  );
}
const Contents = styled(template.Contents, {
  "&:hover": {
    border: `3px solid ${theme.NEON_RED}`,
    filter: "drop-shadow(0 0 2px gray)"
  },
});

export default function InGame() {
  return (
    <Contents className="contents">
      <Basic />
    </Contents>
  );
}
