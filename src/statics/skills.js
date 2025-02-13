import { globalVariables } from "../game/game";

export const SKILLS_NAME = {
  speed: ["速度+5", "速度+10", "速度+15"],
  damage: ["伤害+3", "伤害+6", "伤害+9"],
  frequency: ["射速+1", "射速+2", "射速+3"],
  distance: ["射程+1", "射程+2", "射程+3"],
  special: ["子弹变为红玫瑰"],
};

export const SKILLS_EFFECT = {
  "速度+5": () => {
    globalVariables.speed = globalVariables.speed + 0.05;
  },
  "速度+10": () => {
    globalVariables.speed = globalVariables.speed + 0.1;
  },
  "速度+15": () => {
    globalVariables.speed = globalVariables.speed + 0.15;
  },
  "伤害+3": () => {
    globalVariables.damage = globalVariables.damage + 3;
  },
  "伤害+6": () => {
    globalVariables.damage = globalVariables.damage + 6;
  },
  "伤害+9": () => {
    globalVariables.damage = globalVariables.damage + 9;
  },
  "射速+1": () => {
    globalVariables.freq = (globalVariables.freq * 95) / 100;
  },
  "射速+2": () => {
    globalVariables.freq = (globalVariables.freq * 90) / 100;
  },
  "射速+3": () => {
    globalVariables.freq = (globalVariables.freq * 85) / 100;
  },
  "射程+1": () => {
    globalVariables.distance = globalVariables.distance + 50;
  },
  "射程+2": () => {
    globalVariables.distance = globalVariables.distance + 100;
  },
  "射程+3": () => {
    globalVariables.distance = globalVariables.distance + 150;
  },
  子弹变为红玫瑰: () => {
    globalVariables.bullet = "rosered";
  },
};
