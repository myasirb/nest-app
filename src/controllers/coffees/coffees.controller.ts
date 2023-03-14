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
import { IsPublic } from 'src/common/decorators/public.decorator';
import { CreateCoffeeDto } from 'src/dto/create-coffee.dto/create-coffee.dto';
import { UpdateCoffeeDto } from 'src/dto/update-coffee.dto/update-coffee.dto';
import { CoffeeService } from '../../services/coffees/coffee.service';

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeeService: CoffeeService) {}

  // @Get()
  // getByLimit(@Query() paginationParam) {
  //   const { limit, offset } = paginationParam;
  //   return this.coffeeService.readByLimit(limit, offset);
  // }

  @Get()
  @IsPublic(true)
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
  postCoffee(@Body() body: CreateCoffeeDto) {
    return this.coffeeService.addCoffee(body);
  }

  @Patch(':id')
  updateCofee(@Param('id') id: number, @Body() body: UpdateCoffeeDto) {
    return this.coffeeService.updateCofee(id, body);
  }

  @Delete(':id')
  deleteCofee(@Param('id') id: number) {
    return this.coffeeService.deleteCofee(id);
  }
}
