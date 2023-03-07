import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity() // Table name would be coffee
export class Coffee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
