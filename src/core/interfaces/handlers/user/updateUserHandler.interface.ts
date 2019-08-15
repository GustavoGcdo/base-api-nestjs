import { IResult } from '../../../../shared/interfaces/result/result.interface';
import { UpdateUserDto } from '../../../dtos/user/updateUser.dto';

export interface IUpdateUserHandler {
  handle(id: string, model: UpdateUserDto): Promise<IResult>;
}
