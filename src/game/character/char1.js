export default class Char1 {
  scene;
  constructor(scene) {
    this.scene = scene;
  }

  createPlayer() {
    // const player = this.scene.physics.add.sprite(100, 450, "dude");
    const player = this.scene.physics.add.sprite(100, 3400, "mitao").setSize(100, 240).setScale(0.3);

    // player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    this.scene.anims.create({
      key: "left",
      frames: this.scene.anims.generateFrameNumbers("mitao", { start: 9, end: 16 }),
      frameRate: 10,
      repeat: -1,
    });

    this.scene.anims.create({
      key: "turn",
      frames: this.scene.anims.generateFrameNumbers("mitao", { start: 0, end: 8 }),
      frameRate: 20,
      repeat: -1,
    });

    this.scene.anims.create({
      key: "right",
      frames: this.scene.anims.generateFrameNumbers("mitao", { start: 17, end: 24 }),
      frameRate: 10,
      repeat: -1,
    });

    return player;
  }
}
