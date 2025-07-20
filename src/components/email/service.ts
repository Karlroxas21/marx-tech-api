import { ApplicationError } from "../../errors/application-error";
import { asyncCall } from "../../utilities/calls";
import { le } from "../../utilities/logger";
import { Nodemailer, Service } from "./adapters";

export class EmailService implements Service {

    constructor(private readonly nodemailer: Nodemailer) {}

    async sendEmail(from: string, message: string): Promise<void> {
        const [, serr] = await asyncCall(() => this.nodemailer.sendGenericEmail({ from, message }));
        if (serr){
            le('EmailService#sendEmail(): nodemailer.sendGenericEmail() failed', serr);
            throw ApplicationError.from(serr);
        }

        return;
    }
    
}