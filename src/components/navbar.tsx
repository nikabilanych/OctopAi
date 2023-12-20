import UserAccountNav from "./UserAccountNav";
import React from "react";
import { Button } from "./ui/button";
import Wrapper from "./Wrapper";
import Link from "next/link";
import { Icons } from "./Icons";
import Cart from "./Cart";
import NavItems from "./NavItems";
import { getServerSideUser } from "@/lib/payload-utils";
import { cookies } from "next/headers";

const Navbar = async () => {
	const nextCookies = cookies();
	const { user } = await getServerSideUser(nextCookies);
	return (
		<div className="sticky text-black inset-x-0 top-0 z-50 h-16 bg-white">
			<header className="relative bg-white">
				<Wrapper>
					<div className="border-b border-gray-200">
						<div className="flex h-16 items-center">
							{/* TODO: MOBILE */}
							<div className="ml-4 flex lg:ml-0">
								<Link href={"/"}>
									<Icons.logo className="h-10 w-10 hover:transform hover:scale-105 hover:contrast-75" />
								</Link>
							</div>
							<div className="z-50 hidden lg:ml-8 lg:block lg:self-stretch">
								<NavItems />
							</div>
							<div className="ml-auto flex items-center">
								<div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
									{/* TODO: add currency switch and language */}

									{user ? null : (
										<Button variant={"ghost"} asChild>
											<Link href={"/sign-in"} className="text-sm font-medium">
												Sign in
											</Link>
										</Button>
									)}

									{/* decorational, separate two buttons */}
									{user ? null : (
										<span
											area-hidden="true"
											className="h-6 w-px bg-gray-200"
										></span>
									)}

									{user ? (
										<p>
											<UserAccountNav user={user} />
										</p>
									) : (
										<Button asChild variant={"ghost"}>
											<Link href={"/sign-up"} className="text-sm font-medium">
												Create an account
											</Link>
										</Button>
									)}
									{user ? (
										<span
											area-hidden="true"
											className="h-6 w-px bg-gray-200"
										></span>
									) : null}
									{user ? (
										<Button variant={"ghost"} asChild>
											<Link href={"/dashboard"} className="text-sm font-medium">
												Dashboard
											</Link>
										</Button>
									) : null}
									{user ? (
										<span
											area-hidden="true"
											className="h-6 w-px bg-gray-200"
										></span>
									) : null}

									{user ? null : (
										<div className="flex lg:ml-6">
											<span
												className="h-6 w-px bg-gray-200"
												aria-hidden="true"
											/>
										</div>
									)}
									<div className="ml-4 flow-root lg:ml-6">
										<Cart />
									</div>
								</div>
							</div>
						</div>
					</div>
				</Wrapper>
			</header>
		</div>
	);
};
export default Navbar;
