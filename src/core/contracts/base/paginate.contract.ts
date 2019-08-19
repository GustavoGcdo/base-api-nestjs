import { IContract } from '../../../shared/interfaces/contracts/contract.interface';
import { Notifiable } from '../../../shared/notifiable/notifiable';
import { Validator } from '../../../shared/validators/validator';
import { PaginateDto } from '../../dtos/base/paginate.dto';
import { Config } from '../../../shared/constants/config';

export class PaginateContract extends Notifiable
  implements IContract<PaginateDto> {
  validate(model: PaginateDto): boolean {
    const validator = new Validator();

    if (model.limit) {
      validator.isNotANumber(
        model.limit,
        'limit',
        'limit must be a valid number',
      );

      validator.isGreaterThan(
        parseInt(model.limit, 10),
        Config.DEFALT_MAX_LIMIT,
        'limit',
        `limit exceeded ${Config.DEFALT_MAX_LIMIT} records`,
      );
    }

    if (model.page) {
      validator.isNotANumber(model.page, 'page', 'page must be a valid number');
      validator.isLessThan(
        parseInt(model.page, Config.DEFALT_RADIX),
        1,
        'page',
        'page must be greater than zero',
      );
    }

    this.addReports(validator.reports);
    return this.isValid();
  }
}
