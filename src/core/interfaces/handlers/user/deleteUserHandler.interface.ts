import { IResult } from '../../../../shared/interfaces/result/result.interface';

export interface IDeleteUserHandler {
  handle(id: string): Promise<IResult>;
}
