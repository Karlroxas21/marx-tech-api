import express, { Express, Request, NextFunction, Response } from "express";

import { Controller } from "../base-controller";
import { Service } from "../../components/email/adapters";
import { asyncCall } from "../../utilities/calls";
import { le } from "../../utilities/logger";
import { EmailRequest } from "../../components/email/domain";

export class EmailController extends Controller {

    constructor(private readonly service: Service) {
        super();
    }

    register(server: Express): void {
        const router = express.Router();
        server.use('/v1/email', router);

        // add schema validator
        router.post('/', this.sendMail.bind(this));

    }

    async sendMail(req: Request<never, never, EmailRequest>, res: Response, next: NextFunction) {
        const { from, message } = req.body;

        const [, serr] = await asyncCall(() => this.service.sendEmail(from, message));
        if(serr) {
            le('EmailController#sendEmail(): service.sendEmail() failed', serr);
            next();
            return;
            
        }
        res.status(200).send();
    }

}