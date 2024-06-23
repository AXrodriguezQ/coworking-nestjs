import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Room } from "./rooms.entity";
import { Booking } from "./booking.entity";

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

  @OneToMany(() => Booking, booking => booking.workSpace)
  bookings: Booking[];

}