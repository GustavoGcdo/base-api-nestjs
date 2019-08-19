import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { UserController } from './controllers/user.controller';
import { Handlers } from './handlers';
import { Schemas } from './models/schemas/index';
import { Repositories } from './repositories';
import { Services } from './services';
import { AuthService } from '../shared/services/auth.service';
import { JwtStrategy } from '../shared/strategies/jwt.strategy';
import { Jwt } from '../shared/constants/token';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secretOrPrivateKey: Jwt.secret,
      signOptions: {
        expiresIn: 3600,
      },
    }),
    MongooseModule.forFeature(Schemas),
  ],
  controllers: [UserController],
  providers: [
    AuthService,
    JwtStrategy,
    ...Repositories,
    ...Handlers,
    ...Services,
  ],
})
export class CoreModule {}
