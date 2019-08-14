import { Role } from '../../enums/role.enum';
import { Entity } from './base/entity';

export interface Profile extends Entity {
  name: string;
  role: Role[];
}
