"use client";
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var skeleton_1 = require("./ui/skeleton");
var link_1 = require("next/link");
var ImageSlider_1 = require("./ImageSlider");
var utils_1 = require("@/lib/utils");
var config_1 = require("@/config");
var ListProduct = function (_a) {
    var _b;
    var product = _a.product, index = _a.index;
    var _c = react_1.useState(false), isVisible = _c[0], setIsVisible = _c[1];
    var label = (_b = config_1.PRODUCT_CATEGORIES.find(function (_a) {
        var value = _a.value;
        return value === (product === null || product === void 0 ? void 0 : product.category);
    })) === null || _b === void 0 ? void 0 : _b.label;
    var validUrls = product === null || product === void 0 ? void 0 : product.images.map(function (_a) {
        var image = _a.image;
        return (typeof image === "string" ? image : image.url);
    }).filter(Boolean);
    react_1.useEffect(function () {
        var timer = setTimeout(function () {
            setIsVisible(true);
        }, index * 75);
        //clear memory leaks
        return function () { return clearTimeout(timer); };
    }, [index]);
    if (!product || !isVisible) {
        return React.createElement(ProductPlaceHolder, null);
    }
    if (isVisible && product) {
        return (React.createElement(link_1["default"], { className: utils_1.cn("invisible h-full w-full cursor-pointer group-main", {
                "visible animate fade-in-5": isVisible
            }), href: "/product/" + product.id },
            React.createElement("div", { className: "flex flex-col w-full" },
                React.createElement(ImageSlider_1["default"], { urls: validUrls }),
                React.createElement("h3", { className: "mt-4 font-medium text-sm text-gray-700" }, product.name),
                React.createElement("p", { className: "mt-1 text-sm text-gray-500" }, label),
                React.createElement("p", { className: "mt-1 text-sm font-medium text-gray-900" }, utils_1.formatPrice(product.price)))));
    }
};
exports["default"] = ListProduct;
var ProductPlaceHolder = function () {
    return (React.createElement("div", { className: "flex flex-col w-full" },
        React.createElement("div", { className: " relative bg-zinc-100 aspect-square w-full overflow-hidden rounded-xl" },
            React.createElement(skeleton_1.Skeleton, { className: "w-full h-full" })),
        React.createElement(skeleton_1.Skeleton, { className: "mt-4 w-2/3 h-4 rounded-lg" }),
        React.createElement(skeleton_1.Skeleton, { className: "mt-2 w-16 h-4 rounded-lg" }),
        React.createElement(skeleton_1.Skeleton, { className: "mt-2 w-12 h-4 rounded-lg" })));
};
