import { PaginateOptions } from '../../core/models/valueObjects/paginateOptions';

export class Config {
  static DEFALT_RADIX: number = 10;
  static DEFALT_LIMIT: number = 10;
  static DEFALT_SKIP: number = 0;
  static DEFALT_SORT: any = {};
  static DEFALT_MAX_LIMIT: number = 100;
  static DEFALT_MIN_LIMIT: number = 1;
  static DEFAULT_PAGINATE_OPTIONS: PaginateOptions = {
    limit: Config.DEFALT_LIMIT,
    skip: Config.DEFALT_SKIP,
    sort: Config.DEFALT_SORT,
  };
}
