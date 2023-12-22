"use strict";
exports.__esModule = true;
var react_1 = require("react");
var utils_1 = require("@/lib/utils");
var Wrapper = function (_a) {
    var children = _a.children, className = _a.className;
    return (react_1["default"].createElement("div", { className: utils_1.cn("mx-auto w-full max-w-screen-xl px-2.5 md:px-20", className) }, children));
};
exports["default"] = Wrapper;
