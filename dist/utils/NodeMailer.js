"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeMailer = void 0;
const nodeMailer = require("nodemailer");
const SendGrid = require("nodemailer-sendgrid-transport");
class NodeMailer {
    static initializeTransport() {
        return nodeMailer.createTransport(SendGrid({
            service: 'SendGrid',
            auth: {
                api_key: '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'
            }
        }));
    }
    static sendEmail(data) {
        return NodeMailer.initializeTransport().sendMail({
            from: 'musikiiproduction@gmail.com',
            to: data.to,
            subject: data.subject,
            html: data.html
        });
    }
}
exports.NodeMailer = NodeMailer;
