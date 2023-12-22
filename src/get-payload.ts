// initialize cms payload instance

import dotenv from "dotenv";
import path from "path";
import type { InitOptions } from "payload/config";
import payload, { Payload } from "payload";
import { transporter } from "./lib/email";

dotenv.config({
    path: path.resolve(__dirname, "../.env"),
});


//saving resourcing thanks to caching (esp during development)
let cached = (global as any).payload;

if (!cached) {
    cached = (global as any).payload = {
        client: null,
        promise: null,
    }
}
// access to database thanks to payload client
interface Args {
    initOptions?: Partial<InitOptions>
}
export const getPayloadClient = async ({initOptions}:Args = {}):Promise<Payload> => {if (!process.env.PAYLOAD_SECRET){
    throw new Error("Missing PAYLOAD_SECRET")
}

if (cached.client){
    return cached.client
}
if (!cached.promise){
    cached.promise = payload.init({
        email:{
            transport: transporter,
            fromAddress: "hello@digitaloctopus.com",
            fromName:"digitalOctopus",

        },
        secret:process.env.PAYLOAD_SECRET,
        local:initOptions?.express ? false : true,
        ...(initOptions || {}),
    })
}
try {
    cached.client = await cached.promise
} catch (e:unknown) {
    cached.promise=null
    throw e
}
return cached.client
}