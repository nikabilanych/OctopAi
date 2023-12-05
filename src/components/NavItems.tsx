"use client";
import NavItem from "./NavItem";
import { Button } from "./ui/button";
import { useState } from "react";
import { PRODUCT_CATEGORIES } from "@/config";
const NavItems = () => {
  const [activeIndex, setActiveIndex] = useState<null | number>(null);
  const isAnyOpen = activeIndex !== null;
  return (
    <>
      <div className="flex h-full gap-4">
        {PRODUCT_CATEGORIES.map((category, i) => {
          const handleOpen = () => {
            if (activeIndex === i) {
              setActiveIndex(null);
            } else {
              setActiveIndex(i);
            }
          };
          const isOpen = i === activeIndex;
          return (
            <NavItem
              key={category.value}
              category={category}
              isOpen={isOpen}
              handleOpen={handleOpen}
              isAnyOpen={isAnyOpen}
            />
          );
        })}
      </div>
    </>
  );
};
export default NavItems;
