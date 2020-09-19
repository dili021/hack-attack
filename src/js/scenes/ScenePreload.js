import Phaser from 'phaser';

export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super('ScenePreload');
  }

  init() {
    this.readyCount = 0;
  }

  preload() {
    this.add.image(400, 200, 'loading');
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(100, 260, 460, 50);

    const { width } = this.cameras.main;
    const { height } = this.cameras.main;
    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff',
      },
    });
    loadingText.setOrigin(0.4, 0.4);

    const percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    percentText.setOrigin(0.5, 0.5);

    const assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    assetText.setOrigin(0.5, 0.5);

    this.load.on('progress', (value) => {
      percentText.setText(`${parseInt(value * 100, 10)}%`);
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(110, 270, 440 * value, 30);
    });

    this.load.on('fileprogress', (file) => {
      assetText.setText(`Loading asset: ${file.key}`);
    });

    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
      this.ready();
    });

    this.timedEvent = this.time.delayedCall(3000, this.ready, [], this);

    this.load.audio('scoreMusic', 'assets/audio/scoreMusic.mp3');
    this.load.image('sprBg0', 'assets/Matrix_large.png');
    this.load.image('sprBtnPlay', 'assets/sprBtnPlay.png');
    this.load.image('sprBtnAudio', 'assets/sprBtnAudio.png');
    this.load.image('sprBtnPlayHover', 'assets/sprBtnPlayHover.png');
    this.load.image('sprBtnPlayDown', 'assets/sprBtnPlayDown.png');
    this.load.image('sprBtnRestart', 'assets/sprBtnRestart.png');
    this.load.image('sprBtnRestartHover', 'assets/sprBtnRestartHover.png');
    this.load.image('sprBtnRestartDown', 'assets/sprBtnRestartDown.png');
    this.load.html('form', 'assets/input/form.html');
    this.load.audio('sndBtnOver', 'assets/audio/sndBtnOver.wav');
    this.load.audio('sndBtnDown', 'assets/audio/sndBtnDown.wav');
    this.load.audio('menuMusic', 'assets/audio/menuMusic.mp3');
    this.load.image('background', 'assets/Matrix_large.png');
    this.load.spritesheet('sprExplosion', 'assets/sprExplosion.png', {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.image('sprEnemy0', 'assets/bug.png');

    this.load.image('sprLaserEnemy0', 'assets/sprLaserEnemy0.png');
    this.load.image('sprLaserPlayer', 'assets/player_laser.png');
    this.load.image('sprPlayer', 'assets/player_avatar.png');
    this.load.audio('sndExplode0', 'assets/audio/sndExplode0.wav');
    this.load.audio('sndExplode1', 'assets/audio/sndExplode1.wav');
    this.load.audio('sndLaser', 'assets/audio/sndLaser.wav');
    this.load.audio('backgroundMusic', 'assets/audio/backgroundMusic.mp3');
  }

  ready() {
    this.readyCount += 1;
    if (this.readyCount === 2) {
      this.scene.start('SceneMainMenu');
    }
  }
}
