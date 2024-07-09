import { storage } from "../storages.js";
import { Client } from "whatsapp-web.js";
import { STAGES } from "./index.js";
import { WebWhats } from "../whats.js";

export const initialStage = {
    async exec({ from }){
        storage[from].stage = STAGES.MENU

        const client = new Client();

        // client.on("qr", (qr) => {
        // qrcode.generate(qr, { small: true });
        // });

        // client.on("ready", () => {
        // console.log("Client is Ready");
        // });
        const msg = `
        👋 Olá, como vai?
        Eu sou a Bia, a *assistente virtual* da Bia Cosmetico.\n
        Como posso te ajudar?* 🙋‍♂️
        -----------------------------------
        1. - FAZER PEDIDO
        2. - VERIFICAR TAXA DE ENTREGA
        3. - FALAR COM ATENDENTE
        `
        await WebWhats.send({to: from, msg})
    },
}