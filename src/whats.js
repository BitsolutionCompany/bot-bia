import { Client } from "whatsapp-web.js";
const client = new Client()
export function WebWhats({from, message}) {
   return client.sendMessage(from, message)
}
