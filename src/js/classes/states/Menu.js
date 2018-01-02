import Button from '../objects/Button';
let TOPBARHEIGHT;

const socket = io.connect(`http://localhost:8080/`);
let play = false;
socket.on(`start`, message => {
  play = message;
});

export default class Menu extends Phaser.State {
  create() {
    this.createBackground();
    this.createButton();
    this.createInstructions();
    this.createLeftSide();
    this.createRightSide();
  }
  createBackground() {
    const graphics = this.game.add.graphics(0, 0);

    this.stage.backgroundColor = `5151E5`;

    graphics.beginFill(0xBD3B49);
    graphics.drawRect(0, 0, this.game.width / 2, this.game.height);

    TOPBARHEIGHT = this.game.height / 6;
    graphics.beginFill(0xE7E8E8);
    graphics.drawRect(0, 0, this.game.width, TOPBARHEIGHT);

    const styleSmall = {font: `bold 20px Avenir`, fill: `#99A5A7`, boundsAlignH: `center`, boundsAlignV: `middle`};
    const textSmall  = this.game.add.text(0, 0, `WELKOM BIJ`, styleSmall);
    textSmall.setTextBounds(0, 0, this.game.width, 90);

    const style = {font: `bold 40px Avenir`, fill: `#99A5A7`, boundsAlignH: `center`, boundsAlignV: `middle`};
    const text  = this.game.add.text(0, 0, `SJOELBAK BATTLE`, style);
    text.setTextBounds(0, 0, this.game.width, TOPBARHEIGHT + 50);
  }
  createButton() {
    const button = new Button(this.game, this.world.centerX, this.world.centerY + 300, this.buttonClicked, this, `blue`, `Start`);
    button.anchor.setTo(0.5, 0.5);
    this.add.existing(button);
  }

  createLeftSide() {
    const styleDoel = {font: `bold 30px Avenir`, fill: `white`, boundsAlignH: `center`, boundsAlignV: `middle`};
    const textDoel  = this.game.add.text(0, 0, `DOEL VAN HET SPEL?`, styleDoel);
    textDoel.setTextBounds(0, 0, this.game.width / 2, 400);

    const textHelp = this.game.add.text(0, 0, `Help de chef naar jouw kant`, styleDoel);
    textHelp.setTextBounds(0, 0, this.game.width / 2, 650);

    this.chef = this.game.add.sprite(this.game.width / 4, this.game.height / 2 + 100, `player`);
    this.chef.anchor.x = 0.5;
    this.chef.anchor.y = 0.5;
  }

  createRightSide() {
    const styleDoel = {font: `bold 30px Avenir`, fill: `white`, boundsAlignH: `center`, boundsAlignV: `middle`};
    const textDoel  = this.game.add.text(0, 0, `HOE SPEEL JE?`, styleDoel);
    textDoel.setTextBounds(0, 0, this.game.width + (this.game.width / 2), 400);

    const styleHoe = {font: `bold 27px Avenir`, fill: `white`, boundsAlignH: `center`, boundsAlignV: `middle`};
    const textHoe1 = this.game.add.text(0, 0, `Scoor punten met de sjoelbak`, styleHoe);
    textHoe1.setTextBounds(0, 0, this.game.width + (this.game.width / 2), 650);

    const textHoe2 = this.game.add.text(0, 0, `Als je scoort gooit jouw kant eten naar de chef`, styleHoe);
    textHoe2.setTextBounds(0, 0, this.game.width + (this.game.width / 2), 750);

    const textHoe3 = this.game.add.text(0, 0, `Is de chef helemaal aan jouw kant dan win je !`, styleHoe);
    textHoe3.setTextBounds(0, 0, this.game.width + (this.game.width / 2), 850);

    const pressButton = this.game.add.text(0, 0, `DRUK OP DE KNOP OM TE STARTEN`, styleHoe);
    pressButton.setTextBounds(0, 0, this.game.width + (this.game.width / 2), 1400);

    this.food = this.game.add.sprite(this.game.width / 2 + (this.game.width / 10), this.game.height / 2 + 100, `food`);
    this.chef.anchor.x = 0.5;
    this.chef.anchor.y = 0.5;

  }

  createInstructions() {

  }
  buttonClicked() {
    this.state.start(`Play`);
  }
  update() {
    if (play) {
      this.state.start(`Play`);
    }
  }
}
