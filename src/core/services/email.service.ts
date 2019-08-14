import { IEmailService } from '../interfaces/services/emailService.interface';
export class EmailService implements IEmailService {
  send(to: string, from: string, subject: string, body: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
