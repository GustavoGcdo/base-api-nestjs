import { IReport } from './report.interface';
import { IValidator } from './validator.interface';

export interface INotifiable extends IValidator {
  addReport(...reports: IReport[]): void;
  addReports(reports: IReport[]): void;
}
