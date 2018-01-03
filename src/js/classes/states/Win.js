import Button from '../objects/Button';

let TOPBARHEIGHT;
// const BLUE = `#5257E1`;
// const RED = `#BB3D4B`;


const socket = io.connect(`http://localhost:8080/`);
let play = false;
socket.on(`start`, message => {
  play = message;
});

let winner, winScore;

export default class Win extends Phaser.State {
  init(newWinner, newWinScore) {
    winner = newWinner;
    winScore = newWinScore;
  }
  create() {
    this.createBackground();

  }
  createBackground() {
    const graphics = this.game.add.graphics(0, 0);
    if (winner === `ROOD`) {
      this.stage.backgroundColor = `BB3D4B`;
    } else {
      this.stage.backgroundColor = `5151E5`;
    }

    const styleWinner = {font: `bold 40px Avenir`, fill: `#99A5A7`, boundsAlignH: `center`, boundsAlignV: `middle`};
    const textSmall  = this.game.add.text(0, 0, `TEAM ${winner} WINT !`, styleWinner);
    textSmall.setTextBounds(0, 0, this.game.width, 140);

    const styleScoreTitle = {font: `bold 40px Avenir`, fill: `white`, boundsAlignH: `center`, boundsAlignV: `middle`};
    const textScoreTitle  = this.game.add.text(0, 0, `met een score van:`, styleScoreTitle);
    textScoreTitle.setTextBounds(0, 0, this.game.width, 700);

    const styleScore = {font: `bold 60px Avenir`, fill: `white`, boundsAlignH: `center`, boundsAlignV: `middle`};
    const textScore  = this.game.add.text(0, 0, winScore, styleScore);
    textScore.setTextBounds(0, 0, this.game.width, 850);

    const styleOpnieuw = {font: `bold 30px Avenir`, fill: `white`, boundsAlignH: `center`, boundsAlignV: `middle`};
    const textOpnieuw  = this.game.add.text(0, 0, `Druk op de knop om opnieuw te spelen`, styleOpnieuw);
    textOpnieuw.setTextBounds(0, 0, this.game.width, 1400);

    TOPBARHEIGHT = this.game.height / 6;
    graphics.beginFill(0xE7E8E8);
    graphics.drawRect(0, 0, this.game.width, TOPBARHEIGHT);

  }
  createButton() {
    const button = new Button(this.game, this.world.centerX, this.world.centerY + 300, this.buttonClicked, this, `blue`, `Start`);
    button.anchor.setTo(0.5, 0.5);
    this.add.existing(button);
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
