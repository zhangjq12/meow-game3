import Phaser from "phaser";
import { globalVariables } from "../game";

export default class Bullet extends Phaser.GameObjects.Image {
  base = 1;
  lastX = 0;
  lastY = 0;
  targetX = 0;
  targetY = 0;
  sin = 0;
  cos = 0;
  totalDis = 0;

  constructor(scene) {
    super(scene, 0, 0, "roseblue");
    this.setScale(0.05, 0.05);

    this.speed = Phaser.Math.GetSpeed(400, 1);
  }

  fire(x, y, targetX, targetY) {
    this.setPosition(x + 20, y);
    this.lastX = x;
    this.lastY = y;

    this.targetX = targetX;
    this.targetY = targetY;

    this.totalDis = Math.sqrt(
      Math.pow(x - targetX, 2) + Math.pow(y - targetY, 2)
    );

    this.sin = (this.lastX - this.targetX) / this.totalDis;
    this.cos = (this.lastY - this.targetY) / this.totalDis;

    this.setActive(true);
    this.setVisible(true);
  }

  getLastXY() {
    return { x: this.lastX, y: this.lastY };
  }

  update(time, delta) {
    console.log(this.texture.key, globalVariables.bullet);
    if (this.texture.key !== globalVariables.bullet)
      this.setTexture(globalVariables.bullet);
    this.x -= this.speed * delta * this.sin;
    this.y -= this.speed * delta * this.cos;
    const distance = Math.sqrt(
      Math.pow(this.x - this.lastX, 2) + Math.pow(this.y - this.lastY, 2)
    );
    if (distance >= globalVariables.distance) {
      this.setActive(false);
      this.setVisible(false);
    }
  }
}
