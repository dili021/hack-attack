/* eslint-disable func-names */
import Phaser from 'phaser';
import ScrollingBackground from '../GameObjects/ScrollingBackground';

export default class SceneMainMenu extends Phaser.Scene {
  constructor() {
    super({ key: 'SceneMainMenu' });
  }

  create() {
    const music = this.sound.add('menuMusic');
    music.play({ loop: true });
    this.sfx = {
      btnOver: this.sound.add('sndBtnOver'),
      btnDown: this.sound.add('sndBtnDown'),
    };

    this.gameControls = this.add.text(this.game.config.width * 0.25,
      this.game.config.height * 0.5, 'Movement: W A S D\n\nShoot: Spacebar', {
        fontSize: 24,
        fontStyle: 'bold',
      });

    this.btnPlay = this.add.sprite(
      this.game.config.width * 0.5,
      this.game.config.height * 0.8,
      'sprBtnPlay',
    );
    this.btnPlay.setInteractive();
    this.btnPlay.on(
      'pointerover',
      function () {
        this.btnPlay.setTexture('sprBtnPlayHover');
        this.sfx.btnOver.play();
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
        music.stop();
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
    const bg = new ScrollingBackground(this, 'sprBg0', 10);
    this.backgrounds.push(bg);
  }
}
