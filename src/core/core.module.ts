import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './controllers/user.controller';
import { Handlers } from './handlers';
import { Schemas } from './models/schemas/index';
import { Repositories } from './repositories';
import { Services } from './services';

@Module({
  imports: [MongooseModule.forFeature(Schemas)],
  controllers: [UserController],
  providers: [...Repositories, ...Handlers, ...Services],
})
export class CoreModule {}
