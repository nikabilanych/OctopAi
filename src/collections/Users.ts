// "table" 

import { CollectionConfig } from "payload/types";
//types: Admins, Users (sellers,buyers)
//adjust dashboard based off what user is signed in
export const Users: CollectionConfig={
    slug: "users",
    fields: [
        {
            name: "role",
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

