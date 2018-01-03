const socket = io.connect(`http://localhost:8080/`);
let down1 = false;
let down2 = false;
let down3 = false;
let down4 = false;
let down5 = false;
let down6 = false;
let down7 = false;
let down8 = false;

let TOPBARHEIGHT, CENTERFIELD;
const FOODSPEED = 200;
const CHEFSTEP = 200;

let redScore = 0;
let blueScore = 0;

let redScoreText, blueScoreText;

socket.on(`updateA`, message => {
  if (Object.keys(message)[0] === `one`) {
    if (message.one === true) {
      down1 = true;
      console.log(`red 1`);
    } else {
      down1 = false;
    }
  }
  if (Object.keys(message)[0] === `two`) {
    if (message.two === true) {
      down2 = true;
      console.log(`red 2`);
    } else {
      down2 = false;
    }
  }
  if (Object.keys(message)[0] === `three`) {
    if (message.three === true) {
      down3 = true;
      console.log(`red 3`);
    } else {
      down3 = false;
    }
  }
  if (Object.keys(message)[0] === `four`) {
    if (message.four === true) {
      down4 = true;
      console.log(`red 4`);
    } else {
      down4 = false;
    }
  }
});

socket.on(`updateB`, message => {
  if (Object.keys(message)[0] === `one`) {
    if (message.one === true) {
      down5 = true;
      console.log(`blue 1`);
    } else {
      down5 = false;
    }
  }
  if (Object.keys(message)[0] === `two`) {
    if (message.two === true) {
      down6 = true;
      console.log(`blue 2`);
    } else {
      down6 = false;
    }
  }
  if (Object.keys(message)[0] === `three`) {
    if (message.three === true) {
      down7 = true;
      console.log(`blue 3`);
    } else {
      down7 = false;
    }
  }
  if (Object.keys(message)[0] === `four`) {
    if (message.four === true) {
      down8 = true;
      console.log(`blue 4`);
    } else {
      down8 = false;
    }
  }
});


export default class Play extends Phaser.State {
  create() {
    //Bereken enkele variabelen
    TOPBARHEIGHT = this.game.height / 6;
    CENTERFIELD = this.game.height / 2 + TOPBARHEIGHT / 2;

    this.cursors = this.input.keyboard.createCursorKeys();

    this.createBackground();
    this.createPlayer();
    this.createScore();
    this.createFood();
    this.createRedTeam();
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

    //finish
    this.finish = this.game.add.sprite(0, TOPBARHEIGHT, `finish`);
    this.finish = this.game.add.sprite(this.game.width - 45, TOPBARHEIGHT, `finish`);

  }

  createRedTeam() {
    this.guy1 = this.add.sprite(- 20, 150, `guy1`);
    this.guy1.animations.add(`walk`, Phaser.Animation.generateFrameNames(``, 1, 13, `.png`), 10, true, false);
    this.guy1.animations.play(`walk`);

    this.guy2 = this.add.sprite(- 20, 300, `guy1`);
    this.guy2.animations.add(`walk`, Phaser.Animation.generateFrameNames(``, 1, 13, `.png`), 11, true, false);
    this.guy2.animations.play(`walk`);

    this.guy3 = this.add.sprite(- 20, 500, `guy1`);
    this.guy3.animations.add(`walk`, Phaser.Animation.generateFrameNames(``, 1, 13, `.png`), 12, true, false);
    this.guy3.animations.play(`walk`);

    this.guy4 = this.add.sprite(- 20, 650, `guy1`);
    this.guy4.animations.add(`walk`, Phaser.Animation.generateFrameNames(``, 1, 13, `.png`), 13, true, false);
    this.guy4.animations.play(`walk`);
  }

  createPlayer() {
    //this.chef = this.game.add.sprite(this.game.width / 2 - 30, CENTERFIELD - 40, `player`);
    this.chef = this.game.add.sprite(0, CENTERFIELD - 40, `player`);
    this.game.physics.enable(this.chef, Phaser.Physics.ARCADE);
    this.chef.anchor.x = 0.5;
    this.chef.anchor.y = 0.5;
  }

  createScore() {
    const style = {font: `bold 50px Avenir`, fill: `#E34C71`, boundsAlignH: `center`, boundsAlignV: `middle`};

    redScoreText  = this.game.add.text(0, 0, `${redScore}`, style);
    redScoreText.setTextBounds(0, 0, TOPBARHEIGHT, TOPBARHEIGHT);

    blueScoreText  = this.game.add.text(this.game.width - TOPBARHEIGHT, 0, `${blueScore}`, style);
    blueScoreText.setTextBounds(0, 0, TOPBARHEIGHT, TOPBARHEIGHT);
  }

