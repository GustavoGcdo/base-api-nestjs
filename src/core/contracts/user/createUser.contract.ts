import { IContract } from '../../../shared/interfaces/contracts/contract.interface';
import { Notifiable } from '../../../shared/notifiable/notifiable';
import { Validator } from '../../../shared/validators/validator';
import { CreateUserDto } from '../../dtos/user/createUser.dto';

export class CreateUserContract extends Notifiable
  implements IContract<CreateUserDto> {
  validate(model: CreateUserDto): boolean {
    const validator = new Validator();

    validator.isRequired(model.name, 'name', 'name is required');
    validator.isRequired(model.login, 'login', 'login is required');

    validator.isRequired(model.email, 'email', 'email is required');
    validator.isEmail(model.email, 'email', 'email invalid');

    validator.isRequired(model.password, 'password', 'password is required');
    validator.hasMinLen(model.password, 3, 'password', 'min 3 characters');
    validator.hasMaxLen(model.password, 10, 'password', 'max 10 characters');

    this.addReports(validator.reports);
    return this.isValid();
  }
}
