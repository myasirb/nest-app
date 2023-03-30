import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config/dist';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCoffeeDto } from 'src/dto/create-coffee.dto/create-coffee.dto';
import { UpdateCoffeeDto } from 'src/dto/update-coffee.dto/update-coffee.dto';
import { Repository } from 'typeorm';
import { Coffee } from '../../models/coffee.model';

@Injectable()
export class CoffeeService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
    private readonly configService: ConfigService,
  ) {
    // One Way To Get config vars
    // Other is using process.env.varName
    const DB_USER = configService.get<String>(
      'DB_USER',
      'Default here if not present in env file ',
    );

    console.log(DB_USER);
  }

  readByLimit(limit: any, offset: any) {
    return `This Has Limit : ${limit} and offset : ${offset}`;
  }

  readAll() {
    return this.coffeeRepository.find();
  }

  async readById(id: number) {
    const coffee = await this.coffeeRepository.findOneBy({ id: id });
    if (!coffee) {
      throw new HttpException('Cofee Not Found', HttpStatus.NOT_FOUND);
    }

    return coffee;
  }

  addCoffee(body: CreateCoffeeDto) {
    const coffee = this.coffeeRepository.create(body);
    this.coffeeRepository.save(coffee);
    return 'Coffee Added';
  }

  async updateCofee(id: number, body: UpdateCoffeeDto) {
    const coffee = await this.coffeeRepository.preload({ id: +id, ...body });
    if (!coffee) {
      throw new HttpException(
        'Coffee Not Found with this Id',
        HttpStatus.NOT_FOUND,
      );
    }
    this.coffeeRepository.save(coffee);
    return `This Updated Coffee with id ${id}`;
  }

  async deleteCofee(id: number) {
    const coffee = await this.coffeeRepository.findOneBy({ id: id });
    if (!coffee) {
      throw new HttpException('Cofee Not Found', HttpStatus.NOT_FOUND);
    }

    this.coffeeRepository.remove(coffee);
    return 'Coffee Removed';
  }
}
