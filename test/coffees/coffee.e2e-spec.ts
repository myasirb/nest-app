import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { CoffeesModule } from '../../src/modules/coffees.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpExceptionFilter } from '../../src/common/filters/http-exception/http-exception.filter';
import { TimeoutInterceptor } from '../../src/common/interceptors/timeout/timeout.interceptor';
import { WrapResponseInterceptor } from '../../src/common/interceptors/wrap-response/wrap-response.interceptor';
import { CreateCoffeeDto } from '../../src/dto/create-coffee.dto/create-coffee.dto';
import { UpdateCoffeeDto } from 'src/dto/update-coffee.dto/update-coffee.dto';

describe('[Feature] Coffees - /coffees', () => {
  const testCoffeeObject = {
    name: 'Hot Chocolote',
  };

  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        CoffeesModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5433,
          username: 'postgres',
          password: 'pass123',
          database: 'postgres',
          autoLoadEntities: true,
          synchronize: true,
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
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

    await app.init();
  });

  // Tests
  it('Create New [Post /]', async () => {
    return request(app.getHttpServer())
      .post('/coffees')
      .send(testCoffeeObject as CreateCoffeeDto)
      .expect(201)
      .expect({ data: 'Coffee Added' });
  });

  it('Get All [Get /]', async () => {
    return request(app.getHttpServer())
      .get('/coffees')
      .expect(200)
      .expect({ data: [] });
  });

  it('Get By Id [Get /:id]', async () => {
    return request(app.getHttpServer())
      .get('/coffees/1')
      .expect(200)
      .expect({ data: { id: 1, ...testCoffeeObject } });
  });

  it('Update Coffee [Patch /:id]', async () => {
    return request(app.getHttpServer())
      .patch('/coffees/1')
      .send({ name: 'Tea' } as UpdateCoffeeDto)
      .expect(200)
      .expect({ data: 'This Updated Coffee with id 1' });
  });

  it('Delete Coffee [Delete /:id]', async () => {
    return request(app.getHttpServer())
      .delete('/coffees/1')
      .expect(200)
      .expect({ data: 'Coffee Removed' });
  });

  afterAll(async () => {
    await app.close();
  });
});
