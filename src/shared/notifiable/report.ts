import { IReport } from '../interfaces/notifiable/report.interface';

export class Report implements IReport {
  name: string;
  message: string;

  constructor(name: string, message: string) {
    this.name = name;
    this.message = message;
  }
}
