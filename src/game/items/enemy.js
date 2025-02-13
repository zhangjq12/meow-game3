import Phaser from "phaser";
import { eventEmitter } from "../../eventEmitter";
import { globalVariables } from "../game";

export default class Enemy {
  scene;
  zhudou;
  zhudouMap = {};

  constructor(scene) {
    this.scene = scene;
  }
  create(player, bullets, scoreTextLabel) {
    this.scoreTextLabel = scoreTextLabel;
    this.zhudou = this.scene.physics.add.group({
      key: "zhudou",
      repeat: 12,
      setScale: { x: 0.3, y: 0.3 },
      // setXY: { x: 12, y: 0, stepX: 70 },
    });
    const baseY = 300;
    let iter = 0;

    this.zhudou.children.iterate((child) => {
      const x = Math.floor(Math.random() * 500 + 50);
      const y = baseY + (Math.random() > 0.5 ? 100 : -100);

      // const x = Math.floor(Math.random() * 500 + 50);
      // const y = baseY + iter * 200;
      child.setX(x);
      child.setY(y);

      const ran = Math.random();
      let speed = 0;
      if (ran > 0.5) speed = 100;
      else speed = -100;
      const ranDir = Math.random() * Math.PI * 2;
      const dx = Math.sin(ranDir);
      const dy = Math.cos(ranDir);

      child.setVelocity(speed * dx, speed * dy);
      child.setBounce(1);
      child.setCollideWorldBounds(true);

      child.name = `child${iter}`;
      this.zhudouMap[child.name] = child;
      child.health = 30;

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
    this.scene.physics.add.overlap(
      bullets,
      this.zhudou,
      (bullets, zhudou) => {
        this.collectZhudou(bullets, zhudou);
      },
      null,
      this
    );

    this.scene.physics.add.overlap(
      player,
      this.zhudou,
      (player, zhudou) => {
        this.gameover(player, zhudou);
      },
      null,
      this
    );

    return this;
  }

  getNearestZhudou(bullets) {
    const bx = bullets.getLastXY().x;
    const by = bullets.getLastXY().y;
    let minDis = 99999;
    let result = { x: 0, y: 0 };
    Object.values(this.zhudouMap).forEach((child) => {
      const dis = Math.sqrt(
        Math.pow(child.x - bx, 2) + Math.pow(child.y - by, 2)
      );
      if (dis < minDis) {
        minDis = dis;
        result.x = child.x;
        result.y = child.y;
      }
    });
    return result;
  }

  collectZhudou(bullets, star) {
    bullets.setActive(false);
    bullets.setVisible(false);
    star.health -= globalVariables.damage;
    console.log(star.health);
    if (star.health <= 0) {
      star.disableBody(true, true);
      delete this.zhudouMap[star.name];
      globalVariables.totalScore += 10;
      this.scoreTextLabel.setText("爱星得分: " + globalVariables.totalScore);
      if (globalVariables.totalScore % 50 === 0) {
        this.scene.scene.pause();
        eventEmitter.emit("skills");
      }
      if (globalVariables.totalScore === 120) {
        this.scene.scene.pause();
        eventEmitter.emit("photo");
      }
      if (this.zhudou.countActive(true) === 0) {
        let iter = 0;
        this.zhudou.children.iterate((child) => {
          child.enableBody(true, child.x, child.y, true, true);
          const ran = Math.random();
          let speed = 0;
          if (ran > 0.5) speed = 100;
          else speed = -100;
          const ranDir = Math.random() * Math.PI * 2;
          const dx = Math.sin(ranDir);
          const dy = Math.cos(ranDir);

          child.setVelocity(speed * dx, speed * dy);
          child.name = `child${iter}`;
          this.zhudouMap[child.name] = child;
          iter++;
          // child.setVelocity(Phaser.Math.Between(-200, 200), 20);
        });
      }
    }
  }

  gameover(_player, _zhudou) {
    this.scene.scene.pause();
    eventEmitter.emit("fail");
  }
}
