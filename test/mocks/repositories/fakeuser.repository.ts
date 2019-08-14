import { IUserRepository } from '../../../src/core/interfaces/repositories/userRepository.interface';
import { User } from '../../../src/core/models/entities/user';

export class FakeUserRepository implements IUserRepository {
  users: User[] = [];

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
}
