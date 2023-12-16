import React from 'react'

import { publicProcedure, router } from "./trpc";
import { getPayloadClient } from "../get-payload";
import { object, z } from "zod";
import { QueryValidator } from '../lib/validators/query-validator';

export const productRouter = router({
    getInfiniteProducts: publicProcedure
    .input(z.object({
        //condition 
        //fetch allowed amount of items
        limit: z.number().min(1).max(100),
        //last element rendered 
        //if scrolled to bottom, fetch next page of items
        cursor: z.number().nullish(),
        query: QueryValidator,
    }))
    .query(async ({ input }) => {
        const { query, cursor } = input
        //destructured from query validator
        //queryOpts -> categories
        const { sort,limit, ...queryOpts } = query

        const payload = await getPayloadClient()

        //parse query options to valid cms query
        const parsedQueryOpts: Record<string, {equals:string}> = {}
        Object.entries(queryOpts).forEach(([key, value]) => {
            parsedQueryOpts[key] = {
                equals: value
            }
        })
        
        //if scrolled to bottom, fetch next page of items 
        const page = cursor || 1  
        
        //render only products that have been approved for sales
        //pagination
        const { docs:products, hasNextPage, nextPage } = await payload.find({
            collection: "products",
            where: {
                approvedForSales: {
                    equals: "approved",
                },
                ...parsedQueryOpts
            },
            sort,
            depth: 1,
            limit,
            page,
        })
        return {
            products, 
            nextPage: hasNextPage ? nextPage : null,
        }
    })
    
})
    

