import React from "react";
import { Button } from "./ui/button";

import { PRODUCT_CATEGORIES } from "@/config";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
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
    </div>
  );
};

export default NavItem;
