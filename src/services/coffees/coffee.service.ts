import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCoffeeDto } from 'src/dto/create-coffee.dto/create-coffee.dto';
import { UpdateCoffeeDto } from 'src/dto/update-coffee.dto/update-coffee.dto';
import { Coffee } from '../../models/coffee.model';

@Injectable()
export class CoffeeService {
  private static id: number = 1;
  private coffees: Coffee[] = [
    {
      id: 1,
      name: 'tea',
    },
  ];

  readByLimit(limit: any, offset: any) {
    return `This Has Limit : ${limit} and offset : ${offset}`;
  }

  readAll() {
    return this.coffees;
  }

  readById(id: number) {
    const coffee = this.coffees.find((item) => item.id === +id);
    if (!coffee) {
      throw new HttpException('Cofee Not Found', HttpStatus.NOT_FOUND);
    }

    return coffee;
  }

  addCoffee(body: CreateCoffeeDto) {
    const { name } = body;
    this.coffees.push({ id: ++CoffeeService.id, name });
    return 'Coffee Added';
  }

  updateCofee(id: number, body: UpdateCoffeeDto) {
    return `This Updated Coffee with id ${id}`;
  }

  deleteCofee(id: number) {
    const i = this.coffees.findIndex((item) => item.id === id);
    this.coffees.splice(i, 1);
    return 'Coffee Removed';
  }
}
