import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CoreModule } from './core/core.module';

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
