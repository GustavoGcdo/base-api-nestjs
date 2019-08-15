import { IUserRepository } from '../../../src/core/interfaces/repositories/userRepository.interface';
import { User } from '../../../src/core/models/entities/user';
import { PaginateOptions } from '../../../src/core/models/valueObjects/paginateOptions';
import { Config } from '../../../src/shared/constants/Config';

export class FakeUserRepository implements IUserRepository {
  users: User[] = [];

  async loginExists(login: string): Promise<boolean> {
    return this.users.find(u => u.login === login) ? true : false;
  }

  async emailExists(email: string): Promise<boolean> {
    return this.users.find(u => u.email === email) ? true : false;
  }

  async create(model: User): Promise<User> {
    const ultimoId =
      this.users.length > 0 ? this.users[this.users.length - 1]._id : `${1}`;
    const novoId = `${parseInt(ultimoId, Config.DEFALT_RADIX) + 1}`;
    model._id = novoId;

    this.users.push(model);
    return model;
  }

  async find(filter?: any): Promise<User[]> {
    return this.users.filter(user => this.getUserByfilter(user, filter));
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

  async remove(id: string): Promise<any> {
    this.users = this.users.filter(user => !this.getUserByfilter(user, { _id: id }));
    return true;
  }

  async update(id: string, model: User): Promise<void> {
    const indexUser = this.users.findIndex(user =>
      this.getUserByfilter(user, { _id: id }),
    );
    this.users[indexUser] = {
      ...this.users[indexUser],
      ...model,
    };
  }

  getUserByfilter(user, filter) {
    // tslint:disable-next-line:forin
    let expression = false;
    for (const key in filter) {
      if (user[key] === filter[key]) {
        expression = true;
      }
    }
    return expression;
  }
}
