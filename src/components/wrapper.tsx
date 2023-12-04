import React from "react";
import { cn } from "@/lib/utils";
const Wrapper = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn("py-20 flex flex-colmx-auto w-full max-w-screen-xl px-4 md:px-20", className)}
    >
      {children}
    </div>
  );
};
export default Wrapper;

