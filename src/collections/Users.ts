// 'table' 

import { CollectionConfig } from 'payload/types';
//types: Admins, Users (sellers,buyers)
//adjust dashboard based off what user is signed in
export const Users: CollectionConfig={
    slug: 'users',
    auth: {
        verify:{
            generateEmailHTML:({token})=>{
                return `
                <div> Ahoj </div>
                <a href="${process.env.NEXT_PUBLIC_SERVER_URL}/verify-email?token=${token}">Please verify your account</a>
                `
        }
        },},
    access: {
        read: () => true,
        create: () => true,

    },
    fields: [
        {
            name: 'role',
            defaultValue: 'user',
            required: true, 
            type: 'select',
            options: [
                {
                    label: 'Admin',
                    value: 'admin',
                },
                {
                    label: 'User',
                    value: 'user',
                },
            ],
        },
    ], 
}

