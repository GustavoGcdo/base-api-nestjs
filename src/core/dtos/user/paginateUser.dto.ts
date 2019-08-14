import { PaginateDto } from '../base/paginate.dto';

export interface PaginateUserDto extends PaginateDto {
  name?: string;
  login?: string;
  email?: string;
  profile?: string;
}
