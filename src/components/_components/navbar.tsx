import React, { useState } from "react";
import { Button } from "../ui/button";
import Wrapper from "../wrapper";
export const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-main sticky inset-x-0 top-0 z-50 h-16">
      <header className="bg-firstdark relative">
        <Wrapper>
          <div className="border-seconddark border-b">
            <div className="flex h-16 items-center">{/* TODO: MOBILE */}
            <div className="ml-4 flex lg:ml-0">

            </div>
            </div>
          </div>
        </Wrapper>
        <div className="container">
          <div className="relative -mx-4 flex items-center justify-between">
            <div className="w-60 max-w-full px-4">
              <a href="/#" className="block w-full py-5">
                <img
                  src="https://cdn.tailgrids.com/2.0/image/assets/images/logo/logo-primary.svg"
                  alt="logo"
                  className="dark:hidden"
                />
                <img
                  src="https://cdn.tailgrids.com/2.0/image/assets/images/logo/logo-white.svg"
                  alt="logo"
                  className="hidden dark:block"
                />
              </a>
            </div>
            <div className="flex w-full items-center justify-between px-4">
              <div>
                <Button
                  onClick={() => setOpen(!open)}
                  id="navbarToggler"
                  variant={"ghost"}
                  className={` ${
                    open && "navbarTogglerActive"
                  } absolute right-4 top-1/2 block -translate-y-1/2 rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden`}
                >
                  <span className="bg-body-color relative my-[6px] block h-[2px] w-[30px] dark:bg-white"></span>
                  <span className="bg-body-color relative my-[6px] block h-[2px] w-[30px] dark:bg-white"></span>
                  <span className="bg-body-color relative my-[6px] block h-[2px] w-[30px] dark:bg-white"></span>
                </Button>
                <nav
                  // :className="!navbarOpen && 'hidden' "
                  id="navbarCollapse"
                  className={`dark:bg-dark-2 absolute right-4 top-full w-full max-w-[250px] rounded-lg bg-white px-6 py-5 shadow lg:static lg:block lg:w-full lg:max-w-full lg:shadow-none lg:dark:bg-transparent ${
                    !open && "hidden"
                  } `}
                >
                  <ul className="block lg:flex">
                    <ListItem NavLink="/#">Home</ListItem>
                    <ListItem NavLink="/#">Payment</ListItem>
                    <ListItem NavLink="/#">About</ListItem>
                    <ListItem NavLink="/#">Blog</ListItem>
                  </ul>
                </nav>
              </div>
              <div className="hidden justify-end pr-16 sm:flex lg:pr-0">
                <a
                  href="/#"
                  className="text-dark px-7 py-3 text-base font-medium hover:text-primary dark:text-white"
                >
                  Sign in
                </a>

                <a
                  href="/#"
                  className="rounded-md bg-primary px-7 py-3 text-base font-medium text-white hover:bg-primary/90"
                >
                  Sign Up
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

