"use client";
"use strict";
exports.__esModule = true;
var link_1 = require("next/link");
var react_1 = require("react");
var react_2 = require("react");
var lucide_react_1 = require("lucide-react");
var CartItem_1 = require("./CartItem");
var sheet_1 = require("@/components/ui/sheet");
var utils_1 = require("@/lib/utils");
var button_1 = require("@/components/ui/button");
var separator_1 = require("@/components/ui/separator");
var use_cart_1 = require("@/hooks/use-cart");
var Icons_1 = require("./Icons");
var Cart = function () {
    var fee = 1;
    var items = use_cart_1.useCart().items;
    var itemCount = items.length;
    //reduce -> total by default starts at 0
    var cartTotal = items.reduce(function (total, _a) {
        var product = _a.product;
        return total + product.price;
    }, 0);
    var _a = react_2.useState(false), isMounted = _a[0], setIsMounted = _a[1];
    react_2.useEffect(function () {
        setIsMounted(true);
    }, []);
    return (react_1["default"].createElement(sheet_1.Sheet, null,
        react_1["default"].createElement(sheet_1.SheetTrigger, { className: "group m-2 hover:transform hover:scale-110 flex items-center p-2" },
            react_1["default"].createElement(lucide_react_1.ShoppingBag, { className: "h-6 w-6  flex-shrink-0 text-black group-hover:text-[#780f9b]/80" }),
            react_1["default"].createElement("span", { className: "ml-2 text-sm font-medium text-black group-hover:text-[#780f9b]/80" }, isMounted ? itemCount : 0)),
        react_1["default"].createElement(sheet_1.SheetContent, { className: "flex w-full flex-col pr-0 sm:max-w-lg" },
            react_1["default"].createElement(sheet_1.SheetHeader, { className: "space-y-3 pr-6" },
                react_1["default"].createElement(sheet_1.SheetTitle, { className: "text-lg font-semibold" },
                    "Cart(",
                    itemCount,
                    ")")),
            itemCount > 0 ? (react_1["default"].createElement(react_1["default"].Fragment, null,
                react_1["default"].createElement("div", { className: "flex w-full flex-col pr-6" }, items.map(function (_a) {
                    var product = _a.product;
                    return (react_1["default"].createElement(CartItem_1["default"], { key: product.id, product: product }));
                })),
                react_1["default"].createElement("div", { className: "space-y-4 pr-6" },
                    react_1["default"].createElement(separator_1.Separator, null),
                    react_1["default"].createElement("div", { className: "space-y-2 text-sm" },
                        react_1["default"].createElement("div", { className: "flex" },
                            react_1["default"].createElement("span", { className: "flex-1" }, "Shipping"),
                            react_1["default"].createElement("span", null, "Free ")),
                        react_1["default"].createElement("div", { className: "flex" },
                            react_1["default"].createElement("span", { className: "flex-1" }, "Transaction Fee "),
                            react_1["default"].createElement("span", null,
                                utils_1.formatPrice(fee),
                                " ")),
                        react_1["default"].createElement("div", { className: "flex" },
                            react_1["default"].createElement("span", { className: "flex-1" }, "Total"),
                            react_1["default"].createElement("span", null, utils_1.formatPrice(cartTotal + fee)))),
                    react_1["default"].createElement(sheet_1.SheetFooter, null,
                        react_1["default"].createElement(sheet_1.SheetTrigger, { asChild: true },
                            react_1["default"].createElement(link_1["default"], { href: "/cart", className: button_1.buttonVariants({ className: "w-full" }) }, "Continue to Checkout")))))) : (react_1["default"].createElement("div", { className: "flex h-full flex-col items-center justify-center space-y-1" },
                react_1["default"].createElement("div", { className: "relative mb-4 h-[115px] w-[200px] text-muted-foreground", "aria-hidden": "true" },
                    react_1["default"].createElement(Icons_1.Icons.cecilian, null)),
                react_1["default"].createElement("div", { className: "text-xl font-semibold" }, "Your cart is empty"),
                react_1["default"].createElement(sheet_1.SheetTrigger, { asChild: true },
                    react_1["default"].createElement(link_1["default"], { href: "/products", className: button_1.buttonVariants({
                            variant: "link",
                            size: "sm",
                            className: "w-full text-sm text-muted-foreground"
                        }) }, "Continue shopping")))))));
};
exports["default"] = Cart;
