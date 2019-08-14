import { IResult } from '../../shared/interfaces/result/result.interface';
import { CreateUserDto } from '../dtos/user/createUser.dto';
import { IUserService } from '../interfaces/services/userService.interface';

export class UserService implements IUserService {
  create(model: CreateUserDto): Promise<IResult> {
    throw new Error('Method not implemented.');
  }
}
