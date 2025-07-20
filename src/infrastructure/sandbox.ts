import { Nodemailer } from "../components/email/adapters";
import { li } from "../utilities/logger";

export class SandboxMailer implements Nodemailer {
    async sendGenericEmail(specifics: Record<string, string>): Promise<void> {
        li(`SANDBOX sendGenericEmail: ${specifics}`);
    }

}