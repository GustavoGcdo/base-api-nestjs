import { CreateUserHandler } from './user/createUser.handler';
import { PaginateUserHandler } from './user/paginateUser.handler';

export const Handlers = [
  { provide: 'ICreateUserHandler', useClass: CreateUserHandler },
  { provide: 'IPaginateUserHandler', useClass: PaginateUserHandler },
];
