"use client";
import Link from "next/link";
import React from "react";
import { ShoppingBag } from "lucide-react";
import CartItems from "./CartItems";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { formatPrice } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { Icons } from "./Icons";

const Cart = () => {
  let itemCount = 0;
  return (
    <Sheet>
      <SheetTrigger className="group m-2 flex items-center p-2">
        <ShoppingBag className="h-6 w-6 flex-shrink-0 text-black group-hover:text-gray-100/60" />
        <span className="ml-2 text-sm font-medium text-black group-hover:text-gray-100/60"></span>
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
                  <Link
                    href={"/cart"}
                    className={buttonVariants({ className: "w-full" })}
                  >
                    Continue to Checkout
                  </Link>
                </SheetTrigger>
              </SheetFooter>
            </div>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center space-y-1">
            <div
              className="relative mb-4 h-[115px] w-[200px] text-muted-foreground"
              aria-hidden="true"
            >
              <Icons.cecilian />
            </div>
            <div className="text-xl font-semibold">Your cart is empty</div>
            <SheetTrigger asChild>
              <Link
                href={"/products"}
                className={buttonVariants({
                  variant: "link",
                  size: "sm",
                  className: "w-full text-sm text-muted-foreground",
                })}
              >
                Continue shopping
              </Link>
            </SheetTrigger>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
