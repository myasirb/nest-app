import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';
import { CoffeeService } from '../../services/coffee/coffee.service';

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeeService: CoffeeService) {}

  // @Get()
  // getByLimit(@Query() paginationParam) {
  //   const { limit, offset } = paginationParam;
  //   return this.coffeeService.readByLimit(limit, offset);
  // }

  @Get()
  getAll() {
    return this.coffeeService.readAll();
  }

  @Get(':id') // Dynamic Route Registered
  getById(@Param('id') id: number) {
    // Controller Function with params as parameter and exacting id from it to id variable with its type
    return this.coffeeService.readById(id);
  }

  @Get('/res')
  getByRes(@Res() res) {
    res.status(200).json({ name: 'Hola' });
  }

  @Post()
  postCoffee(@Body() body) {
    return this.coffeeService.addCoffee(body);
  }

  @Patch(':id')
  updateCofee(@Param('id') id: number, @Body() body) {
    return this.coffeeService.updateCofee(id, body);
  }

  @Delete(':id')
  deleteCofee(@Param('id') id: number) {
    return this.coffeeService.deleteCofee(id);
  }
}
