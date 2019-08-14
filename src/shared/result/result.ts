import { IResult } from '../interfaces/result/result.interface';
import { IReport } from '../interfaces/notifiable/report.interface';

export class Result implements IResult {
  message: string;
  success: boolean;
  data: any;
  errors: IReport[];

  constructor(message: string, success: boolean, data: any, errors: IReport[]) {
    this.message = message;
    this.success = success;
    this.data = data;
    this.errors = errors;
  }
}
