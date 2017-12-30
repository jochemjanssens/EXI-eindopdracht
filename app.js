/* eslint-disable */
const Hapi = require('hapi');
const server = new Hapi.Server();

server.connection({
  port: process.env.PORT || 8080,
  host: `0.0.0.0`
});
const io = require('socket.io')(server.listener);

server.start(err => {
  if (err) throw err;
});

const inert = require(`inert`);
server.register(inert, err => {
  if (err) {
    throw err;
  }
  server.route({
    method: `GET`,
    path: `/{param*}`,
    handler: {
      directory: {
        path: `./public`,
        redirectToSlash: true,
        index: true
      }
    }
  })
});

const five = require(`johnny-five`);

const SCOREMARGIN = 10;

new five.Boards([ "A", "B" ]).on("ready", function() {

  // Both "A" and "B" are initialized
  // (connected and available for communication)

  // |this| is an array-like object containing references
  // to each initialized board.
  this.each(function(board) {

    const photoresistor1 = new five.Sensor({
      pin: `A0`,
      board: board,
      freq: 1
    });
    const photoresistor2 = new five.Sensor({
      pin: `A1`,
      board: board,
      freq: 1
    });
    const photoresistor3 = new five.Sensor({
      pin: `A2`,
      board: board,
      freq: 1
    });
    const photoresistor4 = new five.Sensor({
      pin: `A3`,
      board: board,
      freq: 1
    });

    const laser = new five.Led({
      pin: 11,
      board: board
    });
    const laser2 = new five.Led({
      pin: 10,
      board: board
    });
    let laserOn = false;

    let raak1 = false;
    let base1 = false;
    photoresistor1.on(`data`, function() {
      if(base1 === false && this.value > 1){
        base1 = this.value;
        console.log(`${board.id} 1: ${base1}`);
      }
      if (this.value > base1-SCOREMARGIN && raak1 === false && laserOn === true) {
        console.log(`${board.id} raak1`);
        io.sockets.emit(`update${board.id}`, {"one": true});
        raak1 = true;
      } else if(this.value < base1-SCOREMARGIN && raak1 === true)  {
        io.sockets.emit(`update${board.id}`, {"one": false});

        raak1 = false;
      }
    });

    let raak2 = false;
    let base2 = false;
    photoresistor2.on(`data`, function() {
      if(base2 === false && this.value > 1){
        base2 = this.value;
        console.log(`${board.id} 2: ${base2}`);
        checkLaser();
      }
      if (this.value > base2-SCOREMARGIN && raak2 === false && laserOn === true) {
        console.log(`${board.id} raak2`);
        io.sockets.emit(`update${board.id}`, {"two": true});
        raak2 = true;
      } else if(this.value < base2-SCOREMARGIN && raak2 === true)  {
        io.sockets.emit(`update${board.id}`, {"two": false});

        raak2 = false;
      }
    });
    let raak3 = false;
    let base3 = false;
    photoresistor3.on(`data`, function() {
      if(base3 === false && this.value > 1){
        base3 = this.value;
        console.log(`${board.id} 3: ${base3}`);
        checkLaser();
      }
      if (this.value > base3-SCOREMARGIN && raak3 === false && laserOn === true) {
        console.log(`${board.id} raak3`);
        io.sockets.emit(`update${board.id}`, {"three": true});
        raak3 = true;
      } else if(this.value < base3-SCOREMARGIN && raak3 === true)  {
        io.sockets.emit(`update${board.id}`, {"three": false});

        raak3 = false;
      }
    });
    let raak4 = false;
    let base4 = false;
    photoresistor4.on(`data`, function() {
      if(base4 === false && this.value > 1){
        base4 = this.value;
        console.log(`${board.id} 4: ${base4}`);
        checkLaser();
      }
      if (this.value > base4-SCOREMARGIN && raak4 === false && laserOn === true) {
        console.log(`${board.id} raak4`);
        io.sockets.emit(`update${board.id}`, {"four": true});
        raak4 = true;
      } else if(this.value < base4-SCOREMARGIN && raak4 === true)  {
        io.sockets.emit(`update${board.id}`, {"four": false});

        raak4 = false;
      }
    });

    const checkLaser = () => {
      if(base1 !== false && base2 !== false && base3 !== false && base4 !== false){
        console.log(`${board.id} laseractive`);
        laser.on();
        laser2.on();
        laserOn = true;
      }
    }
  });
});

/*board.on(`ready`, function() {
  const photoresistor1 = new five.Sensor({
    pin: `A0`,
    freq: 1
  });
  const photoresistor2 = new five.Sensor({
    pin: `A1`,
    freq: 1
  });
  const photoresistor3 = new five.Sensor({
    pin: `A2`,
    freq: 1
  });
  const photoresistor4 = new five.Sensor({
    pin: `A3`,
    freq: 1
  });

  const laser = new five.Led(11);
  let laserOn = false;

  let raak1 = false;
  let base1 = false;
  photoresistor1.on(`data`, function() {
    if(base1 === false && this.value > 1){
      base1 = this.value;
      console.log('1: ' + base1);
    }
    if (this.value > base1-100 && raak1 === false && laserOn === true) {
      console.log(`raak1`);
      io.sockets.emit(`update`, {"one": true});
      raak1 = true;
    } else if(this.value < base1-100 && raak1 === true)  {
      io.sockets.emit(`update`, {"one": false});

      raak1 = false;
    }
  });

  let raak2 = false;
  let base2 = false;
  photoresistor2.on(`data`, function() {
    if(base2 === false && this.value > 1){
      base2 = this.value;
      console.log('2: ' + base2);
      checkLaser();
    }
    if (this.value > base2-100 && raak2 === false && laserOn === true) {
      console.log(`raak2`);
      io.sockets.emit(`update`, {"two": true});
      raak2 = true;
    } else if(this.value < base2-100 && raak2 === true)  {
      io.sockets.emit(`update`, {"two": false});

      raak2 = false;
    }
  });
  let raak3 = false;
  let base3 = false;
  photoresistor3.on(`data`, function() {
    if(base3 === false && this.value > 1){
      base3 = this.value;
      console.log('3: ' + base3);
      checkLaser();
    }
    if (this.value > base3-100 && raak3 === false && laserOn === true) {
      console.log(`raak3`);
      io.sockets.emit(`update`, {"three": true});
      raak3 = true;
    } else if(this.value < base3-100 && raak3 === true)  {
      io.sockets.emit(`update`, {"three": false});

      raak3 = false;
    }
  });
  let raak4 = false;
  let base4 = false;
  photoresistor4.on(`data`, function() {
    if(base4 === false && this.value > 1){
      base4 = this.value;
      console.log('4: ' +  base4);
      checkLaser();
    }
    if (this.value > base4-100 && raak4 === false && laserOn === true) {
      console.log(`raak4`);
      io.sockets.emit(`update`, {"four": true});
      raak4 = true;
    } else if(this.value < base4-100 && raak4 === true)  {
      io.sockets.emit(`update`, {"four": false});

      raak4 = false;
    }
  });

  const checkLaser = () => {
    if(base1 !== false && base2 !== false && base3 !== false && base4 !== false){
      console.log('laseracitve');
      laser.on();
      laserOn = true;
    }
  }
});*/
