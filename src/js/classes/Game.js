import Preload from './states/Preload';
import Menu from './states/Menu';
import Play from './states/Play';
import Win from './states/Win';

export default class Game extends Phaser.Game {
  constructor() {
    super(1600, 800, Phaser.AUTO);
    this.state.add(`Preload`, Preload);
    this.state.add(`Menu`, Menu);
    this.state.add(`Play`, Play);
    this.state.add(`Win`, Win);
    this.state.start(`Preload`);
  }
}
