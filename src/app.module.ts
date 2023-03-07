import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './modules/coffees.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [CoffeesModule],
})
export class AppModule {}
