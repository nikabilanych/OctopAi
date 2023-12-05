import React from "react";

import Wrapper from "./wrapper";
import Link from "next/link";
import { Icons } from "./Icons";
import NavItems from "./NavItems";
const Navbar = () => {
  return (
    <div className="bg-main sticky inset-x-0 top-0 z-50 h-16">
      <header className="bg-firstdark relative">
        <Wrapper>
          <div className="border-seconddark border-b">
            <div className="flex h-16 items-center">
              {/* TODO: MOBILE */}
              <div className="ml-4 flex lg:ml-0">
                <Link href={"/"}>
                  <Icons.logo className="h-12 w-12" />
                </Link>
              </div>
              <div className="z-50 hidden lg:ml-8 lg:block lg:self-stretch">
                <NavItems />
              </div>
            </div>
          </div>
        </Wrapper>
      </header>
    </div>
  );
};
export default Navbar;
