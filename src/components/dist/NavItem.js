"use strict";
exports.__esModule = true;
var react_1 = require("react");
var button_1 = require("./ui/button");
var image_1 = require("next/image");
var utils_1 = require("@/lib/utils");
var lucide_react_1 = require("lucide-react");
var NavItem = function (_a) {
    var category = _a.category, isOpen = _a.isOpen, handleOpen = _a.handleOpen, isAnyOpen = _a.isAnyOpen;
    return (react_1["default"].createElement("div", { className: "flex" },
        react_1["default"].createElement("div", { className: "relative flex items-center" },
            react_1["default"].createElement(button_1.Button, { variant: isOpen ? "secondary" : "ghost", onClick: handleOpen, className: "gap-1.5 " },
                category.label,
                react_1["default"].createElement(lucide_react_1.ChevronDown, { className: utils_1.cn("h-4 w-4 text-muted-foreground transition-all", {
                        "-rotate-180": isOpen
                    }) }))),
        isOpen ? (react_1["default"].createElement("div", { className: utils_1.cn("absolute inset-x-0 top-full text-sm text-muted-foreground", {
                "animate-in fade-in-10 slide-in-from-top-5": !isAnyOpen
            }) },
            react_1["default"].createElement("div", { className: "absolute inset-0 top-1/2 bg-white shadow", "aria-hidden": "true" }),
            react_1["default"].createElement("div", { className: "relative bg-white" },
                react_1["default"].createElement("div", { className: "mx-auto max-w-7xl px-8" },
                    react_1["default"].createElement("div", { className: "grid grid-cols-4 gap-x-4 gap-y-10 py-16" },
                        react_1["default"].createElement("div", { className: "col-span-4 col-start-1 grid grid-cols-3 gap-x-8 gap-y-10 py-16" }, category.featured.map(function (item) { return (react_1["default"].createElement("div", { key: item.name, className: "group relative text-base sm:text-sm" },
                            react_1["default"].createElement("div", { className: "relative aspect-video overflow-hidden rounded-lg bg-gray-50 group-hover:opacity-80 " },
                                react_1["default"].createElement(image_1["default"], { src: item.imageSrc, alt: "product category img", fill: true, className: "object-cover object-center" })),
                            react_1["default"].createElement(lucide_react_1.Link, { href: "{item.href}", className: "text-pyrply mt-6 block font-medium" }, item.name),
                            react_1["default"].createElement("p", { className: "mt-1", "aria-hidden": "true" }, "Shop now"))); }))))))) : null));
};
exports["default"] = NavItem;
