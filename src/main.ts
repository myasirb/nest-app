import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // If any field is not in DTO and is passed, do remove that filed and process payload
      forbidNonWhitelisted: true, // If any field is passed which is not in DTO, simply do not allow that request to be processed
      transform: true, // This helps transform the type of request payload to the type we have set
    }),
  );
  await app.listen(5000);
}
bootstrap();
