import { INotifiable } from '../interfaces/notifiable/notifiable';
import { IReport } from '../interfaces/notifiable/report.interface';

export abstract class Notifiable implements INotifiable {
  constructor(public reports: IReport[] = []) {
    this.reports = reports;
  }

  addReport(...reports: IReport[]): void {
    this.reports = this.reports.concat(reports);
  }

  addReports(reports: IReport[]): void {
    this.reports.push(...reports);
  }

  isValid(): boolean {
    return this.reports.length === 0;
  }
}
