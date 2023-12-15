import { BeforeChangeHook } from "payload/dist/collections/config/types";
import { CollectionConfig, Access } from "payload/types";
import {User} from "../payload-types";
const addUser:BeforeChangeHook=({req,data})=>{
    const user = req.user as User | null
   return {
       ...data,
       //optional ? because of the | null
       user: user?.id
   }
}
const ownedOrPurchased:Access = async ({ req }) => {
    const user = req.user as User | undefined
    if(!user){
        return false
    }
    if (user?.role === 'admin'){
        return true
    }
    //access to user's images
    const { docs: products } = await req.payload.find({
        collection: "products",
        //only search id from the table
        depth:0,
        where: {
            user: {
                equals: user.id
            }
        }
    })

    const ownProductFileId = products.map((product) => product.product_files).flat()
    
    const {docs:orders} = await req.payload.find ({
        collection: "orders",
        //user and id 
        //fetch multiple levels of data
        depth:2,
        where: {
            user: {
                equals: user.id
            },
        }
    })
    const purchasedProductFileId = orders.map((order) => {
        return order.products.map((product) => {
            if (typeof product === "string") 
            return req.payload.logger.error('Search depth not efficient to find purchased file IDs')

            return typeof product.product_files === "string" 
            ? product.product_files 
            : product.product_files.id
        })
        })
        .filter(Boolean)
        .flat()
    
        return {
            //access owned and purchased files
            id:{
                in: [...ownProductFileId, ...purchasedProductFileId]
            }
    }
}

export const ProductFiles: CollectionConfig = {
    slug: "product_files",

    admin: {
        hidden: ({ user }) => user.role !== "admin",
    },
    hooks: {
        beforeChange:[addUser],
    },
    access:{
        read: ownedOrPurchased,
        // users won't be able to update OR delete product files
        update: ({req})=> req.user.role === "admin",
        delete: ({req})=> req.user.role === "admin",

    },
    upload:{
        staticURL: "/product_files",
        staticDir: "product_files",
        mimeTypes: ["image/*","font/*","application/postscript"],
    },
    fields: [
        {
            name: "user",
            type: "relationship",
            relationTo: "users",
            required: true,
            hasMany: false,
            admin: {
                condition: () => false,
            },
        },
    ]
}