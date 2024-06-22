import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ schema: 'coworking', name: 'sessions' })
export class Session {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  start_time: Date;

  @Column()
  end_time: Date;
  
}
