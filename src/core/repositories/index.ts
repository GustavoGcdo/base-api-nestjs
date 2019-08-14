import { UserRepository } from './user.repository';

export const Repositories = [{ provide: 'IUserRepository', useClass: UserRepository }];
