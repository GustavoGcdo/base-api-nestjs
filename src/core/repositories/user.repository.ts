import { IUserRepository } from '../interfaces/repositories/userRepository.interface';
import { User } from '../models/entities/user';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository implements IUserRepository {
  async loginExists(login: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  async emailExists(email: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  async create(model: User): Promise<User> {
    throw new Error('Method not implemented.');
  }
}
