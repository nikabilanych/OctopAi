//--> db client <--//
//--> cms & admin dashboard <--//
//payload cms via https://payloadcms.com/docs/getting-started/installationxw
import { getPayloadClient } from "./get-payload";
import express from "express"
import { nextHandler } from "./next-utils";
const app=express();
const PORT = Number(process.env.PORT)||3000;
const start = async () => {
    const payload = await getPayloadClient({
        initOptions: {
            express: app,
            onInit: async (cms) => {
                cms.logger.info(`Payload Admin URL: ${cms.getAdminURL()}`); 
            },
        }
    })
    // -> option for self host, no need for vercel --
    app.use((req,res) => nextHandler(req, res))
    // SELFHOSTING
};
start()