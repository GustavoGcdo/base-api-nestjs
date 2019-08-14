export interface IEmailService {
    send(to: string, from: string, subject: string, body: string): Promise<void>;
}
