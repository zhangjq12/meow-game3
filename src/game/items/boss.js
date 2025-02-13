import Phaser from "phaser";
import { eventEmitter } from "../../eventEmitter";
import { globalVariables } from "../game";
// import { globalVariables } from "../game";

export default class Boss {
  scene;
  zhudou;
  xuetiao;
  text;
  scale = 0.8;
  health = 100;
  constructor(scene) {
    this.scene = scene;
  }
  create(bullets) {
    this.zhudou = this.scene.physics.add
      .sprite(300, 150, "zhudou")
      .setScale(0.6);
    this.xuetiao = this.scene.add.sprite(0, 0, "ground").setScale(0.8, 0.4);
    this.text = this.scene.add.text(250, 60, "血量：100%", {
      font: "16px Courier",
      fill: "#ffffff",
    });
    Phaser.Display.Align.In.LeftCenter(
      this.xuetiao,
      this.scene.add.zone(250, 60, 400, 50)
    );

    const ran = Math.random();
    let speed = 0;
    if (ran > 0.5) speed = 100;
    else speed = -100;
    this.zhudou.setVelocity(speed, 0);
    // child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    // child.setBounceX(Phaser.Math.FloatBetween(0.4, 0.8));
    this.zhudou.setBounce(1);
    this.zhudou.setCollideWorldBounds(true);
    // const baseY = 400;
    // let iter = 0;

    // this.zhudou.children.iterate(function (child) {
    //   child.setX(Math.floor(Math.random() * 500 + 50));
    //   child.setY(baseY + iter * 200);
    //   iter++;
    // });

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
    let i = 0;
    this.scene.physics.add.overlap(
      bullets,
      this.zhudou,
      (zhudou, bullets) => {
        this.collectZhudou(bullets, zhudou);
      },
      (zhudou, bullets) => {
        if (bullets.active && bullets.visible) {
          return true;
        } else {
          return false;
        }
      },
      this
    );

    return this;
  }

  getBossLocation() {
    return { x: this.zhudou.x, y: this.zhudou.y };
  }

  collectZhudou(bullets, star) {
    bullets.setActive(false);
    bullets.setVisible(false);
    // star.disableBody(true, true);
    // globalVariables.totalScore += 10;
    this.health -= globalVariables.damage;
    this.xuetiao.setScale(this.scale - 0.08, 0.4);
    this.scale -= 0.08;
    this.text.setText("血量：" + (this.health > 0 ? this.health : 0) + "%");
    // this.scoreTextLabel.setText("爱星得分: " + globalVariables.totalScore);
    // if (globalVariables.totalScore === 120) {
    //   this.scene.scene.pause();
    //   eventEmitter.emit("photo");
    // }
    if (this.health <= 0) {
      star.setVisible(false);
      this.scene.scene.pause();
      eventEmitter.emit("victory");
    }
    // if (this.stars.countActive(true) === 0) {
    //   this.stars.children.iterate(function (child) {
    //     child.enableBody(true, child.x, 0, true, true);
    //     child.setVelocity(Phaser.Math.Between(-200, 200), 20);
    //   });
    // }
  }
}
