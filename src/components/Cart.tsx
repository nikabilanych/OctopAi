"use client";
import Link from "next/link";
import React from "react";
import { useState, useEffect } from "react";
import { ShoppingBag } from "lucide-react";
import CartItem from "./CartItem";
import {
	Sheet,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { formatPrice } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/use-cart";
import { Icons } from "./Icons";

const Cart = () => {
	const fee = 1;
	const { items } = useCart();
	let itemCount = items.length;
	//reduce -> total by default starts at 0
	const cartTotal = items.reduce(
		(total, { product }) => total + product.price,
		0
	);

	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	return (
		<Sheet>
			<SheetTrigger className="group m-2 hover:transform hover:scale-110 flex items-center p-2">
				<ShoppingBag className="h-6 w-6  flex-shrink-0 text-black group-hover:text-[#780f9b]/80" />
				<span className="ml-2 text-sm font-medium text-black group-hover:text-gray-100/60">
					{isMounted ? itemCount : 0}
				</span>
			</SheetTrigger>
			<SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
				<SheetHeader className="space-y-3 pr-6">
					<SheetTitle className="text-lg font-semibold">
						Cart({itemCount})
					</SheetTitle>
				</SheetHeader>

				{itemCount > 0 ? (
					<>
						<div className="flex w-full flex-col pr-6">
							{/* cart logic */}

							{items.map(({ product }) => (
								<CartItem key={product.id} product={product} />
							))}
						</div>
						<div className="space-y-4 pr-6">
							<Separator />
							<div className="space-y-2 text-sm">
								<div className="flex">
									<span className="flex-1">Shipping</span>
									<span>Free </span>
								</div>
								<div className="flex">
									<span className="flex-1">Transaction Fee </span>
									<span>{formatPrice(fee)} </span>
								</div>

								<div className="flex">
									<span className="flex-1">Total</span>
									<span>{formatPrice(cartTotal + fee)}</span>
								</div>
							</div>
							<SheetFooter>
								<SheetTrigger asChild>
									<Link
										href={"/cart"}
										className={buttonVariants({ className: "w-full" })}
									>
										Continue to Checkout
									</Link>
								</SheetTrigger>
							</SheetFooter>
						</div>
					</>
				) : (
					<div className="flex h-full flex-col items-center justify-center space-y-1">
						<div
							className="relative mb-4 h-[115px] w-[200px] text-muted-foreground"
							aria-hidden="true"
						>
							<Icons.cecilian />
						</div>
						<div className="text-xl font-semibold">Your cart is empty</div>
						<SheetTrigger asChild>
							<Link
								href={"/products"}
								className={buttonVariants({
									variant: "link",
									size: "sm",
									className: "w-full text-sm text-muted-foreground",
								})}
							>
								Continue shopping
							</Link>
						</SheetTrigger>
					</div>
				)}
			</SheetContent>
		</Sheet>
	);
};

export default Cart;
