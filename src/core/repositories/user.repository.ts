import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUserRepository } from '../interfaces/repositories/userRepository.interface';
import { User } from '../models/entities/user';
import { PaginateOptions } from '../models/valueObjects/paginateOptions';
import { Config } from '../../shared/constants/Config';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(@InjectModel('User') private readonly model: Model<any>) {}

  async find(
    filter?: any,
    options: PaginateOptions = Config.DEFAULT_PAGINATE_OPTIONS,
  ) {
    return this.model
      .find(filter)
      .sort(options.sort)
      .skip(options.skip)
      .limit(options.limit);
  }

  async count(filter?: any) {
    return await this.model.countDocuments(filter);
  }

  async loginExists(login: string) {
    const usersWithSameLogin = await this.model.find({ login });
    return usersWithSameLogin.length > 0 ? true : false;
  }

  async emailExists(email: string) {
    const usersWithSameEmail = await this.model.find({ email });
    return usersWithSameEmail.length > 0 ? true : false;
  }

  async create(model: User) {
    const data = await new this.model(model);
    return data.save();
  }
}
