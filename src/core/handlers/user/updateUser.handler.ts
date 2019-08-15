import { Inject, Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { IResult } from '../../../shared/interfaces/result/result.interface';
import { Report } from '../../../shared/notifiable/report';
import { Result } from '../../../shared/result/result';
import { UpdateUserContract } from '../../contracts/user/updateUser.contract';
import { UpdateUserDto } from '../../dtos/user/updateUser.dto';
import { IUpdateUserHandler } from '../../interfaces/handlers/user/updateUserHandler.interface';
import { IUserRepository } from '../../interfaces/repositories/userRepository.interface';
import { IEmailService } from '../../interfaces/services/emailService.interface';
import { User } from '../../models/entities/user';

@Injectable()
export class UpdateUserHandler implements IUpdateUserHandler {
  constructor(
    @Inject('IUserRepository') private readonly repository: IUserRepository,
    @Inject('IEmailService') private readonly emailService: IEmailService,
  ) {}

  async handle(id: string, model: UpdateUserDto): Promise<IResult> {
    const contract = new UpdateUserContract();

    // 1. Fail fast validations
    if (!contract.validate(model)) {
      return new Result(
        'Não foi possivel atualizar usuário!',
        false,
        null,
        contract.reports,
      );
    }

    // 2. Regras de negócio
    const [loginExists] = await this.repository.find({
      login: model.login,
      _id: { $ne: id },
    });

    if (loginExists) {
      contract.addReport(new Report('login', 'login already exists'));
    }

    const [emailExists] = await this.repository.find({
      email: model.email,
      _id: { $ne: id },
    });

    if (emailExists) {
      contract.addReport(new Report('email', 'email already exists'));
    }

    if (model.profile) {
      const profileIsValid = Types.ObjectId.isValid(model.profile);
      if (!profileIsValid) {
        contract.addReport(
          new Report('profile', 'profile must contain a valid id'),
        );
      }
    }

    if (!contract.isValid()) {
      return new Result(
        'Não foi possivel alterar o usuário!',
        false,
        null,
        contract.reports,
      );
    }

    await this.repository.update(id, model);

    // 6. Envia email
    this.emailService.send(
      'alguem',
      'sgda',
      'Alteracao de usuario',
      'alteracao',
    );

    const [currentUser] = await this.repository.find({ _id: id });
    const returnUser: User = {
      name: currentUser.name,
      email: currentUser.email,
      login: currentUser.login,
      isAdmin: currentUser.isAdmin,
    };

    return new Result('Usuário alterado com sucesso!', true, returnUser, null);
  }
}
