"use strict";
exports.__esModule = true;
var react_1 = require("react");
var image_1 = require("next/image");
var lucide_react_1 = require("lucide-react");
var config_1 = require("@/config");
var use_cart_1 = require("@/hooks/use-cart");
var utils_1 = require("@/lib/utils");
var CartItem = function (_a) {
    var _b;
    var product = _a.product;
    var image = product.images[0].image;
    var label = (_b = config_1.PRODUCT_CATEGORIES.find(function (_a) {
        var value = _a.value;
        return value === (product === null || product === void 0 ? void 0 : product.category);
    })) === null || _b === void 0 ? void 0 : _b.label;
    var removeItem = use_cart_1.useCart().removeItem;
    return (react_1["default"].createElement("div", { className: "space-y-3 py-2" },
        react_1["default"].createElement("div", { className: "flex items-start justify-between gap-4" },
            react_1["default"].createElement("div", { className: "flex items-center space-x-4" },
                react_1["default"].createElement("div", { className: "relative aspect-square h-16 w-16 overflow-hidden rounded min-w-fit" }, typeof image !== "string" && image.url ? (react_1["default"].createElement(image_1["default"], { alt: "Product image", src: image.url, fill: true, className: "absolute object-cover" })) : (react_1["default"].createElement("div", { className: "flex h-full items-center justify-center bg-secondary" },
                    react_1["default"].createElement(lucide_react_1.ImageIcon, { "aria-hidden": true, className: "h-4 w-4 text-muted-foreground" })))),
                react_1["default"].createElement("div", { className: "flex flex-col self-start" },
                    react_1["default"].createElement("span", { className: "text-sm font-medium mb-1 line-clamp-1" }, product.name),
                    react_1["default"].createElement("span", { className: "line-clamp-1 text-xs capitalize text-muted-foreground" }, label),
                    react_1["default"].createElement("div", { className: "mt-4 text-xs text-muted-foreground" },
                        react_1["default"].createElement("button", { onClick: function () { return removeItem(product.id); }, className: "flex items-center gap-0.5" },
                            react_1["default"].createElement(lucide_react_1.X, { className: "h-3 w-3" }),
                            " remove")))),
            react_1["default"].createElement("div", { className: "flex flex-col space-y-1 font-medium" },
                react_1["default"].createElement("span", { className: "ml-auto line-clamp-1 text-sm" }, utils_1.formatPrice(product.price))))));
};
exports["default"] = CartItem;
