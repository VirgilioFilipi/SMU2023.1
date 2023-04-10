import config from "./config.js";
import abertura from "./abertura.js";
import principal from "./principal.js";
import encerramento from "./encerramento.js";

class Game extends Phaser.Game {
  constructor() {
    super(config);
    this.socket = io();
this.socket.on("connect", (socket) => {
  this.socket.emit("registro", socket.id)
})

    this.scene.add("abertura", abertura);
    this.scene.add("principal", principal);
    this.scene.add("encerramento", encerramento);
    this.scene.start("abertura");
  }
}

window.onload = () => {
  window.game = new Game();
};
