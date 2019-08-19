import { Entity } from './base/entity';
import { Preference } from './preference';
import { Profile } from './profile';

export interface User extends Entity {
  name: string;
  login: string;
  email: string;
  password?: string;
  dataNascimento?: Date | string;
  preference?: Preference | string;
  isAdmin?: boolean;
  profile?: Profile | string;
}
