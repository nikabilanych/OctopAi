"use client";
import { Icons } from "@/components/Icons";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { useForm } from "react-hook-form"; //useForm from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { trpc } from "@/trpc/client";
import { authCredentials } from "@/lib/validators/account-validator";
import type { authCredentialsType } from "@/lib/validators/account-validator";
import { ZodError } from "zod";
import { useRouter } from "next/navigation";

const Page = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm<authCredentialsType>({
		resolver: zodResolver(authCredentials),
	});

	const router = useRouter();

	const { mutate, isLoading } = trpc.auth.createPayloadUser.useMutation({
		onError: (err) => {
			///USER EXISTS ?
			if (err.data?.code === "CONFLICT") {
				toast.error("This email is already in use. Sign in instead?");
			}
			if (err instanceof ZodError) {
				toast.error(err.issues[0].message);
				return;
			}
			toast.error("Something went wrong. Please try again.");
		},
		onSuccess: ({ sentToEmail }) => {
			toast.success(`We have sent a verification link to ${sentToEmail}.`);
			router.push("/verify-email?to=" + sentToEmail);
		},
	});

	//send data to server
	const onSubmit = ({ email, password }: authCredentialsType) => {
		mutate({ email, password });
	};
	return (
		<>
			<div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
				<div className="mx-auto w-full justify-center space-y-6 sm:w-[350px] flex flex-col ">
					<div className="flex flex-col items-center space-y-2 text-center">
						<Icons.logo className="h-10 w-10" />
						<h1 className="text-2xl font-bold tracking-tight">
							Create an account
						</h1>
						<Link
							href={"/sign-in"}
							className={buttonVariants({
								variant: "link",
								className: "gap-1",
							})}
						>
							Already have an account? Sign in
							<ArrowRight className="h-4 w-4" />
						</Link>
					</div>
					<div className="grid gap-6">
						<form onSubmit={handleSubmit(onSubmit)}>
							<div className="grid gap-2">
								<div className="grid gap-1 py-2">
									<Label htmlFor="email" className="ml-2 mb-1">
										Email
									</Label>
									<Input
										{...register("email")}
										required
										className={cn({
											"focus-visible:ring-red-500/90": errors.email,
										})}
										placeholder="johndoe@me.com"
									/>
									{errors?.email && (
										<p className="text-sm text-red-500">
											{errors.email.message}
										</p>
									)}
								</div>
								<div className="grid gap-1 py-2">
									<Label htmlFor="password" className="ml-2 mb-1">
										Password
									</Label>
									<Input
										type="password"
										required
										{...register("password")}
										className={cn({
											"focus-visible:ring-red-500/90": errors.password,
										})}
										placeholder="password"
									/>
									{errors?.password && (
										<p className="text-sm text-red-500">
											{errors.password.message}
										</p>
									)}
								</div>
								<Button disabled={isLoading}>Create account</Button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};
export default Page;
