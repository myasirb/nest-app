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
import { ApiForbiddenResponse } from '@nestjs/swagger';
import { ApiTags } from '@nestjs/swagger/dist';
import { Protocol } from 'src/common/decorators/protocol.decorator';
import { IsPublic } from 'src/common/decorators/public.decorator';
import { ParseIntPipe } from 'src/common/pipes/parse-int/parse-int.pipe';
import { CreateCoffeeDto } from 'src/dto/create-coffee.dto/create-coffee.dto';
import { UpdateCoffeeDto } from 'src/dto/update-coffee.dto/update-coffee.dto';
import { CoffeeService } from '../../services/coffees/coffee.service';

@ApiTags('coffees')
@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeeService: CoffeeService) {}

  // @Get()
  // getByLimit(@Query() paginationParam) {
  //   const { limit, offset } = paginationParam;
  //   return this.coffeeService.readByLimit(limit, offset);
  // }

  @ApiForbiddenResponse({ description: 'Forbidden' })
  @Get()
  @IsPublic(true)
  getAll(@Protocol('Here is the data') protocol: string) {
    console.log(protocol);
    return this.coffeeService.readAll();
  }

  @Get(':id') // Dynamic Route Registered
  // IF Only TO APPLY ON Single param
  getById(@Param('id', ParseIntPipe) id: number) {
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
