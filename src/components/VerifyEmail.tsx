"use client";
import { trpc } from "@/trpc/client";
import Link from "next/link";
import React from "react";
import { Loader2, XCircle } from "lucide-react";
import { buttonVariants } from "./ui/button";
import { Icons } from "./Icons";

interface VerifyEmailProps {
  token: string;
}
const VerifyEmail = ({ token }: VerifyEmailProps) => {
  const { data, isLoading, isError } = trpc.auth.verifyEmail.useQuery({
    token,
  });
  if (isError) {
    return (
      <div className="flex flex-col items-center gap-2">
        <XCircle className="h-8 w-8 text-red-700 " />
        <h3 className="font-semibold text-xl">There was a problem</h3>
        <p className="text-muted-foreground text-sm">
          This token is not valid or might have expired. Please try again.
        </p>
      </div>
    );
  }
  if (data?.success) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <div className="relative mb-4 h-60 w-60 text-muted-foreground">
          <Icons.logo />
        </div>
        <h3 className="font-semibold text-2xl">You&apos;re all set!</h3>
        <p className="text-muted-foreground mt-2 text-center">
          You&apos;ve successfully verified your email.
        </p>
        <Link href="/login" className={buttonVariants({ className: "mt-4" })}>
          Sign in
        </Link>
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className="flex flex-col items-center gap-2">
        <Loader2 className=" animate-spin h-8 w-8 text-fuchsia-700/70 " />
        <h3 className="font-semibold text-xl">Verifying...</h3>
        <p className="text-muted-foreground text-sm">
          This won&apos;t take long.
        </p>
      </div>
    );
  }
};

export default VerifyEmail;
