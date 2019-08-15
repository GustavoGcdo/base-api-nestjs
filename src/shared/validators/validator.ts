import { Report } from '../notifiable/report';
import { IValidator } from '../interfaces/notifiable/validator.interface';
import { IReport } from '../interfaces/notifiable/report.interface';
import { Config } from '../constants/Config';

export class Validator implements IValidator {
  reports: IReport[];

  constructor(reports: Report[] = []) {
    this.reports = reports;
  }

  isRequired(value: any, name: string, message: string) {
    if (!value || value.length <= 0) {
      this.reports.push(new Report(name, message));
    }
  }

  isNotNull(value: any, name: string, message: string) {
    if (value === null) {
      this.reports.push(new Report(name, message));
    }
  }

  isUndefined(value: any, name: string, message: string) {
    if (value === undefined) {
      this.reports.push(new Report(name, message));
    }
  }

  hasMinLen(value: string, min: number, name: string, message: string) {
    if (!value || value.length < min) {
      this.reports.push(new Report(name, message));
    }
  }

  hasMaxLen(value: any, max: number, name: string, message: string) {
    if (!value || value.length > max) {
      this.reports.push(new Report(name, message));
    }
  }

  isFixedLen(value: any, len: number, name: string, message: string) {
    if (value.length !== len) {
      this.reports.push(new Report(name, message));
    }
  }

  isEmail(value: any, name: string, message: string) {
    const reg = new RegExp(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);
    if (!reg.test(value)) {
      this.reports.push(new Report(name, message));
    }
  }

  isGreaterThan(valuea: number, valueb: number, name: string, message: string) {
    if (valuea > valueb) {
      this.reports.push(new Report(name, message));
    }
  }

  isLessThan(valuea: number, valueb: number, name: string, message: string) {
    if (valuea < valueb) {
      this.reports.push(new Report(name, message));
    }
  }

  isNotANumber(value: string, name: string, message: string) {
    if (isNaN(parseInt(value, Config.DEFALT_RADIX))) {
      this.reports.push(new Report(name, message));
    }
  }

  clear() {
    this.reports = [];
  }

  isValid() {
    return this.reports.length === 0;
  }
}
