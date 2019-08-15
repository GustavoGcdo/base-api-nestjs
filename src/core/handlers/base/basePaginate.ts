import { PaginateDto } from '../../dtos/base/paginate.dto';
import { PaginateOptions } from '../../models/valueObjects/paginateOptions';
import { Config } from '../../../shared/constants/Config';

export class BasePaginate {
  getPaginateOptions(model: PaginateDto): PaginateOptions {
    const options: PaginateOptions = { limit: 10, skip: 0, sort: {} };
    const { limit, page } = model;

    if (limit) {
      options.limit = parseInt(limit, Config.DEFALT_RADIX);
    }

    if (page) {
      let pageNumber = parseInt(page, Config.DEFALT_RADIX);
      pageNumber = pageNumber === 0 ? 1 : pageNumber; // Nao pode multiplicar por zero - 1
      options.skip = options.limit * (pageNumber - 1);
    }

    return options;
  }
}
