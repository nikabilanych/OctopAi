import nodemailer from "nodemailer";
export const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'dane.nikolaus84@ethereal.email',
        pass: 'DJq4YwzUCXbJGG6dMf'
    }
  });