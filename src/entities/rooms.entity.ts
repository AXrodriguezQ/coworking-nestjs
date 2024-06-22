import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ schema: 'coworking', name: 'rooms' })
export class Room {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  available: boolean;
  
}