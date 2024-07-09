// import { VenomBot } from './venom.js'
import { stages, getStage } from './stages.js'
import Whatsapp from 'whatsapp-web.js'
const { Client, LocalAuth } = Whatsapp
import qrcode from "qrcode-terminal";

const main = async () => {
    try{
        const client = new Client({
            authStrategy: new LocalAuth()
        });

        client.on("qr", (qr) => {
            qrcode.generate(qr, { small: true });
        });
        client.on("ready", () => {
            console.log("Client is Ready");
        });

        client.on("message", async(message) => {
            console.log(message);
            if (message.isGroupMsg) return

            const currentStage = getStage({ from: message.from })
            console.log(currentStage);
            console.log({from: message.from});
            console.log(stages[currentStage]);
            console.log(stages[currentStage].stage);

            await stages[currentStage].stage.exec({
                from: message.from,
                message: message.body,
            })
        })
        
        client.initialize();
}catch (error) {
    console.error(error)
  }
}

main()