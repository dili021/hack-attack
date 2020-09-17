/* eslint-disable func-names */
import Phaser from 'phaser';
import ScrollingBackground from '../GameObjects/ScrollingBackground';

export default class SceneMainMenu extends Phaser.Scene {
  constructor() {
    super({ key: 'SceneMainMenu' });
  }

  preload() {
    this.load.image('sprBg0', 'src/assets/Matrix_large.png');
    this.load.image('sprBtnPlay', 'src/assets/sprBtnPlay.png');
    this.load.image('sprBtnPlayHover', 'src/assets/sprBtnPlayHover.png');
    this.load.image('sprBtnPlayDown', 'src/assets/sprBtnPlayDown.png');
    this.load.image('sprBtnRestart', 'src/assets/sprBtnRestart.png');
    this.load.image('sprBtnRestartHover', 'src/assets/sprBtnRestartHover.png');
    this.load.image('sprBtnRestartDown', 'src/assets/sprBtnRestartDown.png');

    this.load.audio('sndBtnOver', 'src/assets/sndBtnOver.wav');
    this.load.audio('sndBtnDown', 'src/assets/sndBtnDown.wav');
  }

  create() {
    this.sfx = {
      btnOver: this.sound.add('sndBtnOver'),
      btnDown: this.sound.add('sndBtnDown'),
    };
    this.btnPlay = this.add.sprite(
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      'sprBtnPlay',
    );
    this.btnPlay.setInteractive();
    this.btnPlay.on(
      'pointerover',
      function () {
        this.btnPlay.setTexture('sprBtnPlayHover'); // set the button texture to sprBtnPlayHover
        this.sfx.btnOver.play(); // play the button over sound
      },
      this,
    );
    this.btnPlay.on('pointerout', function () {
      this.setTexture('sprBtnPlay');
    });
    this.btnPlay.on(
      'pointerdown',
      function () {
        this.btnPlay.setTexture('sprBtnPlayDown');
        this.sfx.btnDown.play();
      },
      this,
    );
    this.btnPlay.on(
      'pointerup',
      function () {
        this.btnPlay.setTexture('sprBtnPlay');
        this.scene.start('SceneMain');
      },
      this,
    );
    this.title = this.add.text(
      this.game.config.width * 0.5,
      128,
      'Hack Attack!',
      {
        fontFamily: 'monospace',
        fontSize: 48,
        fontStyle: 'bold',
        color: '#ffffff',
        align: 'center',
      },
    );
    this.title.setOrigin(0.5);
    this.backgrounds = [];
    // this.backgrounds = [];
    // for (let i = 0; i < 5; i += 1) {
    const bg = new ScrollingBackground(this, 'sprBg0', 10);
    this.backgrounds.push(bg);
  }

  // update() {
  //   for (let i = 0; i < this.backgrounds.length; i += 1) {
  //     this.backgrounds[i].update();
  //   }
  // }
}
