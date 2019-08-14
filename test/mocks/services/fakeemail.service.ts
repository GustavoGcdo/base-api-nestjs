import { IEmailService } from '../../../src/core/interfaces/services/emailService.interface';

export class FakeEmailService implements IEmailService {
  async send(
    to: string,
    from: string,
    subject: string,
    body: string,
  ): Promise<void> {
    // console.log(`enviando email para ${to} de ${from}`);
  }
}
