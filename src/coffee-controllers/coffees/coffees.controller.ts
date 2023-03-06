import { Controller, Get } from '@nestjs/common';

@Controller('coffees')
export class CoffeesController {
  @Get()
  getAll() {
    return 'This returns all coffees';
  }
}
