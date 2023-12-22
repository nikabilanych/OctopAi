"use client";
"use strict";
exports.__esModule = true;
var button_1 = require("./ui/button");
var dropdown_menu_1 = require("./ui/dropdown-menu");
var link_1 = require("next/link");
var use_auth_1 = require("@/hooks/use-auth");
var UserAccountNav = function (_a) {
    var user = _a.user;
    var signOut = use_auth_1.useAuth().signOut;
    return (React.createElement(dropdown_menu_1.DropdownMenu, null,
        React.createElement(dropdown_menu_1.DropdownMenuTrigger, { asChild: true, className: "overflow-visible" },
            React.createElement(button_1.Button, { variant: "ghost", className: "relative" }, "My account")),
        React.createElement(dropdown_menu_1.DropdownMenuContent, { className: "bg-white w-60", align: "end" },
            React.createElement("div", { className: "flex items-center justify-start gap-2 p-2" },
                React.createElement("div", { className: "flex flex-col space-y-0.5 leading-none" },
                    React.createElement("p", { className: "font-medium text-sm text-black" }, user.email))),
            React.createElement(dropdown_menu_1.DropdownMenuSeparator, null),
            React.createElement(dropdown_menu_1.DropdownMenuItem, { asChild: true },
                React.createElement(link_1["default"], { href: "/sell" }, "Seller Dashboard")),
            React.createElement(dropdown_menu_1.DropdownMenuItem, { onClick: signOut, className: "cursor-pointer" }, "Log out"))));
};
exports["default"] = UserAccountNav;
