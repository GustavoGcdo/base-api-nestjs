import { EmailService } from './email.service';

export const Services = [
  { provide: 'IEmailService', useClass: EmailService },
];
