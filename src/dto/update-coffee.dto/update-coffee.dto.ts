import { PartialType } from '@nestjs/swagger';
import { CreateCoffeeDto } from '../create-coffee.dto/create-coffee.dto';

// export class UpdateCoffeeDto {
//   name?: string; // ? means optional
// }

// Class which copies create dto with optional fileds
export class UpdateCoffeeDto extends PartialType(CreateCoffeeDto) {}
