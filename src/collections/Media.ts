// table media
// use hooks -> events (function)

import { Access, CollectionConfig } from 'payload/types'
import { User } from '../payload-types'
const isAdminOrHasImageAccess = ():Access => async ({ req }) => {
        const user = req.user as User | undefined
        if(!user){
            return false
        }
        if (user.role === 'admin'){
            return true
        }
        //access to user's images
        return { user: { equals: (req.user as User).id },
        }
    }


export const Media: CollectionConfig = {
    slug: 'media',
    hooks: {
        beforeChange: [({req,data}) => {return {
            ...data,
            user: (req.user as User).id}
        }
    ],
},
    admin: {
        hidden:({user})=> user?.role !== 'admin',
    },
    access: {
        read: async ({ req}) => {
            const referer = req.headers.referer
            if(!req.user || !referer?.includes("/sell")){
                return true
            }
            return await isAdminOrHasImageAccess()({req}) 
        } ,
        delete: isAdminOrHasImageAccess(),
        update: isAdminOrHasImageAccess(),
    },
    upload: {
        staticURL: '/media',
        staticDir: 'media',
        imageSizes:[
        {
            name: 'card',
            width: 768,
            height: 1024,
            position: 'centre',
        },
        
        {
            name: 'thumbnail',
            width: 400,
            height: 300,
            position: 'centre',
        },
        {
            name: 'tablet',
            width: 1024,
            height: undefined,
            position: 'centre',
        },
    ],
    
    mimeTypes:[
        //enforce image types
        'image/*',
    ]
    },
    fields: [
        {
            name: 'user',
            label: 'User',
            type: 'relationship',
            relationTo: 'users',
            required: true,
            hasMany: false,
            admin: {
                condition: () => false,
            }
        },

    ],

}