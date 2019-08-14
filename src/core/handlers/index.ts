import { UserHandler } from './user.handler';

export const Handlers = [{ provide: 'IUserHandler', useClass: UserHandler }];
