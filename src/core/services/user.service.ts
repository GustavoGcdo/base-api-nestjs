import { Injectable, Inject } from '@nestjs/common';
import { IResult } from '../../shared/interfaces/result/result.interface';
import { CreateUserDto } from '../dtos/user/createUser.dto';
import { IUserService } from '../interfaces/services/userService.interface';
import { IUserRepository } from '../interfaces/repositories/userRepository.interface';
import { User } from '../models/entities/user';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject('IUserRepository') private readonly repository: IUserRepository,
  ) {}

  create(model: CreateUserDto): Promise<IResult> {
    const newUser: User = {
      name: model.name,
      login: model.login,
      email: model.email,
    };

    throw this.repository.create(newUser);
  }
}
