import { Game } from 'phaser';
import config from '../config';

export default class GameController extends Game {
  constructor() {
    super(config);
  }
}