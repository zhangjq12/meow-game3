export default class Flowers {
  scene;
  flowers;
  tween;
  constructor(scene) {
    this.scene = scene;
    this.flowers = [];
  }
  create(x, y) {
    if (this.flowers.length === 0) {
      for (let i = 0; i < 30; i ++) {
        // const x = a * (2 * Math.cos(t) - Math.cos(2*t));
        // const y = a * (2 * Math.sin(t) - Math.sin(2*t));
        const t = 2 * Math.PI / 30 * (i + 1);
        const x1 = 16 * Math.pow(Math.sin(t), 3);
        const y1 = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
        this.flowers.push(this.scene.add.sprite(x - (x1 * 5), y - (y1 * 5), i % 2 === 0 ? 'rosered' : 'roseblue').setScale(i % 2 === 0 ? 0.2 / 10 : 0.2 / 5).setAlpha(0));
      }
      this.flowers.push(this.scene.add.sprite(x - 3, y + 15, 'zhudou').setScale(0.3).setAlpha(0));
    }
    // flowers.push(this.scene.add.sprite(680, 480, 'star').setScale(0.2).setAlpha(0));
    // flowers.push(this.scene.add.sprite(660, 460, 'star').setScale(0.2).setAlpha(0));
    // flowers.push(this.scene.add.sprite(640, 440, 'star').setScale(0.2).setAlpha(0));
    // flowers.push(this.scene.add.sprite(620, 420, 'star').setScale(0.2).setAlpha(0));
    // flowers.push(this.scene.add.sprite(600, 400, 'star').setScale(0.2).setAlpha(0));
    // flowers.push(this.scene.add.sprite(600, 400, 'star').setScale(0.2).setAlpha(0));
    // flowers.push(this.scene.add.sprite(600, 400, 'star').setScale(0.2).setAlpha(0));
    // flowers.push(this.scene.add.sprite(600, 400, 'star').setScale(0.2).setAlpha(0));
    // flowers.push(this.scene.add.sprite(600, 400, 'star').setScale(0.2).setAlpha(0));
    // flowers.push(this.scene.add.sprite(600, 400, 'star').setScale(0.2).setAlpha(0));
    // flowers.push(this.scene.add.sprite(600, 400, 'star').setScale(0.2).setAlpha(0));
    // flowers.push(this.scene.add.sprite(600, 400, 'star').setScale(0.2).setAlpha(0));
    // flowers.push(this.scene.add.sprite(600, 400, 'star').setScale(0.2).setAlpha(0));
    // flowers.push(this.scene.add.sprite(600, 400, 'star').setScale(0.2).setAlpha(0));

    // for (let i = 0; i < this.flowers.length; i++) {
    if (this.tween) {
      this.tween.restart();
    } else {
      this.tween = this.scene.tweens.add({
        targets: this.flowers,
        delay: this.scene.tweens.stagger(50),
        duration: 100,
        hold: 2000,
        yoyo: true,
        ease: 'easeInOut',
        alpha: 1,
      })
    }

    // scoreText.fixedToCamera = true;
    // scoreText.cameraOffset.setTo(16, 16);
  }
}
