import { CollectionConfig, Access } from "payload/types";
import { User } from "../payload-types";
const yourOwnOrder: Access = ({ req: {user}}) => {

    if (user.role === "admin") {
        return true
    }

    return {
        user: {
            equals: user?.id
        }
    }
}

export const Orders: CollectionConfig = {
    slug: "orders",
    admin: {
        useAsTitle: "Your Orders",
        description: "Summary of all your orders on DigitalOctopus",
    
    },
    access: {
       read: yourOwnOrder,
       update: ({req})=> req.user.role === "admin",
       create: ({req})=> req.user.role === "admin",
       delete: ({req})=> req.user.role === "admin",

    },
    fields: [
        {
            name: "_isPaid",
            type: "checkbox",
            required: true,

            access: {
                read: ({req}) => (req.user as User).role === "admin",
                create: () => false,
                update: () => false,
            },
            admin:{
                hidden:true,
            },
        },
        {
            name: "user",
            type: "relationship",
            relationTo: "users",
            required: true,
            admin: {
                hidden: true ,
            }
        },
        {
            name: "products",
            type: "relationship",
            relationTo: "products",
            hasMany: true,
            required: true,
        }
    ],

}