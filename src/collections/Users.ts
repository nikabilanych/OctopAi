// "table" 

import { CollectionConfig } from "payload/types";
//types: Admins, Users (sellers,buyers)
//adjust dashboard based off what user is signed in
export const Users: CollectionConfig={
    slug: "users",
    auth: true,
    access: {
        read: () => true,
        create: () => true,
        update: () => true,
        delete: () => true,
    },
    fields: [
        {
            name: "role",
            admin: {
                condition: () => false,
            },
            type: "select",
            options: [
                {
                    label: "Admin",
                    value: "admin",
                },
                {
                    label: "User",
                    value: "user",
                },
            ],
        },
    ], 
}

