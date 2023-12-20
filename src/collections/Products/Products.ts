// 'table Products' 

import { PRODUCT_CATEGORIES } from '../../config'
import { CollectionConfig } from 'payload/types'
import { BeforeChangeHook } from 'payload/dist/collections/config/types'
import { Product } from '../../payload-types'
import { stripe } from '../../lib/stripe'


const addUser:BeforeChangeHook<Product> = async ({req, data}) => {
    const user = req.user 
    return {
        ...data,
        user: user.id
    }
}
//TODO: STRIPE stuff

export const Products: CollectionConfig = {
    slug: 'products',
    admin: {
        useAsTitle: 'name',
    },
    access: {},
    hooks:{
        beforeChange:[addUser, 
            async (action)=>{
            if (action.operation === "create"){
                const data = action.data as Product
                const createdProduct = await stripe.products.create({
                    name: data.name,
                    default_price_data: {
                        currency: "USD",
                        unit_amount: Math.round(data.price * 100),

                    }
                })
                const updated: Product = {
                    ...data,
                    stripeId: createdProduct.id,
                    priceId: createdProduct.default_price as string
                }
                return updated
            }
            else if (action.operation === "update"){

                const data = action.data as Product
                const updatedProduct = await stripe.products.update(data.stripeId!,{
                    name:data.name,
                    default_price: data.priceId!
                })
                   
                const updated: Product = {
                    ...data,
                    stripeId: updatedProduct.id,
                    priceId: updatedProduct.default_price as string
                }
                return updated
            }

        }],
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