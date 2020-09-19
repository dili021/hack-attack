/* eslint-disable func-names */
import Phaser from 'phaser';
import ScrollingBackground from '../GameObjects/ScrollingBackground';

export default class SceneGameOver extends Phaser.Scene {
  constructor() {
    super({ key: 'SceneGameOver' });
  }

  create() {
    this.title = this.add.text(this.game.config.width * 0.5, 128, 'GAME OVER', {
      fontFamily: 'monospace',
      fontSize: 48,
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center',
    });
    this.title.setOrigin(0.5);
    this.sfx = {
      btnOver: this.sound.add('sndBtnOver'),
      btnDown: this.sound.add('sndBtnDown'),
    };
    this.btnRestart = this.add.sprite(
      this.game.config.width * 0.5,
      this.game.config.height * 0.85,
      'sprBtnRestart',
    ).setInteractive();

    this.btnRestart.on(
      'pointerover',
      function () {
        this.btnRestart.setTexture('sprBtnRestartHover');
        this.sfx.btnOver.play();
      },
      this,
    );

    this.btnRestart.on('pointerout', function () {
      this.setTexture('sprBtnRestart');
    });

    this.btnRestart.on(
      'pointerdown',
      function () {
        this.btnRestart.setTexture('sprBtnRestartDown');
        this.sfx.btnDown.play();
        this.scene.start('SceneMain');
      },
      this,
    );

    this.btnRestart.on(
      'pointerup',
      function () {
        this.btnRestart.setTexture('sprBtnRestart');
      },
      this,
    );
    this.backgrounds = [];
    const bg = new ScrollingBackground(this, 'sprBg0', 0);
    this.backgrounds.push(bg);
  }

  update() {
    for (let i = 0; i < this.backgrounds.length; i += 1) {
      this.backgrounds[i].update();
    }
  }
}
