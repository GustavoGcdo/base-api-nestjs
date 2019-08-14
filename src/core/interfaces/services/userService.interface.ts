import { IResult } from '../../../shared/interfaces/result/result.interface';
import { CreateUserDto } from '../../dtos/user/createUser.dto';

export interface IUserService {
  create(model: CreateUserDto): Promise<IResult>;
}
