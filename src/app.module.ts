import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/base-api', {
      useNewUrlParser: true,
    }),
    CoreModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
