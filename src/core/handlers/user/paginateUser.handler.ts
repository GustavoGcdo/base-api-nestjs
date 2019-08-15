import { Result } from '../../../shared/result/result';
import { PaginateUserDto } from '../../dtos/user/paginateUser.dto';
import { BasePaginate } from '../../interfaces/handlers/base/BasePaginate';
import { IPaginateUserHandler } from '../../interfaces/handlers/user/paginateHandler.interface';
import { PaginateContract } from '../../contracts/base/paginate.contract';
import { Report } from '../../../shared/notifiable/report';
import { PaginateResult } from '../../../shared/result/paginateResult';
import { Inject } from '@nestjs/common';
import { IUserRepository } from '../../interfaces/repositories/userRepository.interface';
import { Types } from 'mongoose';

export class PaginateUserHandler extends BasePaginate
  implements IPaginateUserHandler {
  constructor(
    @Inject('IUserRepository') private readonly repository: IUserRepository,
  ) {
    super();
  }

  async handle(model: PaginateUserDto): Promise<Result> {
    const contract = new PaginateContract();

    // 1. Fail fas validations
    if (!contract.validate(model)) {
      return new Result(
        'Não foi possivel buscar usuários',
        false,
        null,
        contract.reports,
      );
    }

    // 2. Regras para os filtros
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
        'Não foi possivel buscar usuários',
        false,
        null,
        contract.reports,
      );
    }

    // 3. Separa as informacoes necessarias para paginacao
    const options = this.getPaginateOptions(model);
    const filter = this.getFilters(model);

    // 4. Buscar as informacoes no banco
    const data = await this.repository.findPaginate(filter, options);
    const totalRegisters = await this.repository.count(filter);

    // 5. Cria um objeto de retorno da paginacao
    const paginateResult: PaginateResult = {
      results: data,
      count: data.length,
      total: totalRegisters,
      limit: options.limit,
      offset: options.skip,
    };

    return new Result(null, true, paginateResult, null);
  }

  getFilters(model: PaginateUserDto) {
    const filter: any = {};

    if (model.login) {
      filter.login = model.login;
    }

    if (model.name) {
      filter.name = model.name;
    }

    if (model.email) {
      filter.email = model.email;
    }

    if (model.profile) {
      filter.profile = model.profile;
    }

    return filter;
  }
}
