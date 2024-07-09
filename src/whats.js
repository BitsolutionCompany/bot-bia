import { Client } from "whatsapp-web.js";
const client = new Client()
export class WebWhats {
    
    static async send({to, message}){
            client.on('message', async(msg) =>{
                client.sendMessage(msg.from, 'message')
            })

            client.initialize();
    }
}
