import { Entity } from './base/entity';
import { Preference } from './preference';
import { Profile } from './profile';

export interface User extends Entity {
  name: string;
  login: string;
  email: string;
  password?: string;
  dataNascimento?: Date;
  preference?: Preference;
  isAdmin?: boolean;
  profile?: Profile;
}
