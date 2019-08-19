import { Role } from '../../../core/enums/role.enum';

export interface JwtPayload {
  _id: string;
  login: string;
  roles: Role[];
}
