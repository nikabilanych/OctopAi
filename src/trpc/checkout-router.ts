import { router, privateProcedure, publicProcedure } from "./trpc";
import { getPayloadClient } from "../get-payload";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { stripe } from "../lib/stripe";
import type Stripe from "stripe";
import { Orders } from "@/collections/Orders";

export const checkoutRouter = router({
    //private procedure includes ctx which checks authorised status

    createSession: privateProcedure
    .input(z.object({productIds: z.array(z.string())}))
    .mutation(async ({ctx, input}) => {
        const { user } = ctx
        const {productIds} = input
        

        // no products id cart
        if (productIds.length === 0) {
            throw new TRPCError({code: "BAD_REQUEST"})
        }
        
        //payload client
        const payload = await getPayloadClient()

        const { docs: products} = await payload.find({
            collection: "products",
            where: {
                id: {
                    in: productIds
                }
            }
        })

        //conditional check
        //only products with valid priceId 
        const filteredProducts = products.filter((product) => Boolean(product.priceId))

        //create order
        const order = await payload.create({
            collection: "orders",
            data: {
                _isPaid: false,
                user: user.id,
                products: filteredProducts.map((product) => product.id)
            }
        })

        const line_items:Stripe.Checkout.SessionCreateParams.LineItem[] = []
        
        filteredProducts.forEach((product) => {line_items.push({
            price: product.priceId!,
            quantity: 1
        })})

        line_items.push({
            //pricing fee - api from stripe
            price:"price_1OP5jAIQMLWcyNjYG3d8Skgk",
            quantity: 1,
            adjustable_quantity: {
                enabled: false
            }

        })

        try {
            const stripeSession = await stripe.checkout.sessions.create({
            success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/thank-you?orderId=${order.id}`,
            cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/cart`,
            payment_method_types: ["card","paypal"],
            mode: "payment",
            metadata: {
                userId: user.id,
                orderId: order.id
            },
            line_items
            })

            return {
                url: stripeSession.url 
            }
        } catch (err) {
            console.log(err)
            return{
                url: null
            }
            
        }
    }),

    
//is order paid or not? router

    orderStatus: publicProcedure
    .input(z.object({orderId: z.string()}))
    .query(async ({input}) => {
    
        const { orderId } = input
    
        const payload = await getPayloadClient()
    
        const { docs: orders } = await payload.find({
            collection: "orders",
            where: {
                id: {
                    equals: orderId
                }
            }
        })
        if (!orders.length){
            throw new TRPCError({code: "NOT_FOUND"})
        }

        //array destructuring
        const [order]=orders
        return {
            isPaid: order._isPaid
        }
    })

})