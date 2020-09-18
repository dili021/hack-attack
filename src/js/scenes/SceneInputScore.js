import Phaser from 'phaser';
import { setScore } from '../scoreQuery';
import ScrollingBackground from '../GameObjects/ScrollingBackground';

export default class SceneInputScore extends Phaser.Scene {
  constructor() {
    super({ key: 'SceneInputScore' });
  }

  create() {
    this.title = this.add.text(this.game.config.width * 0.5, 50, 'GAME OVER', {
      fontFamily: 'monospace',
      fontSize: 48,
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center',
    }).setOrigin(0.5);

    const score = window.localStorage.getItem('score');
    this.add.text(this.game.config.width * 0.5, 140, `Your score: ${score}`, {
      fontSize: 25,
    }).setOrigin(0.5);

    this.text = this.add.text(this.game.config.width * 0.5, 180, 'Please enter your name', {
      fontFamily: 'monospace',
      fontSize: 20,
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center',
    }).setOrigin(0.5);

    this.backgrounds = [];
    const bg = new ScrollingBackground(this, 'sprBg0', 10);
    this.backgrounds.push(bg);

    const form = this.add.dom(350, 0).createFromCache('form');

    form.addListener('click');

    // eslint-disable-next-line func-names
    form.on('click', function (e) {
      e.preventDefault();
      if (e.target.id === 'submitBtn') {
        const input = this.getChildByName('name');

        if (input.value !== '') {
          setScore(input.value, score).then(() => {
            form.scene.scene.start('SceneScoreBoard');
          }).catch(() => {

          });
        } else {
          this.scene.tweens.add({
            targets: this.text,
            alpha: 0.2,
            duration: 250,
            ease: 'Power3',
            yoyo: true,
          });
        }
      }
    });

    this.tweens.add({
      targets: form,
      y: 300,
      duration: 1000,
      ease: 'Power3',
    });
  }
}