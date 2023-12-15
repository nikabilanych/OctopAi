// table media
// use hooks -> events (function)

import { CollectionConfig } from 'payload/types'

export const Media: CollectionConfig = {
    slug: 'media',
    hooks: {
        beforeChange: [({req,data}) => {return {
            ...data,
            user: req.user._id}
        }
    ],
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
        'image/',
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