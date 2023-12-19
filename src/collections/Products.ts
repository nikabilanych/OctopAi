// 'table Products' 

import { PRODUCT_CATEGORIES } from '../config'
import { CollectionConfig } from 'payload/types'
import { BeforeChangeHook } from 'payload/dist/collections/config/types'
import { Product } from '../payload-types'

const addUser:BeforeChangeHook<Product> = async ({req, data}) => {
    const user = req.user 
    return {
        ...data,
        user: user.id
    }
}

export const Products: CollectionConfig = {
    slug: 'products',
    admin: {
        useAsTitle: 'name',
    },
    access: {},
    hooks:{
        beforeChange:[addUser],
    },
    fields: [
        {
            name: 'user',
            type: 'relationship',
            relationTo: 'users',
            required: true,
            hasMany: false,
            admin: {
                condition: () => false,
            }
        },
        {
            name: 'name',
            label: 'Name',
            type: 'text',
            required: true,
        },
        {
            name: 'description',
            label: 'Product detail',
            type: 'textarea',
        },
        {
            name: 'price',
            label: 'Price in USD',
            min: 0,
            max: 1000,
            type: 'number',
            required: true,
        },
        //TODO: add product_files
        {
            name: "category",
            label: "Category",
            type: "select",
            options: PRODUCT_CATEGORIES.map(
                ({label, value}) => ({ label,value})
            ),
            required: true,
        },
        {
            name: "product_files",
            label: "Product File(s)",
            type: "relationship",
            relationTo: "product_files",
            hasMany:false,
            required: true,
        },
        {
            name:"approvedForSales",
            label: "Product status",
            type: "select",
            defaultValue:"pending",
            access: {
                create: ({req}) => req.user.role === "admin",
                read: ({req}) => req.user.role === "admin",
                update: ({req}) => req.user.role === "admin",
            },
            options: [
                {
                    label: "Pending Verification",
                    value: "pending",
                },
                {
                    label: "Approved",
                    value: "approved",
                },
                {
                    label: "Denied",
                    value: "denied",
                },
            ],
            required: true,
        },
        {
            name:"priceId",
            access: {
                create: () => false,
                update: () => false,
                read: () => false,
            },
            type: "text",
            admin: {
                hidden: true
            }
        },
        {
            name:"stripeId",
            access: {
                create: () => false,
                update: () => false,
                read: () => false,
            },
            type: "text",

            admin: {
                hidden: true
            }
        },
        {
            name:"images",
            type: "array",
            label:"Product Images",
            required: true,
            minRows: 1,
            maxRows: 4,
            labels: {
                singular: "Image",
                plural: "Images",
            },
            //TODO: add media coll ?
            fields: [
                {
                    name: "image",
                    type: "upload",
                    relationTo: "media",
                    required: true,
                },
            ],
        },
    ],
}