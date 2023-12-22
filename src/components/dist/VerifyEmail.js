"use client";
"use strict";
exports.__esModule = true;
var client_1 = require("@/trpc/client");
var link_1 = require("next/link");
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
var button_1 = require("./ui/button");
var VerifyEmail = function (_a) {
    var token = _a.token;
    var _b = client_1.trpc.auth.verifyEmail.useQuery({
        token: token
    }), data = _b.data, isLoading = _b.isLoading, isError = _b.isError;
    if (isError) {
        return (react_1["default"].createElement("div", { className: "flex flex-col items-center gap-2" },
            react_1["default"].createElement(lucide_react_1.XCircle, { className: "h-8 w-8 text-red-700 " }),
            react_1["default"].createElement("h3", { className: "font-semibold text-xl" }, "There was a problem"),
            react_1["default"].createElement("p", { className: "text-muted-foreground text-sm" }, "This token is not valid or might have expired. Please try again.")));
    }
    if (data === null || data === void 0 ? void 0 : data.success) {
        return (react_1["default"].createElement("div", { className: "flex flex-col items-center justify-center h-full" },
            react_1["default"].createElement("div", { className: "relative mb-4 h-60 w-60 text-muted-foreground" }),
            react_1["default"].createElement("h3", { className: "font-semibold text-2xl" }, "You're all set!"),
            react_1["default"].createElement("p", { className: "text-muted-foreground mt-2 text-center" }, "You've successfully verified your email."),
            react_1["default"].createElement(link_1["default"], { href: "/sign-in", className: button_1.buttonVariants({ className: "mt-4" }) }, "Sign in")));
    }
    if (isLoading) {
        return (react_1["default"].createElement("div", { className: "flex flex-col items-center gap-2" },
            react_1["default"].createElement(lucide_react_1.Loader2, { className: " animate-spin h-8 w-8 text-fuchsia-700/70 " }),
            react_1["default"].createElement("h3", { className: "font-semibold text-xl" }, "Verifying..."),
            react_1["default"].createElement("p", { className: "text-muted-foreground text-sm" }, "This won't take long.")));
    }
};
exports["default"] = VerifyEmail;
