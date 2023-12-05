import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { PRODUCT_CATEGORIES } from "@/config";
import { cn } from "@/lib/utils";
import { ChevronDown, Link } from "lucide-react";
type Category = (typeof PRODUCT_CATEGORIES)[number];

interface NavItemProps {
  category: Category;
  isOpen: boolean;
  handleOpen: () => void; //cannot be boolean, on click it changes -> therefore an anonymous function
  isAnyOpen: boolean;
}

const NavItem = ({ category, isOpen, handleOpen, isAnyOpen }: NavItemProps) => {
  return (
    <div className="flex">
      <div className="relative flex items-center">
        <Button
          variant={isOpen ? "secondary" : "ghost"}
          onClick={handleOpen}
          className="gap-2 "
        >
          {category.label}
          <ChevronDown
            className={cn("h-4 w-4 text-muted-foreground transition-all", {
              "-rotate-100": isOpen,
            })}
          />
        </Button>
      </div>
      {isOpen ? (
        <div
          className={cn(
            "absolute inset-x-0 top-full text-sm text-muted-foreground",
            {
              "animate-in fade-in-10 slide-in-from-top-5": !isAnyOpen,
            },
          )}
        >
          <div
            className="bg-firstdark absolute inset-0 top-1/2 shadow"
            aria-hidden="true"
          />
          <div className="bg-firstdark relative">
            <div className="mx-auto max-w-7xl px-8">
              <div className="grid grid-cols-4 gap-x-4 gap-y-10 py-16">
                <div className="col-span-4 col-start-1 grid grid-cols-3 gap-x-8 gap-y-10 py-16">
                  {category.featured.map((item)=> (
                    <div key={item.name} className="group relative text-base sm:text-sm">

                      <div className="relative aspect-video overflow-hidden rounded-lg bg-gray-50 group-hover:opacity-80 ">
                        <Image src={item.imageSrc} alt="product category img" fill className="object-cover object-center"/>
                      </div>
                      <Link href="{item.href}" className="mt-6 block font-medium text-pyrply">
                        {item.name}
                      </Link>
                      <p className="mt-1" aria-hidden="true">Shop now</p>
                      </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default NavItem;
