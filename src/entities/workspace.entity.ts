import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Room } from "./rooms.entity";

@Entity({ schema: 'coworking', name: 'work_space' })
export class WorkSpace {
    
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Room)
  @JoinColumn({ name: 'id_rooms' })
  room: Room;

  @Column()
  row: number;

  @Column()
  columns: number;

  @Column()
  chair_number: number;

}