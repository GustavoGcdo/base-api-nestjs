import { User } from '../../models/entities/user';
import { PaginateOptions } from '../../models/valueObjects/paginateOptions';

export interface IUserRepository {
  find(filter?: any, options?: PaginateOptions): Promise<User[]>;
  create(model: User): Promise<User>;
  loginExists(login: string): Promise<boolean>;
  emailExists(email: string): Promise<boolean>;
  count(filter?: any): Promise<number>;
}
