"use client";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useCart } from "@/hooks/use-cart";
import { Button } from "./ui/button";
import { Product } from "@/payload-types";

const AddToCart = ({ product }: { product: Product }) => {
	const [isSuccess, setIsSuccess] = useState(false);
	useEffect(() => {
		const timeOut = setTimeout(() => {
			setIsSuccess(false);
		}, 2000);
		return () => {
			clearTimeout(timeOut);
		};
	}, []);

	const { addItem } = useCart();

	return (
		<Button
			size={"lg"}
			variant="outline"
			className={cn("w-full", isSuccess ? "bg-fuchsia-500/90 text-white" : "")}
			onClick={() => {
				addItem(product);
				setIsSuccess(true);
			}}
		>
			{isSuccess ? "Added to cart" : "Add to cart"}
		</Button>
	);
};

export default AddToCart;
