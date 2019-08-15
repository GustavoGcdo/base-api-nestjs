import { Inject, Injectable } from '@nestjs/common';
import { IResult } from '../../../shared/interfaces/result/result.interface';
import { Result } from '../../../shared/result/result';
import { IDeleteUserHandler } from '../../interfaces/handlers/user/deleteUserHandler.interface';
import { IUserRepository } from '../../interfaces/repositories/userRepository.interface';
import { Report } from '../../../shared/notifiable/report';

@Injectable()
export class DeleteUserHandler implements IDeleteUserHandler {
  constructor(
    @Inject('IUserRepository') private readonly repository: IUserRepository,
  ) {}

  async handle(id: string): Promise<IResult> {
    const [user] = await this.repository.find({ _id: id });
    if (!user) {
      return new Result('Usuário não removido!', false, null, [
        new Report('user', 'usuario nao encontrado'),
      ]);
    }

    await this.repository.remove(id);
    return new Result('Usuário removido com sucesso!', true, null, null);
  }
}
