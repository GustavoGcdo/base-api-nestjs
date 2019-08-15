import { IContract } from '../../../shared/interfaces/contracts/contract.interface';
import { Notifiable } from '../../../shared/notifiable/notifiable';
import { Validator } from '../../../shared/validators/validator';
import { UpdateUserDto } from '../../dtos/user/updateUser.dto';

export class UpdateUserContract extends Notifiable
  implements IContract<UpdateUserDto> {
  validate(model: UpdateUserDto): boolean {
    const validator = new Validator();

    if (model.email) {
      validator.isEmail(model.email, 'email', 'email invalid');
    }

    validator.isNotNull(model.name, 'name', 'name cannot be null');
    validator.isNotNull(model.login, 'login', 'login cannot be null');

    if (model.dataNascimento) {
      const date = new Date(model.dataNascimento);
      validator.isGreaterThan(
        date.getTime(),
        Date.now(),
        'date',
        'date cannot be in the future',
      );
    }

    this.addReports(validator.reports);
    return this.isValid();
  }
}
