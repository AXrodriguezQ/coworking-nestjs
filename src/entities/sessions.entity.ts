import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Booking } from "./booking.entity"; // Asegúrate de importar la entidad Booking correctamente

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

  @OneToMany(() => Booking, booking => booking.session)
  bookings: Booking[];
}
