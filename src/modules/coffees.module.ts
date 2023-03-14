import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config/dist';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { CoffeesController } from 'src/controllers/coffees/coffees.controller';
import { Coffee } from 'src/models/coffee.model';
import { CoffeeService } from 'src/services/coffees/coffee.service';
import { CommonModule } from './common/common.module';

@Module({
  imports: [TypeOrmModule.forFeature([Coffee]), ConfigModule, CommonModule],
  controllers: [CoffeesController],
  providers: [CoffeeService],
})
export class CoffeesModule {}
