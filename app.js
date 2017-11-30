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

const board = new five.Board();

board.on(`ready`, function() {
  const photoresistor1 = new five.Sensor({
    pin: `A0`,
    freq: 10
  });
  const photoresistor2 = new five.Sensor({
    pin: `A5`,
    freq: 10
  });
  const photoresistor3 = new five.Sensor({
    pin: `A2`,
    freq: 10
  });
  const photoresistor4 = new five.Sensor({
    pin: `A4`,
    freq: 10
  });
  const laser1 = new five.Led(9);

  laser1.on();


  let raak1 = false;
  photoresistor1.on(`data`, function() {
    console.log("1: " + this.value);
    if (this.value > 900 && raak1 === false) {
      console.log(`raak1`);
      io.sockets.emit(`update`, {"one": true});
      raak1 = true;
    } else if(this.value < 900 && raak1 === true)  {
      io.sockets.emit(`update`, {"one": false});

      raak1 = false;
    }
  });

  let raak2 = false;
  photoresistor2.on(`data`, function() {

      console.log("2: " + this.value);
    if (this.value > 900 && raak2 === false) {
      console.log(`raak2`);
      io.sockets.emit(`update`, {"one": true});
      raak2 = true;
    } else if(this.value < 900 && raak2 === true)  {
      io.sockets.emit(`update`, {"one": false});

      raak2 = false;
    }
  });
  let raak3 = false;
  photoresistor3.on(`data`, function() {

      console.log("3: " + this.value);
    if (this.value > 900 && raak3 === false) {
      console.log(`raak3`);
      io.sockets.emit(`update`, {"one": true});
      raak3 = true;
    } else if(this.value < 900 && raak3 === true)  {
      io.sockets.emit(`update`, {"one": false});

      raak3 = false;
    }
  });
  let raak4 = false;
  photoresistor4.on(`data`, function() {

      console.log("4: " + this.value);
    if (this.value > 900 && raak4 === false) {
      console.log(`raak4`);
      io.sockets.emit(`update`, {"one": true});
      raak4 = true;
    } else if(this.value < 900 && raak4 === true)  {
      io.sockets.emit(`update`, {"one": false});

      raak4 = false;
    }
  });
});
