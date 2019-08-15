import { IUserRepository } from '../../../src/core/interfaces/repositories/userRepository.interface';
import { User } from '../../../src/core/models/entities/user';
import { PaginateOptions } from '../../../src/core/models/valueObjects/paginateOptions';

export class FakeUserRepository implements IUserRepository {
  users: User[] = [];

  update(id: string, model: User): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async loginExists(login: string): Promise<boolean> {
    return this.users.find(u => u.login === login) ? true : false;
  }

  async emailExists(email: string): Promise<boolean> {
    return this.users.find(u => u.email === email) ? true : false;
  }

  async create(model: User): Promise<User> {
    this.users.push(model);
    return model;
  }

  async find(filter?: any): Promise<User[]> {
    return this.users;
  }

  async findPaginate(
    filter?: User,
    paginateOptions?: PaginateOptions,
  ): Promise<User[]> {
    return this.users;
  }

  async count(filter?: User): Promise<number> {
    return this.users.length;
  }
}
