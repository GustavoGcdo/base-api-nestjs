import { PaginateUserDto } from '../../../../src/core/dtos/user/paginateUser.dto';
import { PaginateUserHandler } from '../../../../src/core/handlers/user/paginateUser.handler';
import { IUserRepository } from '../../../../src/core/interfaces/repositories/userRepository.interface';
import { Config } from '../../../../src/shared/constants/config';
import { FakeUserRepository } from '../../../mocks/repositories/fakeuser.repository';

describe('PaginateUserHandler', () => {
  let repository: IUserRepository;
  let handler: PaginateUserHandler;

  beforeAll(() => {
    repository = new FakeUserRepository();
    handler = new PaginateUserHandler(repository);
  });

  it(`deve retornar result com success false quando passado pagina com letras`, async () => {
    const paginate: PaginateUserDto = { page: 'asd' };
    const result = await handler.handle(paginate);
    expect(result.success).toBe(false);
  });

  it(`deve retornar result com success false quando passado pagina zero`, async () => {
    const paginate: PaginateUserDto = { page: '0' };
    const result = await handler.handle(paginate);
    expect(result.success).toBe(false);
  });

  it(`deve retornar result com success false quando passado profile com id invalido`, async () => {
    const paginate: PaginateUserDto = { profile: 'asdasasd' };
    const result = await handler.handle(paginate);
    expect(result.success).toBe(false);
  });

  it(`deve retornar result com success false quando passado limit maior do que o permitido`, async () => {
    const paginate: PaginateUserDto = {
      limit: `${Config.DEFALT_MAX_LIMIT + 2}`,
    };
    const result = await handler.handle(paginate);
    expect(result.success).toBe(false);
  });

  it(`deve retornar result com success true quando passado pagina com numero valido`, async () => {
    const paginate: PaginateUserDto = { page: '1' };
    const result = await handler.handle(paginate);
    expect(result.success).toBe(true);
  });

  it(`deve retornar result com success true quando passado nao passado nada`, async () => {
    const paginate: PaginateUserDto = {};
    const result = await handler.handle(paginate);
    expect(result.success).toBe(true);
  });
});
