// const qrcode = require('qrcode-terminal');
import qrcode from "qrcode-terminal";
import { Client } from "whatsapp-web.js";
// const { Client } = require('whatsapp-web.js');
//  {
//   webVersion: '2.3000.1012058694-alpha',
//   webVersionCache: {
//     type: "remote",
//     remotePath:
//       "https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.3000.1012058694-alpha.html",
//   },
// }
const client = new Client();

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is Ready");
});

// const data = new Date()
// const h = data.getHours();
// // const m = data.getMinutes();
// // const s = data.getSeconds();

// // const r = [h, m, s].join(':')
// var msg = '';
// var text = '';

// if (h >= 0 && h < 6) {
//     msg = 'Boa Madrugada';
// }else if(h > 6 && h < 12){
//     msg = 'Bom dia';
// }else if(h > 12 && h < 18){
//     msg = 'Boa Tarde';
// }else if(h > 18 && h <= 23){
//     msg = 'Boa Noite';
// }
// text =  msg + ", eu sou a Bia, assistente virtual da Bia Cosmético, em que posso ajudar?\n*Escolha uma Opção: *\n 1. Cadastro \n 2. Pedido \n 3. Dúvidas \n 4. Falar com atendente";
let stage = 0;
let pass = 0
client.on("message", (message) => {
    console.log(message);
    const msg = message.body.toLocaleLowerCase();

    if(stage === 0){
      client.sendMessage(message.from, 'Olá! Eu sou o seu bot de atendimento. Como posso ajudá-lo hoje?');
        setTimeout(() => {
          client.sendMessage(message.from,`Selecione uma opção: \n1 - CADASTRO \n2 - PEDIDO
          `);
        }, 1000);
        stage++
        return false;
    }
    if(stage === 1){
      switch(msg){
        case '1':
          pass++;
          if(pass === 1){
            client.sendMessage(message.from, 'Vamos começar seu cadastro!\n*Informe seu Nome Completo:*')
            pass++
          }
          client.on('message', (message) => {
            if(pass == 2){
              const nome = message.body.toLocaleUpperCase();
              const msg = message.body.toLocaleLowerCase();
              message.reply(`Seu nome ${nome}\n*Agora informe seu CPF: *`)
              pass++
            }
            if(pass == 3){
              const cpf = message.body.toLocaleUpperCase();
              const msg = message.body.toLocaleLowerCase();
              message.reply(`Seu CPF: ${cpf}\n`)
              pass++
            }
          })
          break;
        default:
          client.sendMessage(message.from, 'Opção Inválida');
      }
    }
});

client.initialize();
