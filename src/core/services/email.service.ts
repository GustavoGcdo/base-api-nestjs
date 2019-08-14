import { IEmailService } from '../interfaces/services/emailService.interface';
export class EmailService implements IEmailService {
  async send(to: string, from: string, subject: string, body: string) {
    // enviando email
  }
}
