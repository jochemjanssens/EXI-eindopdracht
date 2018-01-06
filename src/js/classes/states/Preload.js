export default class Preload extends Phaser.State {
  preload() {
    this.load.atlasJSONHash(`tiles`, `assets/tiles.png`, `assets/tiles.json`);
    this.load.atlasJSONHash(`buttons`, `assets/components.png`, `assets/components.json`);
    this.load.atlasJSONHash(`guy1`, `assets/guy1.png`, `assets/guy1.json`);
    this.load.atlasJSONHash(`guy2`, `assets/guy2.png`, `assets/guy1.json`);
    this.load.atlasJSONHash(`guy3`, `assets/guy3.png`, `assets/guy1.json`);
    this.load.atlasJSONHash(`guy4`, `assets/guy4.png`, `assets/guy1.json`);
    this.load.atlasJSONHash(`blue1`, `assets/blue1.png`, `assets/blue1.json`);
    this.load.atlasJSONHash(`blue2`, `assets/blue2.png`, `assets/blue2.json`);
    this.load.atlasJSONHash(`blue3`, `assets/blue3.png`, `assets/blue3.json`);
    this.load.atlasJSONHash(`blue4`, `assets/blue4.png`, `assets/blue4.json`);
    this.load.image(`player`, `assets/player.png`);
    this.load.image(`hotdog`, `assets/hotdog.png`);
    this.load.image(`donut`, `assets/donut.png`);
    this.load.image(`ijs`, `assets/ijs.png`);
    this.load.image(`burger`, `assets/burger.png`);
    this.load.image(`food`, `assets/food.png`);
    this.load.image(`finish`, `assets/finish.png`);
    this.load.image(`bg-effect`, `assets/bg_effect.png`);
  }
  create() {
    this.state.start(`Play`);
    console.log(`game klaar`);
  }
}
