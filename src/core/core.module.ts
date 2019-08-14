import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { Repositories } from './repositories';
import { Services } from './services';

@Module({
  controllers: [UserController],
  providers: [...Repositories, ...Services],
})
export class CoreModule {}
