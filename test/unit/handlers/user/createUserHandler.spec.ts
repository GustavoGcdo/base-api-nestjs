import { CreateUserDto } from '../../../../src/core/dtos/user/createUser.dto';
import { CreateUserHandler } from '../../../../src/core/handlers/user/createUser.handler';
import { IUserRepository } from '../../../../src/core/interfaces/repositories/userRepository.interface';
import { IEmailService } from '../../../../src/core/interfaces/services/emailService.interface';
import { FakeUserRepository } from '../../../mocks/repositories/fakeuser.repository';
import { FakeEmailService } from '../../../mocks/services/fakeemail.service';

describe('CreateUserHandler', () => {
  let repository: IUserRepository;
  let emailService: IEmailService;
  let handler: CreateUserHandler;

  beforeAll(() => {
    repository = new FakeUserRepository();
    emailService = new FakeEmailService();
    handler = new CreateUserHandler(repository, emailService);
  });

  it(`deve retornar result com success false quando passado usuario faltando informacoes`, async () => {
    const newUser: CreateUserDto = {
      name: null,
      login: null,
      email: null,
      password: null,
    };
    const result = await handler.handle(newUser);
    expect(result.success).toBe(false);
  });

  it(`deve retornar result com success false quando passado usuario com informacoes erradas`, async () => {
    const newUser: CreateUserDto = {
      name: 'a',
      login: '',
      email: 'email',
      password: '123423459546945649439',
    };

    const result = await handler.handle(newUser);
    expect(result.success).toBe(false);
  });

  it(`deve retornar result com success true quando passado usuario corretamente`, async () => {
    const newUser: CreateUserDto = {
      name: 'Gustavo',
      login: 'goliveira',
      email: 'gustavo@gmail.com',
      password: 'senha123',
    };
    const result = await handler.handle(newUser);
    expect(result.success).toBe(true);
  });

  it(`deve retornar result com success false quando passado usuario com login e email ja existente`, async () => {
    const newUser: CreateUserDto = {
      name: 'Teste',
      login: 'goliveira',
      email: 'teste@gmail.com',
      password: 'senha123',
    };
    let result = await handler.handle(newUser);
    result = await handler.handle(newUser);
    expect(result.success).toBe(false);
  });

  it(`deve retornar result com success true quando passado usuario com login e email diferentes`, async () => {
    const newUser: CreateUserDto = {
      name: 'Gustavo',
      login: 'user',
      email: 'user@gmail.com',
      password: 'senha123',
    };
    let result = await handler.handle(newUser);

    newUser.login = 'outrologin';
    newUser.email = 'email@email.com';

    result = await handler.handle(newUser);
    expect(result.success).toBe(true);
  });
});
