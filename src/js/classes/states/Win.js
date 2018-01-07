let TOPBARHEIGHT;
const BLUE = `5257E1`;
const RED = `BB3D4B`;

let winner, winScore;

let restart = false;

let timer = 5;

export default class Win extends Phaser.State {
  init(newWinner, newWinScore) {
    winner = newWinner;
    winScore = newWinScore;
  }
  create() {
    timer = 5;
    this.createBackground();
    this.createCountdown();
  }
  createBackground() {
    const graphics = this.game.add.graphics(0, 0);
    if (winner === `ROOD`) {
      this.stage.backgroundColor = RED;
    } else {
      this.stage.backgroundColor = BLUE;
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

    TOPBARHEIGHT = this.game.height / 6;
    graphics.beginFill(0xE7E8E8);
    graphics.drawRect(0, 0, this.game.width, TOPBARHEIGHT);

  }
  createCountdown() {
    const styleOpnieuw = {font: `bold 30px Avenir`, fill: `white`, boundsAlignH: `center`, boundsAlignV: `middle`};
    const textOpnieuw  = this.game.add.text(0, 0, `Nieuw spel start binnen 5 seconden`, styleOpnieuw);
    textOpnieuw.setTextBounds(0, 0, this.game.width, 1400);
    const countdown = setInterval(
      function() {
        timer --;
        textOpnieuw.setText(`Nieuw spel start binnen ${timer} seconden`);
        if (timer === 0) {
          restart = true;
          clearInterval(countdown);
        }
      }, 1000);
  }
  update() {
    if (restart === true) {
      restart = false;
      this.state.start(`Menu`);
    }
  }
}
