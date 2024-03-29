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



/*socket.on(`updateA`, message => {
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
});*/


export default class Play extends Phaser.State {
  create() {
    //Bereken enkele variabelen
    TOPBARHEIGHT = this.game.height / 6;
    CENTERFIELD = this.game.height / 2 + TOPBARHEIGHT / 2;

    redScore = 0;
    blueScore = 0;

    this.cursors = this.input.keyboard.createCursorKeys();

    this.createBackground();
    this.createPlayer();
    this.createScore();
    this.createFood();
    this.createRedTeam();
    this.createBlueTeam();


    console.log(`play`);
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

    //this.bgEffect = this.game.add.sprite(30,  TOPBARHEIGHT, `bg-effect`);

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
    const dataTeamRed = [
      [1, 150, 10],
      [2, 300, 11],
      [3, 500, 12],
      [4, 650, 13]
    ];

    for (let i = 0;i < dataTeamRed.length;i ++) {
      const guy = this.add.sprite(- 20, dataTeamRed[i][1], `guy${dataTeamRed[i][0]}`);
      guy.animations.add(`walk`, Phaser.Animation.generateFrameNames(``, 1, 13, `.png`), dataTeamRed[i][2], true, false);
      guy.animations.play(`walk`);
    }
  }

  createBlueTeam() {
    const dataTeamBlue = [
      [1, 150, 10],
      [2, 300, 11],
      [3, 500, 12],
      [4, 650, 13]
    ];

    for (let i = 0;i < dataTeamBlue.length;i ++) {
      const guy = this.add.sprite(this.game.width - 90, dataTeamBlue[i][1], `blue${dataTeamBlue[i][0]}`);
      guy.animations.add(`walk`, Phaser.Animation.generateFrameNames(``, 1, 13, `.png`), dataTeamBlue[i][2], true, false);
      guy.animations.play(`walk`);
    }

    // this.blue = this.add.sprite(this.game.width / 3, 150, `blue1`);
    // this.blue.animations.add(`walk`, Phaser.Animation.generateFrameNames(``, 1, 15, `.png`), 15, true, false);
    // this.blue.animations.play(`walk`);
    // console.log(this.blue);
  }

  createPlayer() {
    //this.chef = this.game.add.sprite(this.game.width / 2 - 30, CENTERFIELD - 40, `player`);
    this.chef = this.game.add.sprite(this.game.width / 2 - 30, CENTERFIELD - 40, `player`);
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
    this.ijsElements = this.add.group();
    this.ijsElements.enableBody = true;
    this.ijsElements.createMultiple(4, `ijs`);
    this.ijsElements.setAll(`anchor.x`, 0.5);
    this.ijsElements.setAll(`anchor.y`, 0.5);

    this.hotdogElements = this.add.group();
    this.hotdogElements.enableBody = true;
    this.hotdogElements.createMultiple(4, `hotdog`);
    this.hotdogElements.setAll(`anchor.x`, 0.5);
    this.hotdogElements.setAll(`anchor.y`, 0.5);

    this.donutElements = this.add.group();
    this.donutElements.enableBody = true;
    this.donutElements.createMultiple(4, `donut`);
    this.donutElements.setAll(`anchor.x`, 0.5);
    this.donutElements.setAll(`anchor.y`, 0.5);

    this.burgerElements = this.add.group();
    this.burgerElements.enableBody = true;
    this.burgerElements.createMultiple(4, `burger`);
    this.burgerElements.setAll(`anchor.x`, 0.5);
    this.burgerElements.setAll(`anchor.y`, 0.5);
  }

  /*socket.on(`updateA`, message => {
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
  });*/


  update() {
    const value = document.querySelector(`.start`).innerHTML;

    if (value === `Atrue1`) {
      down1 = true;

      console.log(`red 1`);
    } else {
      down1 = false;
    }

    if (value === `Atrue2`) {
      down2 = true;

      console.log(`red 1`);
    } else {
      down2 = false;
    }

    if (value === `Atrue3`) {
      down3 = true;

      console.log(`red 1`);
    } else {
      down3 = false;
    }

    if (value === `Atrue4`) {
      down4 = true;

      console.log(`red 1`);
    } else {
      down4 = false;
    }
    if (value === `Btrue1`) {
      down5 = true;

      console.log(`blue 1`);
    } else {
      down5 = false;
    }

    if (value === `Btrue2`) {
      down6 = true;

      console.log(`blue 2`);
    } else {
      down6 = false;
    }

    if (value === `Btrue3`) {
      down7 = true;

      console.log(`blue 3`);
    } else {
      down7 = false;
    }

    if (value === `Btrue4`) {
      down8 = true;

      console.log(`blue 4`);
    } else {
      down8 = false;
    }
    document.querySelector(`.start`).innerHTML = false;

    this.chef.body.velocity.x -= this.chef.body.velocity.x / 10;
    this.physics.arcade.overlap(this.chef, this.ijsElements, this.foodHit, null, this);
    this.physics.arcade.overlap(this.chef, this.hotdogElements, this.foodHit, null, this);
    this.physics.arcade.overlap(this.chef, this.donutElements, this.foodHit, null, this);
    this.physics.arcade.overlap(this.chef, this.burgerElements, this.foodHit, null, this);

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
    const position = Math.round(Math.random() * 3);
    const step = (this.game.height - TOPBARHEIGHT) / 4;
    const yPos = TOPBARHEIGHT + (step * position) + (step / 2);
    let fooditem;
    if (points === 1) {
      fooditem = this.ijsElements.getFirstDead(false);
    } else if (points === 2) {
      fooditem = this.hotdogElements.getFirstDead(false);
    } else if (points === 3) {
      fooditem = this.donutElements.getFirstDead(false);
    } else if (points === 4) {
      fooditem = this.burgerElements.getFirstDead(false);
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
