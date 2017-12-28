export default class Preload extends Phaser.State {
  preload() {
    this.load.atlasJSONHash(`tiles`, `assets/tiles.png`, `assets/tiles.json`);
    this.load.atlasJSONHash(`buttons`, `assets/components.png`, `assets/components.json`);
    this.load.image(`player`, `assets/player.png`);
    this.load.image(`apple`, `assets/apple.png`);
    this.load.image(`pear`, `assets/pear.png`);
    this.load.image(`banana`, `assets/banana.png`);
    this.load.image(`cherry`, `assets/cherry.png`);
  }
  create() {
    this.state.start(`Play`);
  }
}
