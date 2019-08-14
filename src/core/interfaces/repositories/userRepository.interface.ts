import { User } from '../../models/entities/user';

export interface IUserRepository {
  loginExists(login: string): Promise<boolean>;
  emailExists(email: string): Promise<boolean>;
  create(model: User): Promise<User>;
}
