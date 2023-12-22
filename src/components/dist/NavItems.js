"use client";
"use strict";
exports.__esModule = true;
var NavItem_1 = require("./NavItem");
var use_on_click_outside_1 = require("@/hooks/use-on-click-outside");
var react_1 = require("react");
var config_1 = require("@/config");
var NavItems = function () {
    var _a = react_1.useState(null), activeIndex = _a[0], setActiveIndex = _a[1];
    var isAnyOpen = activeIndex !== null;
    //will be type of an Div element
    // needs to be assigned to corresponding el as "ref"
    var navRef = react_1.useRef(null);
    react_1.useEffect(function () {
        var handler = function (event) {
            if (event.key === "Escape") {
                setActiveIndex(null);
            }
        };
        document.addEventListener("keydown", handler);
    });
    //close the tab if user clicks outside
    use_on_click_outside_1.useOnClickOutside(navRef, function () { return setActiveIndex(null); });
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "flex h-full gap-4", ref: navRef }, config_1.PRODUCT_CATEGORIES.map(function (category, i) {
            var handleOpen = function () {
                if (activeIndex === i) {
                    setActiveIndex(null);
                }
                else {
                    setActiveIndex(i);
                }
            };
            var isOpen = i === activeIndex;
            return (React.createElement(NavItem_1["default"], { key: category.value, category: category, isOpen: isOpen, handleOpen: handleOpen, isAnyOpen: isAnyOpen }));
        }))));
};
exports["default"] = NavItems;
