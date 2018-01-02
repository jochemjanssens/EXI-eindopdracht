export default class Preload extends Phaser.State {
  preload() {
    this.load.atlasJSONHash(`tiles`, `assets/tiles.png`, `assets/tiles.json`);
    this.load.atlasJSONHash(`buttons`, `assets/components.png`, `assets/components.json`);
    this.load.atlasJSONHash(`guy1`, `assets/guy1.png`, `assets/guy1.json`);
    this.load.image(`player`, `assets/player.png`);
    this.load.image(`hotdog`, `assets/hotdog.svg`);
    this.load.image(`donut`, `assets/donut.svg`);
    this.load.image(`ijs`, `assets/ijs.svg`);
    this.load.image(`burger`, `assets/burger.svg`);
    this.load.image(`food`, `assets/food.png`);
    this.load.image(`finish`, `assets/finish.png`);
  }
  create() {
    this.state.start(`Win`);
    console.log(`game klaar`);
  }
}
