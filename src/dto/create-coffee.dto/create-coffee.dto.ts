import { IsString } from 'class-validator';

export class CreateCoffeeDto {
  @IsString()
  readonly xxxxxxxxxxxxxxx  name: string;
}
