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
import { AuthController } from './controllers/auth.controller';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: Jwt.SECRET,
      signOptions: {
        expiresIn: Jwt.EXPIRES_TIME,
      },
    }),
    MongooseModule.forFeature(Schemas),
  ],
  controllers: [AuthController, UserController],
  providers: [
    AuthService,
    JwtStrategy,
    ...Repositories,
    ...Handlers,
    ...Services,
  ],
})
export class CoreModule {}
