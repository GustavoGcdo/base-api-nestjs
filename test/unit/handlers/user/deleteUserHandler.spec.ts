import { CreateUserDto } from '../../../../src/core/dtos/user/createUser.dto';
import { CreateUserHandler } from '../../../../src/core/handlers/user/createUser.handler';
import { UpdateUserHandler } from '../../../../src/core/handlers/user/updateUser.handler';
import { IUserRepository } from '../../../../src/core/interfaces/repositories/userRepository.interface';
import { IEmailService } from '../../../../src/core/interfaces/services/emailService.interface';
import { FakeUserRepository } from '../../../mocks/repositories/fakeuser.repository';
import { FakeEmailService } from '../../../mocks/services/fakeemail.service';
import { DeleteUserHandler } from '../../../../src/core/handlers/user/deleteUser.handler';

describe('UpdateUserHandler', () => {
  let repository: IUserRepository;
  let emailService: IEmailService;
  let createUserhandler: CreateUserHandler;
  let handler: DeleteUserHandler;

  beforeAll(() => {
    repository = new FakeUserRepository();
    emailService = new FakeEmailService();
    createUserhandler = new CreateUserHandler(repository, emailService);
    handler = new DeleteUserHandler(repository);
  });

  it(`deve retornar result com success true quando tentar deletar usuario com id correto`, async () => {
    const newUser: CreateUserDto = {
      name: 'gustavo',
      login: 'goliveira',
      email: 'email@email.com',
      password: 'senha',
    };

    const resultCreate = await createUserhandler.handle(newUser);
    const id = resultCreate.data._id;

    const resultDelete = await handler.handle(id);
    expect(resultDelete.success).toBe(true);
  });

  it(`deve retornar result com success false quando tentar deletar usuario com id incorreto`, async () => {
    const newUser: CreateUserDto = {
      name: 'outroCara',
      login: 'outroCara',
      email: 'outrocara@email.com',
      password: 'senha',
    };

    const resultCreate = await createUserhandler.handle(newUser);
    const id = resultCreate.data._id;

    await handler.handle(id);
    const resultDelete = await handler.handle(id);
    expect(resultDelete.success).toBe(false);
  });
});
