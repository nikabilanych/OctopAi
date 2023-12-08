import { buildConfig } from 'payload/config'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { slateEditor } from  '@payloadcms/richtext-slate'  
import { webpackBundler } from '@payloadcms/bundler-webpack'
import path from 'path'
export default buildConfig({
    serverURL: process.env.NEXT_PUBLIC_SERVER_URL || "",
    //TODO: add products etc.
    collections:[],
    //TODO: add sell route
    routes: {
        admin: "/sell"
    },
    admin:{
        // TODO: add admin dashboard
        // TODO: add icon & thumbnail
        bundler: webpackBundler(),
        meta:{
            titleSuffix: " - DigitalOctopus",
            favicon: '/favicon.ico',
            ogImage: '/thumbnail.jpg',
        },
    },
    rateLimit: {
        max: 2000,
    },
    editor: slateEditor({}),
    db: mongooseAdapter({
        url: process.env.DATABASE_URL!,
    }),
    typescript: {
        outputFile: path.resolve(__dirname, 'payload-types.ts'),
    },
})

