import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ErrorFilter } from './shared/filters/error.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new ErrorFilter());

  const options = new DocumentBuilder()
    .setTitle('Node api with nestjs ')
    .setDescription('This is an example of a scalable api architecture using nestjs.')
    .addBearerAuth()
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('info', app, document);

  await app.listen(3000);
}
bootstrap();
