import React from "react";
import { Product } from "@/payload-types";
import Image from "next/image";
import { ImageIcon } from "lucide-react";

const CartItem = ({ product }: { product: Product }) => {
	const { image } = product.images[0];

	return (
		<div className="space-y-3 py-2">
			<div className="flex items-start justify-between gap-4">
				<div className="flex items-center space-x-4">
					<div className="relative aspect-square h-16 w-16 overflow-hidden rounded min-w-fit">
						{typeof image !== "string" && image.url ? (
							<Image
								alt="Product image"
								src={image.url}
								fill
								className="absolute object-cover"
							></Image>
						) : (
							<div className="flex h-full items-center justify-center bg-secondary">
								<ImageIcon
									aria-hidden={true}
									className="h-4 w-4 text-muted-foreground"
								/>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default CartItem;
