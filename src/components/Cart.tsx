"use client";
import Link from "next/link";
import React from "react";
import { ShoppingBag } from "lucide-react";
import CartItems from "./CartItems";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

const Cart = () => {
  let itemCount = 0;
  return (
    <Sheet>
      <SheetTrigger asChild className="group m-2 flex items-center p-2">
        <ShoppingBag className="h-6 w-6 flex-shrink-0 text-white group-hover:text-white/60" />
        <span className="text-white/ ml-2 text-sm font-medium group-hover:text-white/60"></span>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
        <SheetHeader className="space-y-3 pr-6">
          <SheetTitle className="text-lg font-semibold">Cart(0)</SheetTitle>
        </SheetHeader>
        {/* <CartItems items={items} /> */}
        {itemCount > 0 ? (
          <>
            <div className="flex w-full flex-col pr-6">
              {/* <CartItems items={itemCount} /> */}
              Cart Items
            </div>
            <div className="space-y-4 pr-6">
              <Separator />
              <div className="space-y-2 text-sm">
                <div className="flex">
                  <span className="flex-1">Shipping</span>
                  <span>Free </span>
                </div>
                <div className="flex">
                  <span className="flex-1">Transaction Fee </span>
                  <span>{formatPrice(0)} </span>
                </div>
                {/* </div>
              <Separator /> */}
                <div className="flex">
                  <span className="flex-1">Total</span>
                  <span>{formatPrice(0)}</span>
                </div>
              </div>
              <SheetFooter>
                <SheetTrigger asChild>
                  <Button asChild variant={"ghost"} className="w-full">
                    <Link href={"/cart"}>Continue to Checkout</Link>
                  </Button>
                </SheetTrigger>
              </SheetFooter>
            </div>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center space-y-1">
            <div
              className="relative mb-4 h-60 w-60 text-muted-foreground"
              aria-hidden="true"
            >
              <Image
                src={"/octopai.png"}
                alt="empty cart octopus"
                fill
                className="h-full w-full"
              />
              <div className="text-xl font-semibold">Your cart is empty</div>
              <SheetTrigger asChild>
                <Button
                  asChild
                  variant={"link"}
                  className="w-full text-sm text-muted-foreground"
                  size={"sm"}
                >
                  <Link href={"/products"}>Continue shopping</Link>
                </Button>
                <div></div>
              </SheetTrigger>
            </div>
          </div>
        )}

        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
