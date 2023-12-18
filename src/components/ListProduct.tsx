"use client";
import { useEffect, useState } from "react";
import { Product } from "../payload-types";
import { Skeleton } from "./ui/skeleton";
import Link from "next/link";
import ImageSlider from "./ImageSlider";
import { cn, formatPrice } from "@/lib/utils";
import { PRODUCT_CATEGORIES } from "@/config";

interface ListProductProps {
  product: Product | null;
  index: number;
}
const ListProduct = ({ product, index }: ListProductProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const label = PRODUCT_CATEGORIES.find(
    ({ value }) => value === product?.category
  )?.label;

  const validUrls = product?.images
    .map(({ image }) => (typeof image === "string" ? image : image.url))
    .filter(Boolean) as string[];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 75);
    //clear memory leaks
    return () => clearTimeout(timer);
  }, [index]);

  if (!product || !isVisible) {
    return <ProductPlaceHolder />;
  }
  if (isVisible && product) {
    return (
      <Link
        className={cn("invisible h-full w-full cursor-pointer group-main", {
          "visible animate fade-in-5": isVisible,
        })}
        href={`/product/${product.id}`}
      >
        <div className="flex flex-col w-full">
          <ImageSlider urls={validUrls} />
          <h3 className="mt-4 font-medium text-sm text-gray-700">
            {product.name}
          </h3>
          <p className="mt-1 text-sm text-gray-500">{label}</p>
          <p className="mt-1 text-sm font-medium text-gray-900">
            {formatPrice(product.price)}
          </p>
        </div>
      </Link>
    );
  }
};

export default ListProduct;

const ProductPlaceHolder = () => {
  return (
    <div className="flex flex-col w-full">
      <div className=" relative bg-zinc-100 aspect-square w-full overflow-hidden rounded-xl">
        <Skeleton className="w-full h-full" />
      </div>
      <Skeleton className="mt-4 w-2/3 h-4 rounded-lg" />
      <Skeleton className="mt-2 w-16 h-4 rounded-lg" />
      <Skeleton className="mt-2 w-12 h-4 rounded-lg" />
    </div>
  );
};
