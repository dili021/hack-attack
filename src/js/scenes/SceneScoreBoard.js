/* eslint-disable func-names */
import Phaser from 'phaser';
import { getScore } from '../scoreQuery';
import ScrollingBackground from '../GameObjects/ScrollingBackground';

export default class SceneScoreBoard extends Phaser.Scene {
  constructor() {
    super({ key: 'SceneScoreBoard' });
  }

  create() {
    getScore().then(scores => {
      scores.sort((a, b) => b.score - a.score);
      this.add.text(30, 20, 'RANK  SCORE   NAME', { fontStyle: 'bold' });
      for (let i = 0; i < 5; i += 1) {
        this.add.text(30, 70 * (i + 1), ` ${i + 1}     ${scores[i].score}   ${scores[i].user}`, { fontStyle: 'bold' });
      }
    }).catch(e => e);
    this.backgrounds = [];
    const bg = new ScrollingBackground(this, 'sprBg0', 10);
    this.backgrounds.push(bg);
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
  }
}