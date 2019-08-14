import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../interfaces/repositories/userRepository.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../models/entities/user';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(@InjectModel('User') private readonly model: Model<any>) {}

  async loginExists(login: string): Promise<boolean> {
    const usersWithSameLogin = await this.model.find({ login });
    return usersWithSameLogin.length > 0 ? true : false;
  }

  async emailExists(email: string): Promise<boolean> {
    const usersWithSameEmail = await this.model.find({ email });
    return usersWithSameEmail.length > 0 ? true : false;
  }

  async create(model: User): Promise<User> {
    const data = await new this.model(model);
    return data.save();
  }
}
