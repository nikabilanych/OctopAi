"use client";
import NavItem from "./NavItem";
import { useOnClickOutside } from "@/hooks/use-on-click-outside";
import { useEffect, useRef, useState } from "react";
import { PRODUCT_CATEGORIES } from "@/config";
const NavItems = () => {
  const [activeIndex, setActiveIndex] = useState<null | number>(null);
  const isAnyOpen = activeIndex !== null;
  //will be type of an Div element
  // needs to be assigned to corresponding el as "ref"
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveIndex(null);
      }
    };

    document.addEventListener("keydown", handler);
  });
  //close the tab if user clicks outside
  useOnClickOutside(navRef, () => setActiveIndex(null));
  return (
    <>
      <div className="flex h-full gap-4" ref={navRef}>
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
