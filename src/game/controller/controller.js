import { globalVariables } from "../game";

let direction = "right";

export const controllerInit = (scene) => {
  const cursors = scene.input.keyboard.createCursorKeys();
  return cursors;
};

export const controllerUpdate = (cursors, player) => {
  if (cursors.left.isDown) {
    player.setVelocityX(-160 * globalVariables.speed);
    direction = "left";

    player.anims.play("left", true);
  } else if (cursors.right.isDown) {
    player.setVelocityX(160 * globalVariables.speed);
    direction = "right";

    player.anims.play("right", true);
  } else {
    player.setVelocityX(0);

    player.anims.play("turn");
  }

  if (cursors.up.isDown) {
    player.setVelocityY(-160 * globalVariables.speed);
    if (direction === "left") player.anims.play("left", true);
    else player.anims.play("right", true);
  } else if (cursors.down.isDown) {
    player.setVelocityY(160 * globalVariables.speed);
    if (direction === "left") player.anims.play("left", true);
    else player.anims.play("right", true);
  } else {
    player.setVelocityY(0);
  }

  // if (cursors.space.isDown && player.body.touching.down) {
  //   player.setVelocityY(-660);
  // }
};

// export const autoMove = (player, speed = 1, cameras) => {
//   if (cameras.main.scrollY > 0) {
//     player.setVelocityY(-100 * speed);
//   } else {
//     player.setVelocityY(0);
//   }
// };

export const autoShoot = (player, bullets, time, lastfired, enemyClass, bossClass) => {
  if (time > lastfired) {
    const bullet = bullets.get();
    if (bullet) {
      const enemy = enemyClass.getNearestZhudou(bullet);
      const boss = bossClass.getBossLocation();
      const disEnemy = Math.sqrt(
        Math.pow(player.x - enemy.x, 2) + Math.pow(player.y - enemy.y, 2)
      );
      const disBoss = Math.sqrt(
        Math.pow(player.x - boss.x, 2) + Math.pow(player.y - boss.y, 2)
      );

      const nearest = disEnemy >= disBoss ? boss : enemy;
      bullet.fire(player.x, player.y, nearest.x, nearest.y);
      return time + globalVariables.freq;
    }
  }

  return lastfired;
};
