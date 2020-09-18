import Phaser from 'phaser';
import SceneMainMenu from './scenes/SceneMainMenu';
import SceneMain from './scenes/SceneMain';
import SceneGameOver from './scenes/SceneGameOver';
import SceneInputScore from './scenes/SceneInputScore';
import SceneScoreBoard from './scenes/SceneScoreBoard';

export default {
  type: Phaser.AUTO,
  parent: 'phaser-container',
  width: 640,
  height: 480,
  backgroundColor: 'black',
  autoCenter: Phaser.Scale.CENTER_BOTH,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
    },
  },
  dom: {
    createContainer: true,
  },
  scene: [SceneMainMenu, SceneMain, SceneInputScore, SceneScoreBoard, SceneGameOver],
  pixelArt: true,
  roundPixels: true,
};