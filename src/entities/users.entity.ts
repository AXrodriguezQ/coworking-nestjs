import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ schema: 'coworking', name: 'users' })
export class User {

  @PrimaryGeneratedColumn()
  cc: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  phone: string;
  
}
