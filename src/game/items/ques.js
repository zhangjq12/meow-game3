import { eventEmitter } from "../../eventEmitter";
import Flowers from './flowers';

export default class Question {
  scene;
  flowers;
  counts;
  isTriggerModal;
  x;
  y;
  constructor(scene) {
    this.scene = scene;
    this.count = 0;
    this.isTriggerModal = false;
    this.x = 0;
    this.y = 0;
  }
  create(player, x, y, isTriggerModal) {
    this.flowers = new Flowers(this.scene);
    this.isTriggerModal = isTriggerModal;
    this.x = x;
    this.y = y;
    const ques = this.scene.physics.add
      .staticSprite(this.x, this.y, "ques")
      .setSize(64, 64)
      .setScale(64 / 225);

    this.scene.physics.add.collider(
      ques,
      player,
      (o1, o2) => this.collideCb(o1, o2),
      (o1, o2) => this.processCb(o1, o2)
    );
    // this.scene.physics.add.overlap(player, stars, this.collectStar, null, this);

    return ques;
  }

  underQuestion(player, ques) {
    return player.x > ques.x - 16 && player.x < ques.x + 16;
  }

  collideCb(ques, player) {
    if (player.y > ques.y && this.underQuestion(player, ques)) {
      this.flowers.create(this.x, this.y - 130);
      this.count ++;
      if (this.count === 5 && this.isTriggerModal) {
        this.count = 0;
        this.scene.scene.pause('startScene');
        eventEmitter.emit('photo');
      }
    }
  }

  processCb(ques, player) {
    if (player.y > ques.y && this.underQuestion(player, ques)) {
      ques.scene.tweens.add({
        targets: ques,
        y: this.y - 10,
        ease: "Power1",
        duration: 100,
        repeat: 1,
        yoyo: true,
      });
    }
  }
}
