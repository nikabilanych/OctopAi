"use client";

import Link from "next/link";
import React from "react";
import { trpc } from "@/trpc/client";
import { QueryValidatorType } from "@/lib/validators/query-validator";
import { Product } from "@/payload-types";
import ListProduct from "./ListProduct";

interface ProductReelProps {
	title: string;
	subtitle?: string;
	href?: string;
	query: QueryValidatorType;
}

const FALLBACK_LIMIT = 4;
const ProductReel = (props: ProductReelProps) => {
	//destructure the title
	const { title, subtitle, href, query } = props;

	//querying
	const { data: queryData, isLoading } =
		trpc.products.getInfiniteProducts.useInfiniteQuery(
			{ limit: query.limit ?? FALLBACK_LIMIT, query },
			{
				getNextPageParam: (lastPage) => lastPage.nextPage,
			}
		);

	// displaying
	// flattened map

	const products = queryData?.pages.flatMap((page) => page.products) || [];

	let map: (Product | null)[] = [];
	if (products && products.length) {
		map = products;
	} else if (isLoading) {
		map = new Array<null>(query.limit ?? FALLBACK_LIMIT).fill(null);
	}

	return (
		<section className="py-12">
			<div className="md:flex md:items-center md:justify-between mb-4">
				<div className="max-w-2xl lg:max-w-4xl px-4 lg:px-0">
					{title ? (
						<h1 className="text-2x1 font-bold text-gray-900 sm:text-3x1">
							{title}
						</h1>
					) : null}

					{subtitle ? (
						<p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
					) : null}
				</div>
				{href ? (
					<Link
						href={href}
						className="hidden md:block text-sm font-medium text-pyrply hover:text-purple-500"
					>
						Shop the collection{"  "}
						<span aria-hidden="true">&rarr;</span>
					</Link>
				) : null}
			</div>
			<div className="relative">
				<div className="mt-6 flex items-center w-full">
					<div className="w-full grid grid-cols-2 gap-x-4 gay-y-10 sm:gap-x-6 md:gril-cols-4 md:gap-y-10 lg:gap-x-8">
						{map.map((product, index) => (
							<ListProduct product={product} index={index} key={product?.id} />
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default ProductReel;
