import { Preference } from '../../models/entities/preference';
export interface UpdateUserDto {
  name?: string;
  login?: string;
  email?: string;
  dataNascimento?: Date;
  preference?: Preference;
  isAdmin?: boolean;
  profile?: string;
}
