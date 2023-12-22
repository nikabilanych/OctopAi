"use client";
"use strict";
exports.__esModule = true;
var link_1 = require("next/link");
var react_1 = require("react");
var client_1 = require("@/trpc/client");
var ListProduct_1 = require("./ListProduct");
var FALLBACK_LIMIT = 4;
var ProductReel = function (props) {
    var _a, _b;
    //destructure the title
    var title = props.title, subtitle = props.subtitle, href = props.href, query = props.query;
    //querying
    var _c = client_1.trpc.products.getInfiniteProducts.useInfiniteQuery({ limit: (_a = query.limit) !== null && _a !== void 0 ? _a : FALLBACK_LIMIT, query: query }, {
        getNextPageParam: function (lastPage) { return lastPage.nextPage; }
    }), queryData = _c.data, isLoading = _c.isLoading;
    // displaying
    // flattened map
    var products = (queryData === null || queryData === void 0 ? void 0 : queryData.pages.flatMap(function (page) { return page.products; })) || [];
    var map = [];
    if (products && products.length) {
        map = products;
    }
    else if (isLoading) {
        map = new Array((_b = query.limit) !== null && _b !== void 0 ? _b : FALLBACK_LIMIT).fill(null);
    }
    return (react_1["default"].createElement("section", { className: "py-12" },
        react_1["default"].createElement("div", { className: "md:flex md:items-center md:justify-between mb-4" },
            react_1["default"].createElement("div", { className: "max-w-2xl lg:max-w-4xl px-4 lg:px-0" },
                title ? (react_1["default"].createElement("h1", { className: "text-2x1 font-bold text-gray-900 sm:text-3x1" }, title)) : null,
                subtitle ? (react_1["default"].createElement("p", { className: "mt-2 text-sm text-muted-foreground" }, subtitle)) : null),
            href ? (react_1["default"].createElement(link_1["default"], { href: href, className: "hidden md:block text-sm font-medium text-pyrply hover:text-purple-500" },
                "Shop the collection",
                "  ",
                react_1["default"].createElement("span", { "aria-hidden": "true" }, "\u2192"))) : null),
        react_1["default"].createElement("div", { className: "relative" },
            react_1["default"].createElement("div", { className: "mt-6 flex items-center w-full" },
                react_1["default"].createElement("div", { className: "w-full grid grid-cols-2 gap-x-4 gay-y-10 sm:gap-x-6 md:gril-cols-4 md:gap-y-10 lg:gap-x-8" }, map.map(function (product, index) { return (react_1["default"].createElement(ListProduct_1["default"], { product: product, index: index, key: "product-" + index })); }))))));
};
exports["default"] = ProductReel;
