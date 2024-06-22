import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { WorkSpace } from "./workspace.entity";
import { User } from "./users.entity";
import { Session } from "./sessions.entity";

@Entity({ schema: 'coworking', name: 'booking' })
export class Booking {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Session)
  @JoinColumn({ name: 'id_session' })
  session: Session;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'cc_user' })
  user: User;

  @ManyToOne(() => WorkSpace)
  @JoinColumn({ name: 'id_work_space' })
  workSpace: WorkSpace;

  @Column()
  date: Date;

  @Column()
  price: number;

}