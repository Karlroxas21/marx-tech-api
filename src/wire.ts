import express, { Handler } from "express";
import { Controller } from "./controllers/base-controller";
import { Server } from "./server";
import config from "./config";
import { HealthcheckController } from "./controllers/healthcheck/controller";
import cookieParser from 'cookie-parser';
import { requestLogger } from "./middlewares/request-logger";
import { SandboxMailer } from "./infrastructure/sandbox";
import { NodemailerSender } from "./infrastructure/nodemailer";
import { EmailService } from "./components/email/service";
import { EmailController } from "./controllers/email/controller";
import { jsonParserMiddleware } from "./middlewares/json-parser";

export const createServer = async (): Promise<Server> => {

    // infra
    const prodNodemailer = new NodemailerSender(
        config.nodemailer.user,
        config.nodemailer.pass,
        config.nodemailer.to
    );
    const nodemailer = config.server.mode === 'sandbox' ? new SandboxMailer() : prodNodemailer;
    // end of infra

    // components
    const emailService = new EmailService(nodemailer);
    // end of components

    // middleware

    // end of middleware

    const controllers: Controller[] = [
        new HealthcheckController(),
        new EmailController(emailService),
    ];

    const middlewares: Handler[] = [
        jsonParserMiddleware,
        requestLogger(),
        cookieParser(),
    ];

    return new Server(config.server.env, config.server.host, config.server.port, express(), controllers, middlewares);

}