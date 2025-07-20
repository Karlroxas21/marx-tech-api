export interface Nodemailer {
    sendGenericEmail(specifics: Record<string, string>): Promise<void>;
}

export interface Service {
    sendEmail(from: string, body: string): Promise<void>
}