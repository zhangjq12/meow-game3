import { globalVariables } from "../game";

export default class Score {
  scene;
  constructor(scene) {
    this.scene = scene;
  }
  create() {
    const scoreText = this.scene.add.text(16, 16, "爱星得分: " + globalVariables.totalScore, {
      fontSize: "32px",
      fill: "#000",
    }).setScrollFactor(0);

    // scoreText.fixedToCamera = true;
    // scoreText.cameraOffset.setTo(16, 16);

    return scoreText;
  }
}
