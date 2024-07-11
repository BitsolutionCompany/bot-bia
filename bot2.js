import Whatsapp from "whatsapp-web.js";
const { Client, LocalAuth} = Whatsapp

const client = new Client({
  authStrategy: new LocalAuth,
  puppeteer: {
      headless: false
  }
});
 
let contacts = {};
 
client.initialize();
 
debug_ev(client, 'qr');
debug_ev(client, 'ready');
debug_ev(client, 'message');
 
client.on('message', message => {
    const {from, body} = message;
 
    if (from !== '558597962523@c.us')
        return;
 
    const contact = (contacts[from] || (contacts[from] = {state: 0}));
 
    switch (contact.state) {
    case 0:
        client.sendMessage(from, 'Bot teste. Escolha uma opção:' +
            '\n1 - Pedido\n2 - Cadastro');
        break;
    case 1:
        if (isNaN(body) || body < 1 || body > 2)
            return client.sendMessage(from, 'Oops, opção inválida');
        contact.choice = +body;
    case 2:
        switch (contact.choice) {
        case 1:
            client.sendMessage(from, 'Você escolheu pedido!');
            break;
        case 2:
            client.sendMessage(from, 'Você escolheu cadastro!');
        }
        if (contact.state === 2)
            return;
    }
 
    contact.state++;
});
 
function debug_ev(o, e) {
    o.on(e, function () {
        console.log('event ' + e, Array.from(arguments));
    });
}