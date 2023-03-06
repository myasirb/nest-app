import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('coffees')
export class CoffeesController {
  @Get()
  getAll() {
    return 'This returns all coffees';
  }

  @Get(':id') // Dynamic Route Registered
  getById(@Param('id') id: String) {
    // Controller Function with params as parameter and exacting id from it to id variable with its type
    return `This Returns coffee with id : ${id}`;
  }

  @Post()
  postCoffee(@Body() body) {
    const { name } = body;
    return name;
  }
}
