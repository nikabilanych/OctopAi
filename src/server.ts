//--> db client <--//
//--> cms & admin dashboard <--//
//payload cms via https://payloadcms.com/docs/getting-started/installationxw
import { getPayloadClient } from "./get-payload";
import express from "express"
import * as trpcExpress from "@trpc/server/adapters/express";
import { nextApp, nextHandler } from "./next-utils";
import { appRouter } from "./trpc";
import { inferAsyncReturnType } from '@trpc/server'

const app = express();

const PORT = Number(process.env.PORT)||3000;

const createContext = ({
    req,
    res,
  }: trpcExpress.CreateExpressContextOptions) => ({
    req,
    res,
  })
  //typescript utility
  export type ExpressContext = inferAsyncReturnType<typeof createContext>

const start = async () => {
    const payload = await getPayloadClient({
        initOptions: {
            express: app,
            onInit: async (cms) => {
                cms.logger.info(`Payload Admin URL: ${cms.getAdminURL()}`); 
            },
        }
    })
    //request flow -> api/trpc request -> forwarded to api middleware trpcExpress.createExpressMiddleware -> need endpoint
    //this route is accessed thanks to slug []
    app.use('/api/trpc', trpcExpress.createExpressMiddleware({
        router: appRouter,
        createContext, 
    }))
    // -> option for self host, no need for vercel <-- //
    app.use((req,res) => nextHandler(req, res))
        // SELFHOSTING
    nextApp.prepare().then(() => {
        
            // payload.logger.info(`> Payload - Ready on ${process.env.NEXT_PUBLIC_SERVER_URL}`);
            app.listen(PORT,async () => {
                
            })
        });

};
start()

// [dynamic routes]
