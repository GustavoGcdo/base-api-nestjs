import { IReport } from '../notifiable/report.interface';

export interface IResult {
  message: string;
  success: boolean;
  data: any;
  errors: IReport[];
}
