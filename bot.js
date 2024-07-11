import Whatsapp from "whatsapp-web.js";
import qrcode from "qrcode-terminal";

const { Client, LocalAuth} = Whatsapp

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
      headless: false
  }
});

let contacts = {};

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is Ready");
});

client.on('message', message => {
  const {from, body} = message
  
  if (from !== '558894086642@c.us')
    return;

  const contact = (contacts[from] || (contacts[from] = {state: 0}));
  console.log(from)
  console.log(body)
  console.log(contact)
  console.log(contact.choice)
  console.log(contact.cad)

  switch(contact.state){
    case 0:
      client.sendMessage(from, 'Bot teste. Escolha uma opção:' +
        '\n1 - Pedido\n2 - Cadastro')
      break
      case 1:
        if (isNaN(body) || body < 1 || body > 2)
            return client.sendMessage(from, 'Oops, opção inválida');
        contact.choice = +body;
      case 2:
        switch(contact.choice){
          case 1:
            client.sendMessage(from, 'Você escolheu pedido!');
            break
          case 2:
            // contact.cad = 1
            switch(contact.cad){
              case 1:
                client.sendMessage(from, 'Vamos Iniciar seu cadastro.\n*Informe seu nome completo:*');
              case 2:
                const nome = body
                return message.reply(`Bem vindo(a) ${nome}.\n*Agora informe seu CPF:*`)
        }
      }
  }
  contact.state++
})

client.initialize();