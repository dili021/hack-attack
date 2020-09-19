import Phaser from 'phaser';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'SceneBoot' });
  }

  preload() {
    this.load.image('loading', 'assets/loadingScreen.png');
  }

  create() {
    this.scene.start('ScenePreload');
  }
}