"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authCredentials = void 0;
var zod_1 = require("zod");
exports.authCredentials = zod_1.z.object({
    email: zod_1.z.string(),
    password: zod_1.z.string().min(8, { message: "Password must be at least 8 characters" }),
});
