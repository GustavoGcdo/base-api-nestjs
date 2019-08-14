import { IResult } from '../../../shared/interfaces/result/result.interface';
import { CreateUserDto } from '../../dtos/user/createUser.dto';

export interface IUserHandler {
  create(model: CreateUserDto): Promise<IResult>;
}
