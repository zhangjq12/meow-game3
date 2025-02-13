export default class Platform1 {
  scene;
  constructor(scene) {
    this.scene = scene;
  }
  create() {
    
    const platforms = this.scene.physics.add.staticGroup();

    platforms.create(1000, 1500, 'ground').setScale(5, 2).refreshBody();

    // platform 1
    platforms.createMultiple({
      key: 'steelbox',
      repeat: 4,
      setXY: { x: 360, y: 1280, stepX: 64 },
    });
    platforms.createMultiple({
      key: 'steelbox',
      repeat: 5,
      setXY: { x: 744, y: 1280, stepX: 64 },
    });

    // platform 2
    platforms.createMultiple({
      key: 'steelbox',
      repeat: 3,
      setXY: { x: 560, y: 1080, stepX: 64 },
    });
    platforms.createMultiple({
      key: 'steelbox',
      repeat: 1,
      setXY: { x: 880, y: 1080, stepX: 64 },
    });
    platforms.createMultiple({
      key: 'steelbox',
      repeat: 2,
      setXY: { x: 1204, y: 1080, stepX: 64 },
    });

    // platform 3
    platforms.createMultiple({
      key: 'steelbox',
      repeat: 1,
      setXY: { x: 180, y: 880, stepX: 64 },
    });
    platforms.createMultiple({
      key: 'steelbox',
      repeat: 1,
      setXY: { x: 180 + 128 + 192, y: 880, stepX: 64 },
    });
    platforms.create(180 + 128 + 192 + 128 + 64, 880, 'steelbox');
    platforms.createMultiple({
      key: 'steelbox',
      repeat: 1,
      setXY: { x: 180 + 128 + 192 + 256 + 64, y: 880, stepX: 64 },
    });

    // platform 4
    platforms.createMultiple({
      key: 'steelbox',
      repeat: 1,
      setXY: { x: 308, y: 680, stepX: 64 },
    });
    // platforms.create(360, 610, 'ground').setScale(0.1, 0.3).refreshBody();
    // platforms.create(264, 554, 'ground').setScale(0.1, 0.3).refreshBody();
    // platforms.create(660, 538, 'ground');
    // platforms.create(50, 376, 'ground');
    // platforms.create(950, 220, 'ground');

    return platforms;
  }
}
