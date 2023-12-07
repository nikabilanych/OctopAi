//cms & admin dashboard
//payload cms via https://payloadcms.com/docs/getting-started/installation


import { getPayloadClient } from "./get-payload";
import express from "express"
const app=express();
const PORT=Number(process.env.PORT)||3000;
const start = async () => {
    const payload = await getPayloadClient();
};
start()