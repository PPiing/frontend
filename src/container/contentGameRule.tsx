import React, { useState, useRef, Suspense } from "react";
import { useSelector } from "react-redux";
import { styled } from "@stitches/react";
import { Slider, Button } from "@mui/material";
import { OrbitControls, Stars, Text3D, Float } from "@react-three/drei";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader"
import * as template from "./contentTemplate";
import * as theme from "../theme/theme";
import ToggleBtn from "../component/button/ToggleBtn";
import { ReducerType } from "../redux/rootReducer";
import { GameRuleData, setGameRuleData } from "../redux/slices/gameRule";
import store from "../redux/store";
import fontPath from "../../public/asset/font/Retro_Stereo_Wide_Regular.json";

const targetModel = "../../dist/asset/Iron_Man_Mark_44_Hulkbuster_fbx.FBX"

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

  const memoRule : GameRuleData = {
    score: myRule.score,
    speed: myRule.speed,
    size: myRule.size,
    isRankGame: myRule.isRankGame,
  };

  const handleValue = (e:any) => {
    if (e.target.name === "score") {
      memoRule.score = e.target.value;
    } else if (e.target.name === "speed") {
      memoRule.speed = e.target.value;
    } else if (e.target.name === "size") {
      memoRule.size = e.target.value;
    };
  };

  const handleReady = () => {
    // eslint-disable-next-line max-len
    store.dispatch(setGameRuleData({ ...memoRule, isRankGame: memoRule.isRankGame } as GameRuleData))
  };

  const spinModel = () => {
    const spinModel : React.Ref<any> = useRef();
    const fbx = useLoader(FBXLoader, targetModel);

    useFrame(({ clock }) => {
      const a = clock.getElapsedTime();
      if (spinModel !== undefined) {
        spinModel.current.rotation.y = a * 0.2;
      }
    });
    return (
      <mesh position={[modelXpos, 0.06, modelYpos]} ref={spinModel}>
        <primitive object={fbx} scale={0.05} />
      </mesh>
    );
  };

  const AutoSpinModel = () => {
    return spinModel();
  };

  return (
    <template.DividedContents>
      <RuleSelectionContainer>
        <ToggleBtn selection1="Rank" selection2="Normal" />
        <SlidersContainer>
          <SliderWrapper>
            <Slider name="score" onChange={handleValue} orientation="vertical" aria-label="ball" valueLabelDisplay="on" defaultValue={3} max={10} min={1} color="primary" marks />
          </SliderWrapper>
          <SliderWrapper>
            <Slider name="speed" onChange={handleValue} orientation="vertical" aria-label="Speed" valueLabelDisplay="on" defaultValue={1} max={3} min={1} color="secondary" marks />
          </SliderWrapper>
          <SliderWrapper>
            <Slider name="size" onChange={handleValue} orientation="vertical" aria-label="RacketSize" valueLabelDisplay="on" defaultValue={0} max={2} min={-2} color="primary" marks />
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
        <Button onClick={handleReady} variant="contained" size="large" color="error">Ready</Button>
      </RuleSelectionContainer>
      <template.DividedRightSection>
        <Canvas dpr={[1, 10]} camera={{ fov: 6, position: [15, 30, 80] }}>
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
              <AutoSpinModel />
            </Float>
            <mesh position={[0.5, 0, 60]} rotation={[0, 600, 0]}>
              <Text3D font={JSON.parse(fontStr)} {...scoreTextConfig}>
                Choose Rule
                <meshNormalMaterial />
              </Text3D>
            </mesh>
            <mesh position={[0.5, 0, 20]} rotation={[0, 600, 0]}>
              <Text3D font={JSON.parse(fontStr)} {...scoreTextConfig}>
                And Ready To Game
                <meshNormalMaterial />
              </Text3D>
            </mesh>
          </Suspense>
        </Canvas>
      </template.DividedRightSection>
    </template.DividedContents>
  );
}
