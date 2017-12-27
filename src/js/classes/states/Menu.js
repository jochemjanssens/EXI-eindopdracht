import Button from '../objects/Button';

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
  }
  createBackground() {
    this.stage.backgroundColor = `bd3b49`;
  }
  createButton() {
    const button = new Button(this.game, this.world.centerX, this.world.centerY, this.buttonClicked, this, `blue`, `Start`);
    button.anchor.setTo(0.5, 0.5);
    this.add.existing(button);
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
