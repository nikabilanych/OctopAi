"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Orders = void 0;
var yourOwnOrder = function (_a) {
    var user = _a.req.user;
    if (user.role === "admin") {
        return true;
    }
    return {
        user: {
            equals: user === null || user === void 0 ? void 0 : user.id
        }
    };
};
exports.Orders = {
    slug: "orders",
    admin: {
        useAsTitle: "Your Orders",
        description: "Summary of all your orders on DigitalOctopus",
    },
    access: {
        read: yourOwnOrder,
        update: function (_a) {
            var req = _a.req;
            return req.user.role === "admin";
        },
        create: function (_a) {
            var req = _a.req;
            return req.user.role === "admin";
        },
        delete: function (_a) {
            var req = _a.req;
            return req.user.role === "admin";
        },
    },
    fields: [
        {
            name: "_isPaid",
            type: "checkbox",
            required: true,
            access: {
                read: function (_a) {
                    var req = _a.req;
                    return req.user.role === "admin";
                },
                create: function () { return false; },
                update: function () { return false; },
            },
            admin: {
                hidden: true,
            },
        },
        {
            name: "user",
            type: "relationship",
            relationTo: "users",
            required: true,
            admin: {
                hidden: true,
            }
        },
        {
            name: "products",
            type: "relationship",
            relationTo: "products",
            hasMany: true,
            required: true,
        }
    ],
};
