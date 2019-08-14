import { IReport } from './report.interface';

export interface IValidator {
  reports: IReport[];
  isValid(): boolean;
}
