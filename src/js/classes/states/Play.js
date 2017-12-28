const socket = io.connect(`http://localhost:8080/`);
let down1 = false;
let down2 = false;
let down3 = false;
let down4 = false;
let TOPBARHEIGHT, CENTERFIELD;

let redScore = 0;
let blueScore = 0;

let redScoreText, blueScoreText;

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
    //Bereken enkele variabelen
    TOPBARHEIGHT = this.game.height / 6;
    CENTERFIELD = this.game.height / 2 + TOPBARHEIGHT / 2;

    this.cursors = this.input.keyboard.createCursorKeys();

    this.createBackground();
    this.createPlayer();
    this.createScore();
    this.createFood();
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
    this.chef = this.game.add.sprite(this.game.width / 2 - 110, CENTERFIELD - 150, `player`);
    this.game.physics.enable(this.chef, Phaser.Physics.ARCADE);
  }

  createScore() {
    const style = {font: `bold 50px Avenir`, fill: `#E34C71`, boundsAlignH: `center`, boundsAlignV: `middle`};

    redScoreText  = this.game.add.text(0, 0, `${redScore}`, style);
    redScoreText.setTextBounds(0, 0, TOPBARHEIGHT, TOPBARHEIGHT);

    blueScoreText  = this.game.add.text(this.game.width - TOPBARHEIGHT, 0, `${blueScore}`, style);
    blueScoreText.setTextBounds(0, 0, TOPBARHEIGHT, TOPBARHEIGHT);
  }

  createFood() {
    this.food = this.add.group();
    this.food.enableBody = true;
    this.food.createMultiple(4, `apple`);
    this.food.setAll(`anchor.x`, 0.5);
    this.food.setAll(`anchor.y`, 0.5);
  }

  update() {
    this.chef.body.velocity.x = 0;
    this.physics.arcade.overlap(this.chef, this.food, this.foodHit, null, this);
    this.inputHandler();
  }

  inputHandler() {
    if (down1 === true) {
      down1 = false;
      this.handleScore(`red`, 2);
    }
    if (down2 === true) {
      down2 = false;
      this.handleScore(`red`, 3);
    }
    if (down3 === true) {
      down3 = false;
      this.handleScore(`red`, 4);
    }
    if (down4 === true) {
      down4 = false;
      this.handleScore(`red`, 1);
    }
  }

  handleScore(team, points) {
    this.throwFood(team, points);
  }

  throwFood(team, points) {
    const position = Math.round(Math.random() * 4);
    const step = (this.game.height - TOPBARHEIGHT) / 4;
    const yPos = TOPBARHEIGHT + (step * position) + (step / 2);
    const fooditem = this.food.getFirstDead(false);
    if (!fooditem) {
      return;
    }
    if (team === `red`) {
      fooditem.reset(0, yPos);
      fooditem.body.velocity.x = 100;
      fooditem.body.velocity.y = this.calculateFoodPath(0, yPos);
    } else if (team === `blue`) {
      fooditem.reset(this.game.width, yPos);
      fooditem.body.velocity.x = - 100;
      fooditem.body.velocity.y = this.calculateFoodPath(this.game.width, yPos);
    }
    fooditem.data = {
      team, points
    };
  }

  calculateFoodPath(xPos, yPos) {
    const xDistance = this.chef.body.x;
    const yDistance = CENTERFIELD - yPos;
    const yChange = (yDistance / xDistance) * 100;
    return yChange;
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

  foodHit(player, fooditem) {
    this.updateScore(fooditem.data.team, fooditem.data.points);

    //Beweeg de chef
    if (fooditem.data.team === `red`) {
      this.chef.body.velocity.x = - (fooditem.data.points * 1000);
    } else if (fooditem.data.team === `blue`) {
      this.chef.body.velocity.x = fooditem.data.points * 1000;
    }

    fooditem.kill();
  }
}
