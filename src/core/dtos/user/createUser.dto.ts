export interface CreateUserDto {
  name: string;
  login: string;
  email: string;
  password?: string;
  dataNascimento?: Date;
  preference?: string;
  isAdmin?: boolean;
  profile?: string;
}
