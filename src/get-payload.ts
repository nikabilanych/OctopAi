// initialize cms via payload
// https://payloadcms.com/docs/getting-started/installation
import dotenv from "dotenv";
import path from "path";
import type { InitOptions } from "payload/config";
import payload from "payload";

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
export const getPayloadClient = async ({initOptions}:Args = {}) => {if (!process.env.PAYLOAD_SECRET){
    throw new Error("Missing PAYLOAD_SECRET")
}
if (cached.client){
    return cached.client
}
if (!cached.promise){
    cached.promise = payload.init({
        secret:process.env.PAYLOAD_SECRET,
        local:initOptions?.express ? false : true,
        ...(initOptions || {}),
    })
}
try {
    cached.cliet = await cached.promise
} catch (err:unknown) {
    cached.promise=null;
    throw err
}
return cached.client
}