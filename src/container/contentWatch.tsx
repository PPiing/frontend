/* eslint-disable react/no-unstable-nested-components */
import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { styled } from "@stitches/react";
import * as THREE from "three";
import { Canvas, extend, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, Text3D, Shadow, Float, Sparkles } from "@react-three/drei";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import * as theme from "../theme/theme";
import { getGameList } from "../network/api/axios.custom";
import * as template from "./contentTemplate";
import { ReducerType } from "../redux/rootReducer";
import { GameRuleData, setGameRuleData } from "../redux/slices/gameRule";
import store from "../redux/store";

import fontPath from "../../public/asset/font/dohyeon_Regular.json";
import socketManager from "../network/api/socket";

extend({ TextGeometry });

let isClicked = 0;

const socket = socketManager.socket("/");

const textureSpace = new THREE.TextureLoader().load("../../asset/background_space.jpeg");
const textureBrick = new THREE.TextureLoader().load("../../asset/background_brick.png");

const fontStr : string = JSON.stringify(fontPath);

const gameBoardHeight = 5;
const gameBoardWidth = 7;
const RacketSize = 1;

const nameTextConfig = {
  size: 0.45,
  height: 0.2,
  curveSegments: 0.2,
  bevelEnabled: true,
  bevelThickness: 0.1,
  bevelSize: 0.01,
  bevelOffset: 0,
  bevelSegments: 8
};

const scoreTextConfig = {
  size: 1.4,
  height: 0.2,
  curveSegments: 0.2,
  bevelEnabled: true,
  bevelThickness: 0.1,
  bevelSize: 0.01,
  bevelOffset: 0,
  bevelSegments: 8
};

