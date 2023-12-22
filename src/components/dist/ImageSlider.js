"use client";
"use strict";
exports.__esModule = true;
var image_1 = require("next/image");
var react_1 = require("react");
var react_2 = require("swiper/react");
var modules_1 = require("swiper/modules");
require("swiper/css");
var utils_1 = require("@/lib/utils");
require("swiper/css/pagination");
var lucide_react_1 = require("lucide-react");
var ImageSlider = function (_a) {
    var _b, _c;
    var _d;
    var urls = _a.urls;
    var _e = react_1.useState(null), swiper = _e[0], setSwiper = _e[1];
    var _f = react_1.useState(0), activeIndex = _f[0], setActiveIndex = _f[1];
    var _g = react_1.useState({
        isBeginning: true,
        isEnd: activeIndex === ((_d = urls === null || urls === void 0 ? void 0 : urls.length) !== null && _d !== void 0 ? _d : 0) - 1
    }), slideConfig = _g[0], setSlideConfig = _g[1];
    react_1.useEffect(function () {
        swiper === null || swiper === void 0 ? void 0 : swiper.on("slideChange", function (_a) {
            var _b;
            var activeIndex = _a.activeIndex;
            setActiveIndex(activeIndex);
            setSlideConfig({
                isBeginning: activeIndex === 0,
                isEnd: activeIndex === ((_b = urls === null || urls === void 0 ? void 0 : urls.length) !== null && _b !== void 0 ? _b : 0) - 1
            });
        });
    }, [swiper, urls]);
    //set swiper state
    var activeStyles = "active:scale-[0.97] grid opacity-100 hover:scale-105 absolute top-1/2 -translate-y-1/2 aspect-square w-8 h-8 z-50 border-2 bg-white border-zinc-300 place-items-center rounded-full";
    var inactiveStyles = "hidden text-gray-400";
    return (React.createElement("div", { className: "group relative bg-zinc-100 aspect-square overflow-hidden rounded-xl" },
        React.createElement("div", { className: "absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition" },
            React.createElement("button", { onClick: function (event) {
                    event.preventDefault();
                    swiper === null || swiper === void 0 ? void 0 : swiper.slideNext();
                }, className: utils_1.cn(activeStyles, "right-3 transition", (_b = {},
                    _b[inactiveStyles] = slideConfig.isEnd,
                    _b["hover:bg-primary-300 text-primary-800 opacity-100"] = !slideConfig.isEnd,
                    _b)), "aria-label": "next image" },
                React.createElement(lucide_react_1.ChevronRight, { className: "h-4 w-4 text-zinc-700" })),
            React.createElement("button", { onClick: function (event) {
                    event.preventDefault();
                    swiper === null || swiper === void 0 ? void 0 : swiper.slidePrev();
                }, className: utils_1.cn(activeStyles, "left-3 transition", (_c = {},
                    _c[inactiveStyles] = slideConfig.isBeginning,
                    _c["hover:bg-primary-300 text-primary-800 opacity-100"] = !slideConfig.isBeginning,
                    _c)), "aria-label": "previous image" },
                React.createElement(lucide_react_1.ChevronLeft, { className: "h-4 w-4 text-zinc-700" }))),
        React.createElement(react_2.Swiper, { pagination: {
                renderBullet: function (_, className) {
                    return "<span class=\"rounded-full transition " + className + "\"></span>";
                }
            }, onSwiper: function (swiper) { return setSwiper(swiper); }, spaceBetween: 50, slidesPerView: 1, modules: [modules_1.Pagination], className: "w-full h-full" }, urls === null || urls === void 0 ? void 0 : urls.map(function (url, index) { return (React.createElement(react_2.SwiperSlide, { key: index, className: "-z-10 relative h-full w-full" },
            React.createElement(image_1["default"], { fill: true, loading: "eager", className: "-z-10 h-full w-full object-cover object-center", src: url, alt: "Product image" }))); }))));
};
exports["default"] = ImageSlider;
