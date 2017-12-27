const socket = io.connect(`http://localhost:8080/`);
let down1 = false;
let down2 = false;
let down3 = false;
let down4 = false;
let TOPBARHEIGHT, CENTERFIELD;

let redScore = 0;
let blueScore = 0;

let redScoreText, blueScoreText, chef;

socket.on(`update`, message => {
  if (Object.keys(message)[0] === `one`) {
    if (message.one === true) {
      down1 = true;
      console.log(`1`);
    } else {
      down1 = false;
    }
  }
  if (Object.keys(message)[0] === `two`) {
    if (message.two === true) {
      down2 = true;
      console.log(`2`);
    } else {
      down2 = false;
    }
  }
  if (Object.keys(message)[0] === `three`) {
    if (message.three === true) {
      down3 = true;
      console.log(`3`);
    } else {
      down3 = false;
    }
  }
  if (Object.keys(message)[0] === `four`) {
    if (message.four === true) {
      down4 = true;
      console.log(`4`);
    } else {
      down4 = false;
    }
  }
});


export default class Play extends Phaser.State {
  create() {
    TOPBARHEIGHT = this.game.height / 6;
    CENTERFIELD = this.game.height / 2 + TOPBARHEIGHT / 2;

    this.cursors = this.input.keyboard.createCursorKeys();
    this.createBackground();
    this.createPlayer();
    this.createScore();
  }
  createBackground() {
    this.stage.backgroundColor = `5151E5`;
    const graphics = this.game.add.graphics(0, 0);
    // Linker rood vak
    graphics.beginFill(0xBD3B49);
    graphics.drawRect(0, 0, this.game.width / 2, this.game.height);
    //Boveste grijze balk
    graphics.beginFill(0xE7E8E8);
    graphics.drawRect(0, 0, this.game.width, TOPBARHEIGHT);
    //Linkse score box
    graphics.beginFill(0xD5D6DA);
    graphics.drawRect(0, 0, TOPBARHEIGHT, TOPBARHEIGHT);
    //Rechste score box
    graphics.drawRect(this.game.width - TOPBARHEIGHT, 0, TOPBARHEIGHT, TOPBARHEIGHT);
    //Middellijn
    graphics.beginFill(0xE7E8E8);
    graphics.drawRect((this.game.width / 2) - 2, TOPBARHEIGHT, 4, this.game.height);

    //Horizon lijn
    graphics.drawRect(0, CENTERFIELD, this.game.width, 2);

    //Afstand lijnen
    const lijnHeight = 30;
    const lijnStartY = CENTERFIELD - (lijnHeight / 2);
    const numberOfLines = 12;
    const stepWitdh = this.game.width / numberOfLines;
    for (let i = 0;i < numberOfLines;i ++) {
      graphics.drawRect(stepWitdh * i + (stepWitdh / 2), lijnStartY, 2, lijnHeight);
    }

    //Middentekst
    const style = {font: `bold 30px Avenir`, fill: `#99A5A7`, boundsAlignH: `center`, boundsAlignV: `middle`};
    const text  = this.game.add.text(0, 0, `HELP DE CHEF NAAR JOUW KANT`, style);
    text.setTextBounds(0, 0, this.game.width, TOPBARHEIGHT);
  }

  createPlayer() {
    chef = this.game.add.sprite(this.game.width / 2 - 110, CENTERFIELD - 150, `player`);
    this.game.physics.enable(chef, Phaser.Physics.ARCADE);

  }

  createScore() {
    const style = {font: `bold 50px Avenir`, fill: `#E34C71`, boundsAlignH: `center`, boundsAlignV: `middle`};

    redScoreText  = this.game.add.text(0, 0, `${redScore}`, style);
    redScoreText.setTextBounds(0, 0, TOPBARHEIGHT, TOPBARHEIGHT);

    blueScoreText  = this.game.add.text(this.game.width - TOPBARHEIGHT, 0, `${blueScore}`, style);
    blueScoreText.setTextBounds(0, 0, TOPBARHEIGHT, TOPBARHEIGHT);
  }
  update() {
    this.inputHandler();
  }

  inputHandler() {
    chef.body.velocity.x = 0;
    if (down1 === true) {
      down1 = false;
      this.updateScore(`red`, 2);
      chef.body.velocity.x = 2000;
    }
    if (down2 === true) {
      down2 = false;
      this.updateScore(`red`, 3);
      chef.body.velocity.x = 3000;
    }
    if (down3 === true) {
      down3 = false;
      this.updateScore(`red`, 4);
      chef.body.velocity.x = 4000;
    }
    if (down4 === true) {
      down4 = false;
      this.updateScore(`red`, 1);
      chef.body.velocity.x = 1000;
    }
  }

  updateScore(team, points) {
    if (team === `red`) {
      redScore += points;
      redScoreText.setText(redScore);
    }
    if (team === `blue`) {
      blueScore += points;
      blueScore.setText(redScore);
    }
  }
}
