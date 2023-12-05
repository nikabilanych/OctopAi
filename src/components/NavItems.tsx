"use client";

import { Button } from "./ui/button";
import { useState } from "react";
import { PRODUCT_CATEGORIES } from "@/config";
const NavItem = () => {
    const [open, setOpen] = useState<null|number>(null);

    return (
    <>
    <div className="flex gap-4 h-full">
        {PRODUCT_CATEGORIES.map((category,i) => {
            const handleOpen = () => {
                if (open===i){
                    setOpen(null);
                }
                else {
                    setOpen(i);
                }
            };
        return (
                <div
                    key={category.id}
                    className="flex items-center justify-center h-full cursor-pointer"
                >
                    <div
                        className="flex items-center justify-center h-full cursor-pointer"
                        onClick={handleOpen}
                    >
                        {category.label}
                    </div>
                </div>
            );
        }
        <div
            key={category.id}
            className="flex items-center justify-center h-full cursor-pointer"
        >}
    </div>
</>
  );
};
export default NavItem;


