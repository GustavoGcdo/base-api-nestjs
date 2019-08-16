import { PaginateDto } from '../base/paginate.dto';

export class PaginateUserDto extends PaginateDto {
  name?: string;
  login?: string;
  email?: string;
  profile?: string;
}
