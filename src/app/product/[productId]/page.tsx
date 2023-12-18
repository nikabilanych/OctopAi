import Wrapper from "@/components/wrapper";
import Link from "next/link";
import React from "react";
import { getPayloadClient } from "@/get-payload";
import { notFound } from "next/navigation";
import { formatPrice } from "@/lib/utils";
import { PRODUCT_CATEGORIES } from "@/config";
import { Check, PackageX, Shield } from "lucide-react";
import ImageSlider from "@/components/ImageSlider";
import ProductReel from "@/components/ProductReel";
import AddToCart from "@/components/AddToCart";

interface ProductPageProps {
  params: {
    productId: string;
  };
}

const BREADCRUMBS = [
  {
    id: 1,
    name: "Home",
    href: "/",
  },
  {
    id: 2,
    name: "Products",
    href: "/products",
  },
];

const ProductPage = async ({ params }: ProductPageProps) => {
  const { productId } = params;

  const payload = await getPayloadClient();

  const { docs: products } = await payload.find({
    collection: "products",
    limit: 1,
    where: {
      _id: {
        equals: productId,
      },
      approvedForSales: {
        equals: true,
      },
    },
  });

  const [product] = products;
  if (!product) {
    return notFound();
  }
  const label = PRODUCT_CATEGORIES.find(
    (category) => category.value === product.category
  )?.label;

  const validUrls = product.images
    .map(({ image }) => (typeof image === "string" ? image : image.url))
    .filter(Boolean) as string[];

  return (
    <>
      <Wrapper className="bg-white">
        <div className="bg-white">
          <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:max-w-7xl lg:px-8">
            <div className="lg:max-w-lg lg:self-end">
              <ol className="flex items-center space-x-2">
                {/* navigation */}
                {BREADCRUMBS.map((breadcrumb, index) => (
                  <li key={breadcrumb.href}>
                    <div className="flex items-center text-sm">
                      <Link
                        href={breadcrumb.href}
                        className="text-muted-foreground text-sm font-medium hover:text-gray-900"
                      >
                        {breadcrumb.name}
                      </Link>
                      {index !== BREADCRUMBS.length - 1 ? (
                        <svg
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                          className="ml-2 h-5 w-5 flex-shrink-0 text-gray-300"
                        >
                          <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                        </svg>
                      ) : null}
                    </div>
                  </li>
                ))}
              </ol>
              <div className="mt-4">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  {product.name}
                </h1>
              </div>
              <section className="mt-4">
                <div className="flex items-center">
                  <p className="font-medium text-gray-900">
                    {formatPrice(product.price)}
                  </p>
                  <div className="ml-4 border-l text-muted-foreground border-gray-300 pl-4">
                    {label}
                  </div>
                </div>
                <div className="mt-4 space-y-6">
                  <p className="text-base text-muted-foreground">
                    {product.description}
                  </p>
                </div>
                <div className="mt-6 flex items-center">
                  <Check
                    aria-hidden="true"
                    className="h-5 w-5 flex-shrink-0 text-green-500"
                  />
                  <p className="ml-2 text-sm text-muted-foreground">
                    {" "}
                    Instant delivery
                  </p>
                </div>
              </section>
            </div>
            {/* Product images */}

            <div className="mt-10 lg:col-start-2 lg:row-start-2 lg:mt-0 lg:self-center">
              <div className="aspect-square rounded-lg">
                <ImageSlider urls={validUrls} />
              </div>
            </div>
            {/* add to cart */}

            <div className="mt-10 lg:col-start-1 lg:row-start-2 lg:mx-w-lg lg:self-start">
              <div>
                <div className="mt-10">
                  <AddToCart />
                </div>
                <div className="mt-6 text-center">
                  <div className="inline-flex text-sm text-medium group">
                    <PackageX
                      aria-hidden="true"
                      className="mr-2 h-5 w-5 text-gray-400 flex-shrink-0"
                    />
                    <span className="text-muted-foreground hover:text-gray-900">
                      Not satisfied? Gotcha covered with our 30-day money back
                      guarantee{" "}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* related products */}
        <ProductReel
          href="/products"
          query={{ category: product.category, limit: 4 }}
          title={`Related ${label}`}
          subtitle={`Browse similar ${label} just like '${product.name}'`}
        />
      </Wrapper>
    </>
  );
};

export default ProductPage;