  createFood() {
    this.apples = this.add.group();
    this.apples.enableBody = true;
    this.apples.createMultiple(4, `apple`);
    this.apples.setAll(`anchor.x`, 0.5);
    this.apples.setAll(`anchor.y`, 0.5);

    this.bananas = this.add.group();
    this.bananas.enableBody = true;
    this.bananas.createMultiple(4, `banana`);
    this.bananas.setAll(`anchor.x`, 0.5);
    this.bananas.setAll(`anchor.y`, 0.5);

    this.pears = this.add.group();
    this.pears.enableBody = true;
    this.pears.createMultiple(4, `pear`);
    this.pears.setAll(`anchor.x`, 0.5);
    this.pears.setAll(`anchor.y`, 0.5);

    this.cherries = this.add.group();
    this.cherries.enableBody = true;
    this.cherries.createMultiple(4, `cherry`);
    this.cherries.setAll(`anchor.x`, 0.5);
    this.cherries.setAll(`anchor.y`, 0.5);
  }

  update() {
    this.chef.body.velocity.x -= this.chef.body.velocity.x / 10;
    this.physics.arcade.overlap(this.chef, this.apples, this.foodHit, null, this);
    this.physics.arcade.overlap(this.chef, this.bananas, this.foodHit, null, this);
    this.physics.arcade.overlap(this.chef, this.pears, this.foodHit, null, this);
    this.physics.arcade.overlap(this.chef, this.cherries, this.foodHit, null, this);

    this.inputHandler();

    if (this.chef.position.x <= 45) {
      this.state.start(`Win`, true, false, `ROOD`, redScore);
    } else if (this.chef.position.x >= this.game.width - 45) {
      this.state.start(`Win`, true, false, `BLAUW`, blueScore);
    }
  }

  inputHandler() {
    if (down1 === true) {
      down1 = false;
      this.throwFood(`red`, 2);
    }
    if (down2 === true) {
      down2 = false;
      this.throwFood(`red`, 3);
    }
    if (down3 === true) {
      down3 = false;
      this.throwFood(`red`, 4);
    }
    if (down4 === true) {
      down4 = false;
      this.throwFood(`red`, 1);
    }
    if (down5 === true) {
      down5 = false;
      this.throwFood(`blue`, 2);
    }
    if (down6 === true) {
      down6 = false;
      this.throwFood(`blue`, 3);
    }
    if (down7 === true) {
      down7 = false;
      this.throwFood(`blue`, 4);
    }
    if (down8 === true) {
      down8 = false;
      this.throwFood(`blue`, 1);
    }
  }

  throwFood(team, points) {
    console.log(team, points);
    const position = Math.round(Math.random() * 4);
    const step = (this.game.height - TOPBARHEIGHT) / 4;
    const yPos = TOPBARHEIGHT + (step * position) + (step / 2);
    let fooditem;
    console.log(points);
    if (points === 1) {
      fooditem = this.apples.getFirstDead(false);
    } else if (points === 2) {
      fooditem = this.bananas.getFirstDead(false);
    } else if (points === 3) {
      fooditem = this.pears.getFirstDead(false);
    } else if (points === 4) {
      fooditem = this.cherries.getFirstDead(false);
    }
    if (!fooditem) {
      return;
    }
    if (team === `red`) {
      fooditem.reset(0, yPos);
      fooditem.body.velocity.x = FOODSPEED;
      fooditem.body.velocity.y = this.calculateFoodPath(0, yPos);
    } else if (team === `blue`) {
      fooditem.reset(this.game.width, yPos);
      fooditem.body.velocity.x = - FOODSPEED;
      fooditem.body.velocity.y = this.calculateFoodPath(this.game.width, yPos);
    }
    fooditem.data = {
      team, points
    };
  }

  calculateFoodPath(xPos, yPos) {
    const xDistance = Math.abs(xPos - this.chef.body.x);
    const yDistance = CENTERFIELD - yPos;
    const yChange = (yDistance / xDistance) * FOODSPEED;
    return yChange;
  }

  updateScore(team, points) {
    if (team === `red`) {
      redScore += points;
      redScoreText.setText(redScore);
    }
    if (team === `blue`) {
      blueScore += points;
      blueScoreText.setText(blueScore);
    }
  }

  foodHit(player, fooditem) {
    this.updateScore(fooditem.data.team, fooditem.data.points);

    //Beweeg de chef
    if (fooditem.data.team === `red`) {
      this.chef.body.velocity.x = - (fooditem.data.points * CHEFSTEP);
      this.chef.scale.setTo(- 1, 1);
    } else if (fooditem.data.team === `blue`) {
      this.chef.body.velocity.x = fooditem.data.points * CHEFSTEP;
      this.chef.scale.setTo(1, 1);
    }

    fooditem.kill();
  }
}
