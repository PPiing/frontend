import React, { useState, useRef, Suspense, useEffect } from "react";
import { useSelector } from "react-redux";
import { styled } from "@stitches/react";
import { Slider, Button } from "@mui/material";
import { OrbitControls, Stars, Text3D, Float } from "@react-three/drei";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader"
import * as THREE from "three";
import * as template from "./contentTemplate";
import * as theme from "../theme/theme";
import ToggleBtn from "../component/button/ToggleBtn";
import { ReducerType } from "../redux/rootReducer";
import { gameRule, GameRuleData, setGameRuleData } from "../redux/slices/gameRule";
import store from "../redux/store";
import fontPath from "../../public/asset/font/dohyeon_Regular.json";
import socketManager from "../network/api/socket";

const socket = socketManager.socket("/");

// socket.on("connect", () => {
//   console.log("gameSocket", socket.connected);
// });

const targetModel2 = "/asset/Iron_Man_Mark_44_Hulkbuster_fbx.FBX"
const targetModel1 = "/asset/PaddleAndBall.fbx"

const fontStr : string = JSON.stringify(fontPath);

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

const RuleSelectionContainer = styled(template.DividedLeftSection, {
  alignItems: "center",
});

export const GameRuleRightSection = styled(theme.NeonHoverRed, {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: theme.NEON_RED,
  width: "75%",
  height: `calc(${theme.NAV_LEFT_HEIGHT})`,
});

const SlidersContainer = styled("div", {
  display: "flex",
  height: "70%",
  width: "90%",
});

const TextContainer = styled("div", {
  display: "flex",
  height: "10%",
  width: "90%",
});

const SliderWrapper = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "33%",
});

const InputScore = styled("select", {
  background: "rgba(255,255,255,0.1)",
});

const TextWrapper = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "90%",
  width: "33%",
});

const RuleText = styled("p", {
  color: theme.NEON_BLU,
  fontWeight: "bold",
  textAlign: "center",
});

