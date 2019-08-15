import { CreateUserHandler } from './user/createUser.handler';
import { PaginateUserHandler } from './user/paginateUser.handler';
import { UpdateUserHandler } from './user/updateUser.handler';

export const Handlers = [
  { provide: 'ICreateUserHandler', useClass: CreateUserHandler },
  { provide: 'IUpdateUserHandler', useClass: UpdateUserHandler },
  { provide: 'IPaginateUserHandler', useClass: PaginateUserHandler },
];
