import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  Patch,
  Delete,
} from '@nestjs/common';

@Controller('coffees')
export class CoffeesController {
  @Get()
  getAll() {
    return 'This returns all coffees';
  }

  @Get('/res')
  getByRes(@Res() res) {
    res.status(200).json({ name: 'Hola' });
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

  @Patch(':id')
  updateCofee(@Param('id') id: String, @Body() body) {
    body['type'] = 'Update';
    body['id'] = id;
    return body;
  }

  @Delete(':id')
  deleteCofee(@Param('id') id: String, @Body() body) {
    body['type'] = 'Delete';
    body['id'] = id;
    return body;
  }
}
