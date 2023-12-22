"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = void 0;
// 2.step
// backend of the application
// router for defining custom api endpoints
var trpc_1 = require("./trpc");
var auth_router_1 = require("./auth-router");
var product_router_1 = require("./product-router");
var checkout_router_1 = require("./checkout-router");
exports.appRouter = (0, trpc_1.router)({
    auth: auth_router_1.authRouter,
    products: product_router_1.productRouter,
    checkout: checkout_router_1.checkoutRouter
});
