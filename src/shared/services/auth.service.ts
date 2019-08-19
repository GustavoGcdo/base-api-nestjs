import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Role } from '../../core/enums/role.enum';
import { IUserRepository } from '../../core/interfaces/repositories/userRepository.interface';
import { JwtPayload } from '../interfaces/payload/jwtPayload.interface';

@Injectable()
export class AuthService {
  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async createToken(id: string, login: string, roles: Role[]) {
    const user: JwtPayload = {
      _id: id,
      login,
      roles,
    };
    const accessToken = this.jwtService.sign(user);
    return {
      expiresIn: 3600,
      accessToken,
    };
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    const [user] = await this.userRepository.find({ _id: payload._id });
    return user;
  }
}
