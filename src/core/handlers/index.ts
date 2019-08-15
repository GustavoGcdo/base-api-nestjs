import { CreateUserHandler } from './user/createUser.handler';
import { DeleteUserHandler } from './user/deleteUser.handler';
import { PaginateUserHandler } from './user/paginateUser.handler';
import { UpdateUserHandler } from './user/updateUser.handler';

export const Handlers = [
  { provide: 'ICreateUserHandler', useClass: CreateUserHandler },
  { provide: 'IUpdateUserHandler', useClass: UpdateUserHandler },
  { provide: 'IDeleteUserHandler', useClass: DeleteUserHandler },
  { provide: 'IPaginateUserHandler', useClass: PaginateUserHandler },
];
