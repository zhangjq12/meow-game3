import Phaser from "phaser";
import Char1 from "../character/char1";
import {
  // autoMove,
  autoShoot,
  controllerInit,
  controllerUpdate,
} from "../controller/controller";
import { globalVariables } from "../game";
// import Collection from "../items/collection";
import Bullet from "../items/bullet";
// import Question from '../items/ques';
import Score from "../menu/score";
import Enemy from "../items/enemy";
import Boss from "../items/boss";
import Plank from "../items/plank";
// import Platform1 from '../platforms/combo1'

export default class HelloWorldScene extends Phaser.Scene {
  cursors;
  player;
  bullets;
  enemy;
  height;
  lastfired = 0;
  constructor() {
    super("startScene");
    this.height = 600;
  }

  preload() {
    // this.load.setBaseURL('https://labs.phaser.io');

    // this.load.image('logo', 'assets/sprites/phaser3-logo.png');
    // this.load.image('red', 'assets/particles/red.png');

    this.load.image("sky", "assets/blue.jpeg");
    this.load.image("ground", "assets/platform.png");
    this.load.image("steelbox", "assets/steelbox.png");
    this.load.image("ques", "assets/question.jpeg");
    this.load.image("star", "assets/star.png");
    this.load.image("rosered", "assets/rosered.png");
    this.load.image("roseblue", "assets/roseblue.png");
    this.load.image("zhudou", "assets/zhudou.jpeg");
    this.load.image("boli", "assets/toumingboli.png");
    // this.load.image('bomb', 'assets/sprites/bomb.png');
    this.load.spritesheet("dude", "assets/dude.png", {
      frameWidth: 32,
      frameHeight: 42,
    });
    this.load.spritesheet("mitao", "assets/mitao.png", {
      frameWidth: 240,
      frameHeight: 240,
    });
  }

  create() {
    globalVariables.totalScore = 0;
    this.createEmitter();
    // this.physics.add.staticSprite(680, 480, 'ques').setSize
  }

  update(time, delta) {
    controllerUpdate(this.cursors, this.player);
    // autoMove(this.player, 1, this.cameras);
    this.lastfired = autoShoot(
      this.player,
      this.bullets,
      time,
      this.lastfired,
      this.enemy,
      this.boss
    );
    // console.log(this.lastfired)
  }

  createEmitter() {
    // const particles = this.add.particles('red')

    // const emitter = particles.createEmitter({
    //   speed: 100,
    //   scale: { start: 1, end: 0 },
    //   blendMode: 'ADD',
    // })

    // const logo = this.physics.add.image(400, 100, 'logo')

    // logo.setVelocity(100, 200)
    // logo.setBounce(1, 1)
    // logo.setCollideWorldBounds(true)

    // emitter.startFollow(logo)
    this.add
      .image(this.game.config.width / 2, this.game.config.height / 2, "sky")
      .setScale(34);
    // this.physics.world.setBounds(0, 0, 1024, this.height);
    // this.cameras.main.setBounds(0, 0, 1024, this.height);
    this.physics.world.setBounds(0, 0, 1024, 768);
    this.cameras.main.setBounds(0, 0, 1024, 768);

    // const platform1 = new Platform1(this);
    // const platforms = platform1.create();

    const char1 = new Char1(this);
    this.player = char1.createPlayer();
    // const questions = [];
    // questions.push(new Question(this).create(this.player, 680, 1280, false));
    // questions.push(new Question(this).create(this.player, 816, 1080, false));
    // questions.push(new Question(this).create(this.player, 180 + 128 + 192 + 128, 880, false));
    // questions.push(new Question(this).create(this.player, 340, 480, true));

    // this.physics.add.collider(this.player, platforms);
    this.cursors = controllerInit(this);
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setFollowOffset(0, 300);

    this.bullets = this.physics.add.group({
      classType: Bullet,
      maxSize: 100,
      runChildUpdate: true,
    });
    this.bullets.createMultiple({ quantity: 100, active: false });
    globalVariables.damage = 10;
    globalVariables.distance = 800;
    globalVariables.freq = 1000;
    globalVariables.speed = 1;
    globalVariables.bullet = "roseblue";

    const scoreText = new Score(this);
    const scoreTextLabel = scoreText.create();

    const enemy = new Enemy(this);
    this.enemy = enemy.create(this.player, this.bullets, scoreTextLabel);

    // const plank = new Plank(this);
    // plank.create(this.player, this.bullets);

    const boss = new Boss(this);
    this.boss = boss.create(this.bullets);

    // const collection = new Collection(this);
    // collection.create(platforms, this.player, questions, scoreTextLabel);
  }

  restart() {
    globalVariables.totalScore = 0;
    globalVariables.damage = 10;
    globalVariables.distance = 800;
    globalVariables.freq = 1000;
    globalVariables.speed = 1;
    globalVariables.bullet = "roseblue";
    if (this.scene.systems.isActive()) {
      this.scene.restart();
    } else {
      this.scene.start();
    }
  }
}
