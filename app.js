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
  const photoresistor = new five.Sensor({
    pin: `A0`,
    freq: 1000
  });
  const led = new five.Led(11);

  let raak1 = false;
  photoresistor.on(`data`, function() {
    console.log(this.value);
    if (this.value > 500 && raak1 === false) {
      console.log(`raak1`);
      io.sockets.emit(`update`, `true`);
      led.fadeIn();
      raak1 = true;
    } else if(this.value < 500 && raak1 === true)  {
      io.sockets.emit(`update`, `false`);
      led.fadeOut();
      raak1 = false;
    }
  });
});
