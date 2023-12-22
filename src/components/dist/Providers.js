'use client';
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var react_1 = require("react");
var react_query_1 = require("@tanstack/react-query");
var client_1 = require("@/trpc/client");
var client_2 = require("@trpc/client");
var Providers = function (_a) {
    var children = _a.children;
    var queryClient = react_1.useState(function () { return new react_query_1.QueryClient(); })[0];
    var trpcClient = react_1.useState(function () {
        return client_1.trpc.createClient({
            links: [
                client_2.httpBatchLink({
                    url: process.env.NEXT_PUBLIC_SERVER_URL + "/api/trpc",
                    fetch: function (url, options) {
                        return fetch(url, __assign(__assign({}, options), { credentials: 'include' }));
                    }
                }),
            ]
        });
    })[0];
    return (React.createElement(client_1.trpc.Provider, { client: trpcClient, queryClient: queryClient },
        React.createElement(react_query_1.QueryClientProvider, { client: queryClient }, children)));
};
exports["default"] = Providers;
