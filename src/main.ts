import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception/http-exception.filter';
import { TimeoutInterceptor } from './common/interceptors/timeout/timeout.interceptor';
import { WrapResponseInterceptor } from './common/interceptors/wrap-response/wrap-response.interceptor';
import { ParseIntPipe } from './common/pipes/parse-int/parse-int.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // If any field is not in DTO and is passed, do remove that filed and process payload
      forbidNonWhitelisted: true, // If any field is passed which is not in DTO, simply do not allow that request to be processed
      transform: true, // This helps transform the type of request payload to the type we have set4
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(
    new WrapResponseInterceptor(),
    new TimeoutInterceptor(),
  );
  // app.useGlobalPipes(new ParseIntPipe());
  await app.listen(5000);
}
bootstrap();
