import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Role } from '../../core/enums/role.enum';
import { IUserRepository } from '../../core/interfaces/repositories/userRepository.interface';
import { JwtPayload } from '../interfaces/payload/jwtPayload.interface';
import { User } from '../../core/models/entities/user';
import { Md5 } from 'md5-typescript';

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

  async authenticate(username: string, password: string): Promise<User> {
    const [user] = await this.userRepository.find({
      login: username,
    });

    const pass = await Md5.init(`${password}${process.env.SALT_KEY}`);

    if (pass.toString() === user.password.toString()) {
      return user;
    } else {
      return null;
    }
  }
}
