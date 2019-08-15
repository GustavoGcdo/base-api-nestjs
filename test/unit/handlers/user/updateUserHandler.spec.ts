import { IUserRepository } from '../../../../src/core/interfaces/repositories/userRepository.interface';
import { IEmailService } from '../../../../src/core/interfaces/services/emailService.interface';
import { CreateUserHandler } from '../../../../src/core/handlers/user/createUser.handler';
import { FakeUserRepository } from '../../../mocks/repositories/fakeuser.repository';
import { FakeEmailService } from '../../../mocks/services/fakeemail.service';
import { CreateUserDto } from '../../../../src/core/dtos/user/createUser.dto';
import { UpdateUserHandler } from '../../../../src/core/handlers/user/updateUser.handler';
import { UpdateUserDto } from '../../../../src/core/dtos/user/updateUser.dto';

describe('UpdateUserHandler', () => {
  let repository: IUserRepository;
  let emailService: IEmailService;
  let createUserhandler: CreateUserHandler;
  let handler: UpdateUserHandler;

  beforeAll(() => {
    repository = new FakeUserRepository();
    emailService = new FakeEmailService();
    createUserhandler = new CreateUserHandler(repository, emailService);
    handler = new UpdateUserHandler(repository, emailService);
  });

  it(`deve retornar result com success false quando tentar atualizar usuario com informacoes obrigatorias nulas`, async () => {
    const newUser: CreateUserDto = {
      name: 'gustavo',
      login: 'goliveira',
      email: 'email@email.com',
      password: 'senha',
    };

    const resultCreate = await createUserhandler.handle(newUser);

    const userId = resultCreate.data._id;
    const userUpdate: UpdateUserDto = {
      name: null,
      email: null,
      login: null,
    };
    const resultUpdate = await handler.handle(userId, userUpdate);

    expect(resultUpdate.success).toBe(false);
  });

  it(`deve retornar result com success false quando tentar atualizar usuario com email ja existente`, async () => {
    const newUser: CreateUserDto = {
      name: 'user',
      login: 'user',
      email: 'user@email.com',
      password: 'senha',
    };

    const resultCreate = await createUserhandler.handle(newUser);

    const userId = resultCreate.data._id;
    const userUpdate: UpdateUserDto = {
      email: 'email@email.com',
    };
    const resultUpdate = await handler.handle(userId, userUpdate);

    expect(resultUpdate.success).toBe(false);
  });

  it(`deve retornar result com success true quando tentar atualizar usuario com novo email`, async () => {
    const newUser: CreateUserDto = {
      name: 'teste',
      login: 'teste',
      email: 'teste@email.com',
      password: 'senha',
    };

    const resultCreate = await createUserhandler.handle(newUser);

    const userId = resultCreate.data._id;
    const userUpdate: UpdateUserDto = {
      email: 'emailnovo@email.com',
    };
    const resultUpdate = await handler.handle(userId, userUpdate);

    expect(resultUpdate.success).toBe(true);
  });
});
