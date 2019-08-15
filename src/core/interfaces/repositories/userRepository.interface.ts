import { User } from '../../models/entities/user';
import { PaginateOptions } from '../../models/valueObjects/paginateOptions';

export interface IUserRepository {
  find(filter?: any): Promise<User[]>;
  findPaginate(filter?: any, options?: PaginateOptions): Promise<User[]>;
  create(model: User): Promise<User>;
  update(id: string, model: User): Promise<User>;
  loginExists(login: string): Promise<boolean>;
  emailExists(email: string): Promise<boolean>;
  count(filter?: any): Promise<number>;
}
