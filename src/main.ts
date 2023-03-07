import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    // This helps transform the type of request payload to the type we have set
    new ValidationPipe({
      transform: true,
    }),
  );
  await app.listen(5000);
}
bootstrap();
