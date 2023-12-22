"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var UserAccountNav_1 = require("./UserAccountNav");
var react_1 = require("react");
var button_1 = require("./ui/button");
var Wrapper_1 = require("./Wrapper");
var link_1 = require("next/link");
var Icons_1 = require("./Icons");
var Cart_1 = require("./Cart");
var NavItems_1 = require("./NavItems");
var payload_utils_1 = require("@/lib/payload-utils");
var headers_1 = require("next/headers");
var Navbar = function () { return __awaiter(void 0, void 0, void 0, function () {
    var nextCookies, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                nextCookies = headers_1.cookies();
                return [4 /*yield*/, payload_utils_1.getServerSideUser(nextCookies)];
            case 1:
                user = (_a.sent()).user;
                return [2 /*return*/, (react_1["default"].createElement("div", { className: "sticky text-black inset-x-0 top-0 z-50 h-16 bg-white" },
                        react_1["default"].createElement("header", { className: "relative bg-white" },
                            react_1["default"].createElement(Wrapper_1["default"], null,
                                react_1["default"].createElement("div", { className: "border-b border-gray-200" },
                                    react_1["default"].createElement("div", { className: "flex h-16 items-center" },
                                        react_1["default"].createElement("div", { className: "ml-4 flex lg:ml-0" },
                                            react_1["default"].createElement(link_1["default"], { href: "/" },
                                                react_1["default"].createElement(Icons_1.Icons.logo, { className: "h-10 w-10 hover:transform hover:scale-105 hover:contrast-75" }))),
                                        react_1["default"].createElement("div", { className: "z-50 hidden lg:ml-8 lg:block lg:self-stretch" },
                                            react_1["default"].createElement(NavItems_1["default"], null)),
                                        react_1["default"].createElement("div", { className: "ml-auto flex items-center" },
                                            react_1["default"].createElement("div", { className: "hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6" },
                                                user ? null : (react_1["default"].createElement(button_1.Button, { variant: "ghost", asChild: true },
                                                    react_1["default"].createElement(link_1["default"], { href: "/sign-in", className: "text-sm font-medium" }, "Sign in"))),
                                                user ? null : (react_1["default"].createElement("span", { "area-hidden": "true", className: "h-6 w-px bg-gray-200" })),
                                                user ? (react_1["default"].createElement("p", null,
                                                    react_1["default"].createElement(UserAccountNav_1["default"], { user: user }))) : (react_1["default"].createElement(button_1.Button, { asChild: true, variant: "ghost" },
                                                    react_1["default"].createElement(link_1["default"], { href: "/sign-up", className: "text-sm font-medium" }, "Create an account"))),
                                                user ? (react_1["default"].createElement("span", { "area-hidden": "true", className: "h-6 w-px bg-gray-200" })) : null,
                                                user ? (react_1["default"].createElement(button_1.Button, { variant: "ghost", asChild: true },
                                                    react_1["default"].createElement(link_1["default"], { href: "/dashboard", className: "text-sm font-medium" }, "Dashboard"))) : null,
                                                user ? (react_1["default"].createElement("span", { "area-hidden": "true", className: "h-6 w-px bg-gray-200" })) : null,
                                                user ? null : (react_1["default"].createElement("div", { className: "flex lg:ml-6" },
                                                    react_1["default"].createElement("span", { className: "h-6 w-px bg-gray-200", "aria-hidden": "true" }))),
                                                react_1["default"].createElement("div", { className: "ml-4 flow-root lg:ml-6" },
                                                    react_1["default"].createElement(Cart_1["default"], null))))))))))];
        }
    });
}); };
exports["default"] = Navbar;
