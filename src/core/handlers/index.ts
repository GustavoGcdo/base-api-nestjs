import { CreateUserHandler } from './user/createUser.handler';

export const Handlers = [{ provide: 'ICreateUserHandler', useClass: CreateUserHandler }];
