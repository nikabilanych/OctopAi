"use client";
import { Icons } from "@/components/Icons";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { useForm } from "react-hook-form"; //useForm from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";


import { authCredentials, authCredentialsType } from "@/lib/validators/account-validator";

const Page = () => {
  const { register, handleSubmit, formState: { errors }}= useForm<authCredentialsType>({
  resolver: zodResolver(authCredentials)
});

//send data to server
const onSubmit = ({email,password}:authCredentialsType)=>{
}
    return (
        <>
        <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
        <div className="mx-auto w-full justify-center space-y-6 sm:w-[350px] flex flex-col ">
        <div className="flex flex-col items-center space-y-2 text-center">
            <Icons.logo className="h-10 w-10"/>
            <h1 className="text-2xl font-bold tracking-tight">
                Create an account
            </h1>
          <Link href={"/sign-in"} className={buttonVariants({variant:"link", className:"gap-1"})}>
            Already have an account? Sign in
            <ArrowRight className="h-4 w-4"/>
          </Link>
        </div >
        <div className="grid gap-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-2">
            <div className="grid gap-1 py-2">
              <Label htmlFor='email' className="ml-2 mb-1">Email</Label>
              <Input {...register("email")}className={cn({"focus-visible:ring-fuchsia-500/50":errors.email,})} placeholder="johndoe@me.com">
              </Input>
            </div>          

            <div className="grid gap-1 py-2">
              <Label htmlFor='email' className="ml-2 mb-1">Password</Label>
              <Input {...register("password")}className={cn({"focus-visible:ring-fuchsia-500/50":errors.password,})} placeholder="password">
              </Input>
            </div>          
        <Button type="submit" {...handleSubmit} className="w-full">Create account</Button>
          </div>          
         
  </form>

        </div>

        </div>
        </div>
        </>
    );
  };
export default Page 