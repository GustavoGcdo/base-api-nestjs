import { Inject, Injectable } from '@nestjs/common';
import { Md5 } from 'md5-typescript';
import { IResult } from '../../../shared/interfaces/result/result.interface';
import { Report } from '../../../shared/notifiable/report';
import { Result } from '../../../shared/result/result';
import { CreateUserContract } from '../../contracts/user/createUser.contract';
import { CreateUserDto } from '../../dtos/user/createUser.dto';
import { ICreateUserHandler } from '../../interfaces/handlers/user/createUserHandler.interface';
import { IUserRepository } from '../../interfaces/repositories/userRepository.interface';
import { IEmailService } from '../../interfaces/services/emailService.interface';
import { User } from '../../models/entities/user';

@Injectable()
export class CreateUserHandler implements ICreateUserHandler {
  constructor(
    @Inject('IUserRepository') private readonly repository: IUserRepository,
    @Inject('IEmailService') private readonly emailService: IEmailService,
  ) {}

  async handle(model: CreateUserDto): Promise<IResult> {
    const contract = new CreateUserContract();

    // 1. Fail fast validations
    if (!contract.validate(model)) {
      return new Result(
        'Não foi possivel criar usuário!',
        false,
        null,
        contract.reports,
      );
    }

    // 2. Regras de negócio
    const loginExists = await this.repository.loginExists(model.login);
    if (loginExists) {
      contract.addReport(new Report('login', 'login already exists'));
    }

    const emailExists = await this.repository.emailExists(model.email);
    if (emailExists) {
      contract.addReport(new Report('email', 'email already exists'));
    }

    if (!contract.isValid()) {
      return new Result(
        'Não foi possivel criar usuário!',
        false,
        null,
        contract.reports,
      );
    }

    const pass = await Md5.init(`${model.password}${process.env.SALT_KEY}`);

    // 3. Gera o novo usuario, nutrição da entidade
    const newUser: User = {
      name: model.name,
      login: model.login,
      email: model.email,
      password: pass,
      isAdmin: false,
    };

    // 4. Salva o usuario
    const userCreated = await this.repository.create(newUser);

    // 5. Cria um objeto de retorno
    const userReturn: User = {
      _id: userCreated._id,
      name: userCreated.name,
      login: userCreated.login,
      email: userCreated.email,
    };

    // 6. Envia email
    this.emailService.send(
      'alguem',
      'sgda',
      'criacao de novo usuario',
      'bem vindo',
    );

    return new Result('Usuário criado com sucesso!', true, userReturn, null);
  }
}