const endingTextConfig = {
  size: 1.1,
  height: 1,
  curveSegments: 0.6,
  bevelEnabled: true,
  bevelThickness: 0.1,
  bevelSize: 0.02,
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

socket.connect();

const RoomListSection = styled("div", {
  display: "block",
  flexDirection: "column",
  height: "100%",
  overflowY: "scroll",
  overflowX: "hidden",
  marginTop: "20px",
  marginBottom: "20px",
  "&::-webkit-scrollbar": {
    display: "none",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: theme.NEON_RED,
    borderRadius: "10px",
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: "grey",
    borderRadius: "10px",
  },
});

type GameRoom = {
  player1: string;
  player2: string;
  roomId: string;
};

export function ContainerContents() {
  const [gameId, setGameId] = useState(-1);
  const [gameLists, setGameLists] = useState<any[]>([]);

  useEffect(() => {
    // getGameList().then((response: any) => setGameLists(response.data));
    getGameList().then((response: any) => console.log(response.data));
  }, []);

  const GameListsRender = () => {
    return gameLists.map((item, i) => {
      return (
        <template.ListBox
          onClick={() => setGameId(item.roomId)}
          key={i}
          style={{ color: theme.NEON_RED, borisClickedderColor: theme.NEON_RED }}
        >
          {item.player1} vs {item.player2}
        </template.ListBox>
      )
    })
  };

  function GameWatchRender() {
    const [redRacketYPos, setRedRacketYPos] = useState(0);
    const [blueRacketYPos, setBlueRacketYPos] = useState(0);
    const [ballXpos, setBallXpos] = useState(0);
    const [ballYpos, setBallYpos] = useState(0);

    const myRule = useSelector<ReducerType, GameRuleData>((state) => state.gameRule);

    const [gamer1Name, setGamer1Name] = useState(myRule?.blueUser);
    const [gamer1Score, setGamer1Score] = useState(myRule?.blueScore);
    const [gamer2Name, setGamer2Name] = useState(myRule?.redUser);
    const [gamer2Score, setGamer2Score] = useState(myRule?.redScore);
    const [gameEnd, setGameEnd] = useState(false);
    const [winnerName, setWinnerName] = useState("");

    console.log("blue >", gamer1Score, "red >", gamer2Score);

    let timeStamp = 0;
    let frameTimer1 = 0;
    let frameTimer2 = 0;

    // const [ballXpos, setBallXpos] = useState(0);
    // const [ballYpos, setBallYpos] = useState(0);
    // const [ballXpos, setBallXpos] = useState(0);
    // const [ballYpos, setBallYpos] = useState(0);

    // socket.emit("game:render", {
    //   ball: { x: 2, y: -3 },
    //   paddleTop: { x: 0, y: 0 },
    //   paddleBtm: { x: 0, y: 0 }
    // });

    // socket.on("game:paddle", (res) => {
    //   console.log("server =>", res);
    // });

    const spinScore1 = () => {
      const wowScore : React.Ref<any> = useRef();
      useFrame(({ clock }) => {
        frameTimer1 = clock.getElapsedTime() - timeStamp;
        if (wowScore !== undefined && frameTimer1 < 4) {
          wowScore.current.rotation.y = (200) / (frameTimer1 * 4);
          wowScore.current.rotation.z = (200) / (frameTimer1 * 4);
        }
      });
      return (
        <mesh position={[-3.5, 1.3, -4]} ref={wowScore}>
          <Text3D font={JSON.parse(fontStr)} {...scoreTextConfig}>
            {gamer1Score}
            <meshNormalMaterial />
          </Text3D>
          <meshLambertMaterial attach="material" color={theme.NEON_BLU} />
        </mesh>
      );
    };

    const spinScore2 = () => {
      const wowScore : React.Ref<any> = useRef();
      useFrame(({ clock }) => {
        frameTimer2 = clock.getElapsedTime() - timeStamp;
        if (wowScore !== undefined && frameTimer2 < 4) {
          wowScore.current.rotation.y = (200) / (frameTimer2 * 4);
        }
      });
      return (
        <mesh position={[0.7, 1.3, -4]} ref={wowScore}>
          <Text3D font={JSON.parse(fontStr)} {...scoreTextConfig}>
            {gamer2Score}
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
        if (spinBall !== undefined) {
          spinBall.current.rotation.x = a * 8;
          spinBall.current.rotation.y = a * 2;
        }
      });
      return (
        <mesh position={[ballXpos, 0.06, ballYpos]} ref={spinBall}>
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

    const ReactiveScore1 = () => {
      return spinScore1();
    };

    const ReactiveScore2 = () => {
      return spinScore2();
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
          console.log("Press Up, emit -1");
        }
      }
      if (e.key === "ArrowDown") {
        if (redRacketYPos > (gameBoardHeight / 2 - RacketSize * 0.6)) {
          return -1;
        }
        if (isClicked === 0) {
          isClicked = 1;
          socket.emit("game:paddle", 1);
          console.log("Press Up, emit 1");
        }
      }
      return 0;
    };

    const controlKeyUp = (e:any) => {
      if (e.key === "ArrowUp") {
        if (redRacketYPos < (-gameBoardHeight / 2 + RacketSize * 0.6)) {
          return -1;
        }
        if (isClicked === 1) {
          isClicked = 0;
          socket.emit("game:paddle", 0);
          console.log("Press Up end, emit 0");
        }
      }
      if (e.key === "ArrowDown") {
        if (redRacketYPos > (gameBoardHeight / 2 - RacketSize * 0.6)) {
          return -1;
        }
        if (isClicked === 1) {
          isClicked = 0;
          socket.emit("game:paddle", 0);
          console.log("Press Down end, emit 0");
        }
      }
      return 0;
    };

    useEffect(() => {
      window.addEventListener("keydown", controlKeyDown);
      window.addEventListener("keyup", controlKeyUp);

      socket.on("game:render", (res) => {
        // console.log("server =>", res);
        setBallXpos(res.ball.x / 100);
        setBallYpos(res.ball.y / 100);
        setRedRacketYPos(res.paddleRed.y / 100);
        setBlueRacketYPos(res.paddleBlue.y / 100);
      });

      socket.on("game:score", (res) => {
        console.log("server's Score =>", res);
        if (res.blue !== gamer1Score) {
          setGamer1Score(res.blue);
          timeStamp = frameTimer1;
        }
        if (res.red !== gamer2Score) {
          setGamer2Score(res.red);
          timeStamp = frameTimer1;
        }
        // eslint-disable-next-line max-len
        store.dispatch(setGameRuleData({ ...myRule, redScore: res.red, blueScore: res.blue } as GameRuleData));
        setRedRacketYPos(0);
        setBlueRacketYPos(0);
      });

      socket.on("game:end", (res) => {
        console.log("Game End!", res);
        if (res.inGameData.scoreBlue > res.inGameData.scoreRed) {
          console.log(res.metaData.playerBlue.nickName, "   w i n !");
          setWinnerName(`${res.metaData.playerBlue.nickName} Win!`)
        } else {
          console.log(res.metaData.playerRed.nickName, "   w i n !");
          setWinnerName(`${res.metaData.playerRed.nickName} Win!`)
        }
        setGameEnd(true);
        // eslint-disable-next-line max-len
        store.dispatch(setGameRuleData({ ...myRule, isInGame: false, redScore: 0, blueScore: 0 } as GameRuleData));
      });

      return () => {
        window.removeEventListener("keydown", controlKeyDown);
        window.removeEventListener("keyup", controlKeyUp);
        socket.off("game:render");
        socket.off("game:score");
        socket.off("game:end");
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
          {
            gameEnd ? (
              <Float
                speed={2} // Animation speed, defaults to 1
                rotationIntensity={1.8} // XYZ rotation intensity, defaults to 1
                floatIntensity={7}
                floatingRange={[-0.2, 0.1]}
              >
                <mesh position={[-3.7, 1, 0]}>
                  <Text3D font={JSON.parse(fontStr)} {...endingTextConfig}>
                    {winnerName}
                    <meshNormalMaterial />
                  </Text3D>
                  <meshLambertMaterial attach="material" color={theme.NEON_BLU} />
                </mesh>
              </Float>
            ) : (
              <>
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
                <meshLambertMaterial attach="material" transparent opacity={0.1} emissive="#000011" reflectivity={0.8} refractionRatio={0.8} combine={THREE.MultiplyOperation} wireframeLinewidth={0.5} wireframeLinecap="square" wireframeLinejoin="miter" map={textureSpace} />
              </>
            )}
        </mesh>

        {/* Red 게임바 */}
        <Float
          speed={5} // Animation speed, defaults to 1
          rotationIntensity={0.1} // XYZ rotation intensity, defaults to 1
          floatIntensity={5}
          floatingRange={[-0.02, 0.01]}
        >
          <mesh position={[3.4, 0.3, redRacketYPos]}>
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
          <mesh position={[-3.4, 0.3, blueRacketYPos]}>
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
          <ReactiveScore1 />
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
          {/* <mesh position={[0.7, 1, -4]}>
            <Text3D font={JSON.parse(fontStr)} {...scoreTextConfig}>
              {gamer2Score}
              <meshNormalMaterial />
            </Text3D>
            <meshLambertMaterial attach="material" color={theme.NEON_BLU} />
          </mesh> */}
          <ReactiveScore2 />
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
  };

  return (
    <template.DividedContents>
      <template.DividedLeftSection>
        <RoomListSection>
          {GameListsRender()}
        </RoomListSection>
      </template.DividedLeftSection>
      <template.DividedRightSection>
        {GameWatchRender()}
      </template.DividedRightSection>
    </template.DividedContents>
  );
}
