import "antd/dist/reset.css";
import "./App.css";
import { gameConfig, globalVariables } from "./game/game";
import Phaser from "phaser";
import { Button, ConfigProvider, Image, Modal } from "antd";
import { useEffect, useState } from "react";
import { eventEmitter } from "./eventEmitter";
import Fireworks from "./components/fireworks/fireworks";
import { ImageShow } from "./components/images/images";
import zhCN from "antd/locale/zh_CN";
import { SKILLS_EFFECT, SKILLS_NAME } from "./statics/skills";

function App() {
  const [game, setGame] = useState(null);
  const [width, setWidth] = useState("0");
  const [height, setHeight] = useState("0");
  const [openPhoto, setOpenPhoto] = useState(false);
  const [openSkills, setOpenSkills] = useState(false);
  const [openVictory, setOpenVictory] = useState(false);
  const [openFail, setOpenFail] = useState(false);
  const [skills, setSkills] = useState([]);

  const startGame = () => {
    if (!game) {
      setGame(new Phaser.Game(gameConfig));
      setWidth("100%");
      setHeight("100%");
    } else {
      const thisGame = game.scene.keys.startScene;
      thisGame.restart();
    }
  };

  const randomGetSkill = (key) => {
    const ran = Math.random();
    if (ran < 0.33) {
      return { name: SKILLS_NAME[key][0], rare: 0 };
    } else if (ran >= 0.33 && ran < 0.67) {
      return { name: SKILLS_NAME[key][1], rare: 1 };
    } else {
      return { name: SKILLS_NAME[key][2], rare: 2 };
    }
  };

  useEffect(() => {
    eventEmitter.on("photo", () => {
      setOpenPhoto(true);
    });
    eventEmitter.on("skills", () => {
      const res = [];
      for (let i = 0; i < 3; i++) {
        const ran = Math.random();
        if (globalVariables.bullet === "rosered") {
          if (ran < 0.25) {
            res.push(randomGetSkill("damage"));
          } else if (ran >= 0.25 && ran < 0.5) {
            res.push(randomGetSkill("speed"));
          } else if (ran >= 0.5 && ran < 0.75) {
            res.push(randomGetSkill("frequency"));
          } else {
            res.push(randomGetSkill("distance"));
          }
        } else {
          if (ran < 0.2) {
            res.push(randomGetSkill("damage"));
          } else if (ran >= 0.2 && ran < 0.4) {
            res.push(randomGetSkill("speed"));
          } else if (ran >= 0.4 && ran < 0.6) {
            res.push(randomGetSkill("frequency"));
          } else if (ran >= 0.6 && ran < 0.8) {
            res.push(randomGetSkill("distance"));
          } else {
            res.push({ name: SKILLS_NAME.special[0], rare: 3 });
          }
        }
      }
      setSkills(res);
      setOpenSkills(true);
    });
    eventEmitter.on("victory", () => {
      setOpenVictory(true);
    });
    eventEmitter.on("fail", () => {
      setOpenFail(true);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ConfigProvider locale={zhCN}>
      <div className="App">
        <header className="App-header">
          <img src="assets/maoxian.png" className="App-logo" alt="logo" />
          <Image
            src="assets/title.png"
            preview={false}
            className="title-logo"
          />
          <Button type="primary" onClick={startGame}>
            Start Game
          </Button>
        </header>
        <div
          id="gameCanvasDiv"
          className="gameCanvas"
          style={{
            width,
            height,
          }}
        ></div>
        <Modal
          open={openPhoto}
          title="爱你"
          onCancel={() => {
            setOpenPhoto(false);
            const thisGame = game?.scene;
            if (thisGame) {
              thisGame.resume("startScene");
            }
          }}
          footer={null}
        >
          <div
            style={{
              display: "flex",
            }}
          >
            <ImageShow />
            <div>
              <Image src="assets/bobo.gif" preview={false} />
            </div>
          </div>
        </Modal>
        <Modal open={openSkills} title="选择技能增强" footer={null}>
          <div
            style={{
              display: "flex",
            }}
          >
            {skills.map((skill, key) => {
              let rare = "default";
              switch (skill.rare) {
                case 1:
                  rare = "cyan";
                  break;
                case 2:
                  rare = "primary";
                  break;
                case 3:
                  rare = "purple";
                  break;
                default:
                  break;
              }
              return (
                <Button
                  key={key}
                  block
                  color={rare}
                  variant="filled"
                  onClick={() => {
                    SKILLS_EFFECT[skill.name]();
                    setOpenSkills(false);
                    console.log(globalVariables);
                    const thisGame = game?.scene;
                    if (thisGame) {
                      thisGame.resume("startScene");
                    }
                  }}
                  style={{
                    height: "500px",
                  }}
                >
                  {skill.name}
                </Button>
              );
            })}
          </div>
        </Modal>
        <Modal
          open={openVictory}
          onCancel={() => {
            setOpenVictory(false);
            const thisGame = game?.scene;
            if (thisGame) {
              thisGame.start("startScene");
            }
          }}
          footer={null}
        >
          <Fireworks />
          <div className="victoryStr">
            <p>祝贺小喵咪成功过关！</p>
            <p>情人节快乐！每一天都开心！</p>
            <p>我爱你！！</p>
          </div>
        </Modal>
        <Modal
          open={openFail}
          onCancel={() => {
            setOpenFail(false);
            const thisGame = game?.scene;
            if (thisGame) {
              thisGame.start("startScene");
            }
          }}
          footer={null}
        >
          <Fireworks />
          <div className="victoryStr">
            <p>虽然小喵咪没有通关</p>
            <p>但依旧是我最爱的小喵咪！！</p>
            <p>情人节快乐！我爱你！</p>
          </div>
        </Modal>
      </div>
    </ConfigProvider>
  );
}

export default App;
