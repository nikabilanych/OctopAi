"use client";
import { Icons } from "@/components/Icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  authCredentials,
} from "@/lib/validators/account-validator";
import type { authCredentialsType } from "@/lib/validators/account-validator";
import { trpc } from "@/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form"; //useForm from "react-hook-form";
import { toast } from "sonner";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<authCredentialsType>({
    resolver: zodResolver(authCredentials),
  });

  const searchParams = useSearchParams();

  const router = useRouter();

  //key value pair /sign-in?as=seller
  //if an item inder the key "as" is equal to "seller"
  const isSeller = searchParams.get("as") === "seller";

  const continueAsSeller = () => {
    router.push("?as=seller");
  };
  const continueAsCustomer = () => {
    router.replace("/sign-in", undefined);
  };
  const role = isSeller ? "seller" : "";
  const origin = searchParams.get("origin");

  const { mutate: SignIn, isLoading } = trpc.auth.signIn.useMutation({
    onSuccess: async () => {
      toast.success("Signed in successfully");

      router.refresh();

      if (origin) {
        //send back to origin
        router.push(`/${origin}`);
        return;
      }

      if (isSeller) {
        //insert products
        router.push("/sell");
        return;
      }

      router.push("/");
      router.refresh();
    },
    onError: (err) => {
      if (err.data?.code === "UNAUTHORIZED") {
        toast.error("Invalid email or password.");
      }
    },
  });

  //send data to server
  const onSubmit = ({ email, password }: authCredentialsType) => {
    SignIn({ email, password });
  };
  return (
    <>
      <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
        <div className="mx-auto w-full justify-center space-y-6 sm:w-[350px] flex flex-col ">
          <div className="flex flex-col items-center space-y-2 text-center">
            <Icons.logo className="h-10 w-10" />
            <h1 className="text-2xl font-bold tracking-tight">
              Sign in to your {role} account
            </h1>
            <Link
              href={"/sign-up"}
              className={buttonVariants({
                variant: "link",
                className: "gap-1",
              })}
            >
              Don&apos;t have an account? <ArrowRight className="h-4 w-4" />
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
                <Button>Sign In</Button>
              </div>
            </form>
            <div className="relative">
              <div
                aria-hidden="true"
                className="inset-0 absolute flex items-center"
              >
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  or
                </span>
              </div>
            </div>
            {isSeller ? (
              <Button
                variant="outline"
                onClick={continueAsCustomer}
                disabled={isLoading}
              >
                Continue as customer
              </Button>
            ) : (
              <Button
                variant="outline"
                disabled={isLoading}
                onClick={continueAsSeller}
              >
                Continue as a seller{" "}
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default LoginPage;
