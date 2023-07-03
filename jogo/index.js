import config from "./config.js";
//import abertura from "./abertura.js";
//import principal from "./principal.js";
//import encerramento from "./encerramento.js";

import registro from "./registro.js";
import presenca from "./presença.js";

class Game extends Phaser.Game {
  constructor() {
    super(config);


     /* URL e lista de STUN/TURN/ICE por provedor */
     let iceServers
     if (window.location.host === 'ifsc.digital') {
       /* Sinalização, escolha de caminho e mídia */
       this.socket = io.connect({ path: '/SMU2023.1/socket.io/' })
 
       iceServers = [
         {
           urls: 'stun:ifsc.digital'
         },
         {
           urls: 'turns:ifsc.digital',
           username: 'adcipt',
           credential: 'adcipt20231'
         },
         {
           urls: 'stun:stun.l.google.com:19302'
         }
       ]
     } else {
       
      /* Sinalização, escolha de caminho e mídia */
       this.socket = io()
 
       iceServers = [
         {
           urls: 'stun:stun.l.google.com:19302'
         }
       ]
     }
     this.ice_servers = { iceServers }
     this.audio = document.querySelector('audio')
     this.midias = undefined
 
     this.socket.on('connect', () => {
       this.socket.emit('registro', this.socket.id)
     })
 
     this.socket.on('registro_aceito', () => {
       this.registro = true
     })
 
     this.socket.on('registro_negado', () => {
       this.registro = false
     })
 
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
   window.game = new Game()
 };