export default function GameRuleSet() {
  const myRule = useSelector<ReducerType, GameRuleData>((state) => state.gameRule);
  const [modelXpos, setModelXpos] = useState(0);
  const [modelYpos, setModelYpos] = useState(0);
  const [isReady, setIsReady] = useState(false);

  const memoRule : GameRuleData = {
    matchScore: myRule.matchScore,
    ballSpeed: myRule.ballSpeed,
    paddleSize: myRule.paddleSize,
    isRankGame: myRule.isRankGame,
    blueUser: myRule.blueUser,
    redUser: myRule.redUser,
    isInGame: myRule.isInGame
  };

  const handleValue = (e:any) => {
    if (e.target.name === "score") {
      memoRule.matchScore = e.target.value;
    } else if (e.target.name === "speed") {
      memoRule.ballSpeed = e.target.value;
    } else if (e.target.name === "size") {
      memoRule.paddleSize = e.target.value;
    };
  };

  const Rig = () => {
    const { camera, mouse } = useThree();
    const vec = new THREE.Vector3();
    return useFrame(() =>
      camera.position.lerp(
        vec.set(mouse.x, mouse.y, camera.position.z),
        0.0049
      ));
  };

  const handleReady = () => {
    // eslint-disable-next-line max-len
    store.dispatch(setGameRuleData({ ...memoRule, isRankGame: memoRule.isRankGame } as GameRuleData));
    console.log("=> emit ready on GameRule", memoRule);
    socket.emit("enQ", memoRule);
    // socket.emit("test:render", memoRule);
    setIsReady(true);
  };

  const handleDeQ = () => {
    socket.emit("deQ", memoRule);
    setIsReady(false);
  };

  const spinModel1 = () => {
    const spinModel : React.Ref<any> = useRef();
    const fbx = useLoader(FBXLoader, targetModel1);

    useFrame(({ clock }) => {
      const a = clock.getElapsedTime();
      if (spinModel !== undefined) {
        spinModel.current.rotation.y = a * 0.4;
      }
    });
    return (
      <mesh position={[modelXpos, 0.06, modelYpos]} ref={spinModel}>
        <primitive object={fbx} scale={0.05} />
      </mesh>
    );
  };
  const spinModel2 = () => {
    const spinModel : React.Ref<any> = useRef();
    const fbx = useLoader(FBXLoader, targetModel2);

    useFrame(({ clock }) => {
      const a = clock.getElapsedTime();
      if (spinModel !== undefined) {
        spinModel.current.rotation.y = a * 0.6;
      }
    });
    return (
      <mesh position={[modelXpos, 0.06, modelYpos]} ref={spinModel}>
        <primitive object={fbx} scale={0.05} />
      </mesh>
    );
  };

  const AutoSpinModel1 = () => {
    return spinModel1();
  };
  const AutoSpinModel2 = () => {
    return spinModel2();
  };

  useEffect(() => {
    socket.on("game:ready", (res) => {
      console.log("server's ready on GameRule =>", res);
      // eslint-disable-next-line max-len
      store.dispatch(setGameRuleData({ ...memoRule, blueUser: res.blueUser, redUser: res.redUser } as GameRuleData));
      socket.emit("game:ready", { roomId: res.roomId });
    });
    socket.on("game:render", (res) => {
      console.log("server's render =>", res);
    });
    socket.on("game:score", (res) => {
      console.log("server's score =>", res);
    });

    return () => {
      socket.off("game:ready");
      socket.off("game:render");
      socket.off("game:score");
    };
  });

  return (
    <template.DividedContents>
      <RuleSelectionContainer>
        <ToggleBtn selection1="Rank" selection2="Normal" />
        <SlidersContainer>
          <SliderWrapper>
            <Slider name="score" onChange={handleValue} orientation="vertical" aria-label="score" valueLabelDisplay="on" defaultValue={memoRule.matchScore} max={10} min={1} color="primary" marks />
          </SliderWrapper>
          <SliderWrapper>
            <Slider name="speed" onChange={handleValue} orientation="vertical" aria-label="Speed" valueLabelDisplay="on" defaultValue={memoRule.ballSpeed} max={1.5} min={0.5} color="secondary" step={0.1} marks />
          </SliderWrapper>
          <SliderWrapper>
            <Slider name="size" onChange={handleValue} orientation="vertical" aria-label="RacketSize" valueLabelDisplay="on" defaultValue={memoRule.paddleSize} max={1.2} min={0.8} color="primary" step={0.1} marks />
          </SliderWrapper>
        </SlidersContainer>
        <TextContainer>
          <TextWrapper>
            <RuleText>
              Max <br />
              Score
            </RuleText>
          </TextWrapper>
          <TextWrapper>
            <RuleText>
              Ball <br />
              Speed
            </RuleText>
          </TextWrapper>
          <TextWrapper>
            <RuleText>
              Racket <br />
              Size
            </RuleText>
          </TextWrapper>
        </TextContainer>
        <Button
          onClick={
          isReady ?
            handleDeQ :
            handleReady
          }
          variant="contained"
          size="large"
          color="error"
        >

          {
          isReady ?
            "Run Away"
            : "Ready"
            }
        </Button>
      </RuleSelectionContainer>
      <GameRuleRightSection>
        <Canvas dpr={[1, 10]} camera={{ fov: 6, position: [99.3, 100, 100] }}>
          <Suspense fallback={null}>
            <OrbitControls maxDistance={500} minDistance={6} makeDefault />
            <pointLight color="red" position={[0, 5, 2]} intensity={1} />
            <pointLight color="yellow" position={[0, 3, 0]} intensity={1} />
            <pointLight color="blue" position={[0, 1, 0]} intensity={0.3} />
            <Stars radius={10} depth={1} count={5000} factor={3} saturation={3} fade speed={4} />
            <Float
              speed={9} // Animation speed, defaults to 1
              rotationIntensity={0.1} // XYZ rotation intensity, defaults to 1
              floatIntensity={1}
              floatingRange={[0.1, 0.2]}
            >
              {/* <ModelGLTFOdj /> */}
              <AutoSpinModel1 />
            </Float>
            <mesh position={[0.5, 10, 60]} rotation={[0, 600, 0]}>
              <Text3D font={JSON.parse(fontStr)} {...scoreTextConfig}>
                Choose Rule
                <meshNormalMaterial />
              </Text3D>
            </mesh>
            <mesh position={[0.5, 10, 20]} rotation={[0, 600, 0]}>
              <Text3D font={JSON.parse(fontStr)} {...scoreTextConfig}>
                And Ready To Game
                <meshNormalMaterial />
              </Text3D>
            </mesh>
            <mesh position={[-0.1, -1.0, 50]} rotation={[0, 600, 0]}>
              <AutoSpinModel2 />
            </mesh>
          </Suspense>
          {
            isReady ? <Rig /> : " "
          }
        </Canvas>
      </GameRuleRightSection>
    </template.DividedContents>
  );
}
