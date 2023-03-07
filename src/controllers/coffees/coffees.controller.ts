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

@Controller('coffees')
export class CoffeesController {
  @Get()
  getByLimit(@Query() paginationParam) {
    const { limit, offset } = paginationParam;
    return `This Has Limit : ${limit} and offset : ${offset}`;
  }

  @Get()
  getAll() {
    return 'This returns all coffees';
  }

  @Get(':id') // Dynamic Route Registered
  getById(@Param('id') id: String) {
    // Controller Function with params as parameter and exacting id from it to id variable with its type
    return `This Returns coffee with id : ${id}`;
  }

  @Get('/res')
  getByRes(@Res() res) {
    res.status(200).json({ name: 'Hola' });
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
