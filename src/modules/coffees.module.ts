import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config/dist';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { CoffeesController } from '../controllers/coffees/coffees.controller';
import { Coffee } from '../models/coffee.model';
import { CoffeeService } from '../services/coffees/coffee.service';
import { CommonModule } from './common/common.module';

@Module({
  imports: [TypeOrmModule.forFeature([Coffee]), ConfigModule, CommonModule],
  controllers: [CoffeesController],
  providers: [CoffeeService],
})
export class CoffeesModule {}
