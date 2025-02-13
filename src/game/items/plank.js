import Phaser from "phaser";
import { eventEmitter } from "../../eventEmitter";
import { globalVariables } from "../game";
// import { globalVariables } from "../game";

const PROPERTY_CHANGE = ["伤害", "频率", "距离"];

export default class Plank {
  scene;
  plank;
  bullets;
  texts = {};
  planks = {};

  constructor(scene) {
    this.scene = scene;
  }
  create(player, bullets) {
    this.bullets = bullets;
    this.plank = this.scene.physics.add.group({
      key: "boli",
      repeat: 12,
      setScale: { x: 0.29, y: 0.08 },
      // setXY: { x: 12, y: 0, stepX: 70 },
    });

    const baseY = 1100;
    let iter = 0;

    this.plank.children.iterate((child) => {
      const x = 150 + (iter % 2) * 300;
      const y = baseY + Math.floor(iter / 2) * 400;
      child.setX(x);
      child.setY(y);
      const ran = Math.random() * 3;
      let prop = "";
      if (ran >= 0 && ran < 1) {
        prop = PROPERTY_CHANGE[0];
      } else if (ran >= 1 && ran < 2) {
        prop = PROPERTY_CHANGE[1];
      } else {
        prop = PROPERTY_CHANGE[2];
      }
      prop += "+" + Math.ceil(Math.random() * 2);
      const text = this.scene.add.text(x, y, prop, {
        font: "16px Courier",
        fill: "#ffffff",
      });
      this.texts[x + "+" + y] = { text: text, prop: prop };

      if (!this.planks[y]) this.planks[y] = [];
      this.planks[y].push(child);

      iter++;
    });

    // this.stars.children.iterate(function (child) {
    //   child.setVelocity(Phaser.Math.Between(-200, 200), 20);
    //   // child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    //   // child.setBounceX(Phaser.Math.FloatBetween(0.4, 0.8));
    //   child.setBounce(Phaser.Math.FloatBetween(0.4, 0.8));
    //   child.setCollideWorldBounds(true);
    // });

    // this.scene.physics.add.collider(this.stars, platforms);
    // for (let i = 0; i < questions.length; i++) {
    //   this.scene.physics.add.collider(
    //     this.stars,
    //     questions[i],
    //     (star, question) => {
    //       this.collideQuestion(star, question);
    //     }
    //   );
    // }
    // let i = 0;
    this.scene.physics.add.overlap(
      player,
      this.plank,
      (player, plank) => {
        this.collidePlank(player, plank);
      },
      null,
      this
    );
  }

  collidePlank(player, plank) {
    // plank.disableBody(true, true);
    let x1 = 0;
    let x2 = 0;
    this.planks[plank.y].forEach((p, i) => {
      if (i === 0) x1 = p.x;
      else x2 = p.x;
      p.disableBody(true, true);
    });
    const res = this.texts[plank.x + "+" + plank.y].prop.split("+");
    const t1 = this.texts[x1 + "+" + plank.y].text;
    t1.setVisible(false);
    t1.setActive(false);
    const t2 = this.texts[x2 + "+" + plank.y].text;
    t2.setVisible(false);
    t2.setActive(false);
    if (res) {
      switch (res[0]) {
        case "伤害":
          globalVariables.damage += parseInt(res[1]);
          break;
        case "频率":
          globalVariables.freq -= parseInt(res[1]) * 100;
          break;
        case "距离":
          globalVariables.distance -= parseInt(res[1]) * 50;
          break;
        default:
          break;
      }
    }
    // globalVariables.totalScore += 10;
    // this.scoreTextLabel.setText("爱星得分: " + globalVariables.totalScore);
    // if (globalVariables.totalScore === 120) {
    //   this.scene.scene.pause();
    //   eventEmitter.emit("photo");
    // }
    // if (this.stars.countActive(true) === 0) {
    //   this.stars.children.iterate(function (child) {
    //     child.enableBody(true, child.x, 0, true, true);
    //     child.setVelocity(Phaser.Math.Between(-200, 200), 20);
    //   });
    // }
  }
}
