import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { Handlers } from './handlers';
import { Repositories } from './repositories';
import { Services } from './services';

@Module({
  controllers: [UserController],
  providers: [...Repositories, ...Handlers, ...Services],
})
export class CoreModule {}
