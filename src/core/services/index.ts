import { UserService } from './user.service';

export const Services = [{ provide: 'IUserService', useClass: UserService }];
