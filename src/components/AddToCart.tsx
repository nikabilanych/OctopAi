"use client";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

import { Button } from "./ui/button";
const AddToCart = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  useEffect(() => {
    const timeOut = setTimeout(() => {
      setIsSuccess(false);
    }, 2000);
    return () => {
      clearTimeout(timeOut);
    };
  }, []);

  return (
    <Button
      size={"lg"}
      variant="outline"
      className={cn("w-full", isSuccess ? "bg-fuchsia-500/90 text-white" : "")}
      onClick={() => setIsSuccess(true)}
    >
      {isSuccess ? "Added to cart" : "Add to cart"}
    </Button>
  );
};

export default AddToCart;
