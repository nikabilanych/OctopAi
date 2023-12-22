import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import { PRODUCT_CATEGORIES } from "@/config";
import { Product, ProductFile } from "@/payload-types";
import { getPayloadClient } from "@/get-payload";
import { getServerSideUser } from "@/lib/payload-utils";
import { Loader2 } from "lucide-react";
import { cookies } from "next/headers";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";

interface PageProps {
	searchParams: { [key: string]: string | string[] | undefined };
}

const ThankYouPage = async ({ searchParams }: PageProps) => {
	const orderId = searchParams.orderId;
	const nextCookies = cookies();
	const { user } = await getServerSideUser(nextCookies);

	const payload = await getPayloadClient();

	//access to user's orders -> depth 2 needed for getting order and user id
	const { docs: orders } = await payload.find({
		collection: "orders",
		depth: 2,
		where: {
			id: {
				equals: orderId,
			},
		},
	});

	const [order] = orders;
	//if order not found return 404
	if (!order) {
		return notFound();
	}

	const TOTAL = (order.products as Product[]).reduce(
		(total, product) => total + product.price,
		0
	);

	//secure the route

	const orderUserID =
		typeof order.user === "string" ? order.user : order.user.id;
	if (user?.id !== orderUserID) {
		//return user back to the initial thank you page
		return redirect(`/sign-in?origin=thank-you?orderId=${order.id}`);
	}

	return (
		<main className="relative lg:min-h-full">
			<div className="h-80 hidden lg:block overflow-hidden lg:absolute lg:h-full lg:w-1/2 lg:pr-4 xl:pr-12">
				<Image
					fill
					src={"/checkout-thank-you.jpg"}
					className="h-full w-full object-cover object-center"
					alt="Thank you for your order"
				/>
			</div>
			<div>
				<div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-32 xl:gap-x-24">
					<div className="lg:col-start-2">
						<p className="text sm font-medium text-pyrply">Order successful</p>
						<h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
							Thanks for ordering.
						</h1>
						{order._isPaid ? (
							<p className="mt-4 text-base text-muted-foreground">
								Your order was processed successfully! Download your assets
								below. We&apos;ve sent your receipt and order details to {"  "}
								{typeof order.user !== "string" ? (
									<span className="font-medium text-gray-900">
										{order.user?.email}
									</span>
								) : null}
							</p>
						) : (
							<p className="mt-4 text-base text-muted-foreground">
								<Loader2 />
								Hang tight! Your order is being processed
							</p>
						)}
						<div className="mt-16 text-sm font-medium">
							<div className="text-muted-foreground">Order nr. </div>
							<div className="text-gray-900 mt-2">{order.id}</div>
						</div>
						<ul className="mt-6 divide-y divide-gray-200 border-t border-gray-200 text-sm font-medium text-muted-foreground">
							{(order.products as Product[]).map((product) => {
								const label = PRODUCT_CATEGORIES.find(
									(p) => p.value === product.category
								)?.label;
								const downloadUrls = (product.product_files as ProductFile)
									.url as string;
								const { image } = product.images[0];
								return (
									<li key={product.id} className="flex space-x-6 py-6">
										<div className="h-24 w-24 relative">
											{typeof image !== "string" && image.url ? (
												<Image
													src={image.url}
													fill
													alt={product.name}
													className="h-full w-full object-cover object-center"
												/>
											) : null}
										</div>
										<div className="flex-auto flex flex-col justify-between">
											<div className="space-y-1">
												<h3 className="text-gray-900">{product.name}</h3>
												<p className="my-1">Category: {label}</p>
											</div>
											{order._isPaid ? (
												<a
													href={downloadUrls}
													download={product.name}
													className="text-pyrply hover:underline underline-offset-2"
												>
													Download asset
												</a>
											) : null}
										</div>
										<p className="flex-none font-medium text-gray-900">
											{formatPrice(product.price)}
										</p>
									</li>
								);
							})}
						</ul>
						<div className="space-y-6 border-t border-gray-200 pt-6 text-sm font-medium text-muted-foreground">
							<div className="flex justify-between">
								<p>Subtotal</p>
								<p className="text-gray-900">{formatPrice(TOTAL)}</p>
							</div>
							<div className="flex justify-between">
								<p>Transaction Fee</p>
								<p className="text-gray-900">{formatPrice(1)}</p>
							</div>
							<div className="flex items-center justify-between border-t border-gray-200 pt-6 text-gray-900">
								<p className="text-base">Total</p>
								<p className="text-base">
									{formatPrice(TOTAL + 1)}
								</p>
							</div>
						</div>
                        <div className="mt-16 border-gray-200 border-t py-6 text-right">
                            <Link href="/products" className="text-sm font-medium text-pyrply hover:text-fuchsia-400">
                                Continue Shopping&rarr;
                                
                            </Link>

                        </div>
					</div>
				</div>
			</div>
		</main>
	);
};

export default ThankYouPage;
