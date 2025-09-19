import { Nodemailer } from "../components/email/adapters";

import nodemailer from "nodemailer";
import { le } from "../utilities/logger";
import { asyncCall, syncCall } from "../utilities/calls";
import { ApplicationError } from "../errors/application-error";

export class NodemailerSender implements Nodemailer {

    constructor(
        private readonly user: string,
        private readonly pass: string,
        private readonly to: string) { }

    async sendGenericEmail(specifics: Record<string, string>): Promise<void> {
        const [transporter, transporterErr] = syncCall(() => nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            auth: {
                user: this.user,
                pass: this.pass,
            },
            secure: true,
            port: 465
        }));
        if (transporterErr) {
            le('NodemailerSender#sendGenericEmail(): nodemailer.createTransport() failed', transporterErr);
            throw ApplicationError.from(transporterErr);
        }

        const [, sendMailErr] = await asyncCall(() => transporter!.sendMail({
            from: specifics.from,
            to: this.to,
            subject: 'From Personal Website',
            text: `from ${specifics.from} \n${specifics.message}`,
        }));
        if(sendMailErr) {
            le('NodemailerSender#sendGenericEmail(): transporter.sendMail() failed', transporterErr);
            throw ApplicationError.from(sendMailErr);

        }

    }

}