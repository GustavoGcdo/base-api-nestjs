import { Result } from '../../../../shared/result/result';
import { PaginateDto } from '../../../dtos/base/paginate.dto';
import { PaginateUserDto } from '../../../dtos/user/paginateUser.dto';
import { PaginateOptions } from '../../../models/valueObjects/paginateOptions';

export interface IPaginateUserHandler {
  handle(model: PaginateUserDto): Promise<Result>;
  getFilters(model: PaginateUserDto): any;
  getPaginateOptions(model: PaginateDto): PaginateOptions;
}
