import { Module } from '@nestjs/common';
import { CoffeesController } from 'src/controllers/coffees/coffees.controller';
import { CoffeeService } from 'src/services/coffees/coffee.service';

@Module({ controllers: [CoffeesController], providers: [CoffeeService] })
export class CoffeesModule {}
