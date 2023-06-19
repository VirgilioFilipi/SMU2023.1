import config from "./config.js";
//import abertura from "./abertura.js";
//import principal from "./principal.js";
//import encerramento from "./encerramento.js";

import registro from "./registro.js";
import presenca from "./presença.js";

class Game extends Phaser.Game {
  constructor() {
    super(config);

    this.socket = io();  //escolha de caminho

    this.socket.on("connect", () => {
      this.socket.emit("registro", this.socket.id);
    });

    this.socket.on("registro_aceito", () => {
      this.registro = true;
    });

    this.socket.on("registro_negado", () => {
      this.registro = false;
    });

    this.ice_servers = {
      iceServers: [
        {
          urls: "stun:stun.l.google.com:19302",
        },
      ],
    };
    this.audio = document.querySelector("audio");
    this.midias = undefined;

    /* Cenas */
    //this.scene.add("abertura", abertura);
    //this.scene.add("principal", principal);
   //this.scene.add("encerramento", encerramento);
    //this.scene.start("abertura");

    this.scene.add("registro", registro);
    this.scene.add("presença", presenca);
    this.scene.start("registro");
  }
}

window.onload = () => {
  window.game = new Game();
};
