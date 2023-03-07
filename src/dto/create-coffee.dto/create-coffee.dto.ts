import { IsString } from 'class-validator';

export class CreateCoffeeDto {
  @IsString()
  readonly name: string;
}
