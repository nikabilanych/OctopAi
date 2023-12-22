"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transporter = void 0;
var nodemailer_1 = __importDefault(require("nodemailer"));
exports.transporter = nodemailer_1.default.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'dane.nikolaus84@ethereal.email',
        pass: 'DJq4YwzUCXbJGG6dMf'
    }
});
