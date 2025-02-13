import Phaser from "phaser";
import { eventEmitter } from "../../eventEmitter";
import { globalVariables } from "../game";

export default class Collection {
  scene;
  stars;
  scoreTextLabel;
  constructor(scene) {
    this.scene = scene;
  }
  create(platforms, player, questions, scoreTextLabel) {
    this.scoreTextLabel = scoreTextLabel;
    this.stars = this.scene.physics.add.group({
      key: "star",
      repeat: 11,
      setScale: { x: 0.2, y: 0.2 },
      setXY: { x: 12, y: 0, stepX: 70 },
    });

    this.stars.children.iterate(function (child) {
      child.setVelocity(Phaser.Math.Between(-200, 200), 20);
      // child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
      // child.setBounceX(Phaser.Math.FloatBetween(0.4, 0.8));
      child.setBounce(Phaser.Math.FloatBetween(0.4, 0.8));
      child.setCollideWorldBounds(true);
    });

    this.scene.physics.add.collider(this.stars, platforms);
    for (let i = 0; i < questions.length; i++) {
      this.scene.physics.add.collider(this.stars, questions[i], (star, question) => {
        this.collideQuestion(star, question);
      });
    }
    this.scene.physics.add.overlap(
      player,
      this.stars,
      (player, star) => {
        this.collectStar(player, star);
      },
      null,
      this
    );

    return this.stars;
  }

  collectStar(_player, star) {
    star.disableBody(true, true);
    globalVariables.totalScore += 10;
    this.scoreTextLabel.setText("爱星得分: " + globalVariables.totalScore);
    if (globalVariables.totalScore === 520) {
      this.scene.scene.pause();
      eventEmitter.emit('victory');
    }
    if (this.stars.countActive(true) === 0) {
      this.stars.children.iterate(function (child) {
        child.enableBody(true, child.x, 0, true, true);
        child.setVelocity(Phaser.Math.Between(-200, 200), 20);
      });
    }
  }

  collideQuestion(star, question) {
    const len = question.scene.tweens.getAllTweens().length;

    if (len > 0) {
      console.log(star);
    }
  }
}
