"use client";
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var utils_1 = require("@/lib/utils");
var use_cart_1 = require("@/hooks/use-cart");
var button_1 = require("./ui/button");
var AddToCart = function (_a) {
    var product = _a.product;
    var _b = react_1.useState(false), isSuccess = _b[0], setIsSuccess = _b[1];
    react_1.useEffect(function () {
        var timeOut = setTimeout(function () {
            setIsSuccess(false);
        }, 2000);
        return function () {
            clearTimeout(timeOut);
        };
    }, []);
    var addItem = use_cart_1.useCart().addItem;
    return (React.createElement(button_1.Button, { size: "lg", variant: "outline", className: utils_1.cn("w-full", isSuccess ? "bg-fuchsia-500/90 text-white" : ""), onClick: function () {
            addItem(product);
            setIsSuccess(true);
        } }, isSuccess ? "Added to cart" : "Add to cart"));
};
exports["default"] = AddToCart;
