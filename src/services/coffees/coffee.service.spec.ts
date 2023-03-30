import { HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Coffee } from '../../models/coffee.model';
import { CoffeeService } from './coffee.service';

//Mock Repo
type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createMockRepository = <T = any>(): MockRepository<T> => ({
  findOneBy: jest.fn(),
  create: jest.fn(),
});

describe('CoffeeService', () => {
  let service: CoffeeService;
  let coffeeRepository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoffeeService,
        ConfigService,
        {
          provide: getRepositoryToken(Coffee),
          useValue: createMockRepository(),
        },
      ],
    }).compile();

    service = module.get<CoffeeService>(CoffeeService);
    coffeeRepository = module.get<MockRepository>(getRepositoryToken(Coffee));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('readById', () => {
    describe('when coffee with ID exist', () => {
      it('should return the cofee object', async () => {
        const coffeeId = 1;
        const expected = {};

        coffeeRepository.findOneBy.mockReturnValue(expected);
        const got = await service.readById(coffeeId);
        expect(got).toEqual(expected);
      });
    });

    describe('when coffee with ID does not exist', () => {
      it('should throw not found exception', async () => {
        const coffeeId = 1;
        const expected = undefined;

        coffeeRepository.findOneBy.mockReturnValue(expected);
        try {
          await service.readById(coffeeId);
        } catch (error) {
          expect(error).toBeInstanceOf(HttpException);
          expect(error.status).toEqual(HttpStatus.NOT_FOUND);
          expect(error.message).toEqual('Cofee Not Found');
        }
      });
    });
  });
});
