import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Rekening {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nama_rekening: string;

  @Column()
  keterangan: string;

  @Column()
  type_rekening: string;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn({ onUpdate: 'CURRENT_TIMESTAMP(6)' })
  updatedAt: Date;

  @ManyToOne(() => User, (usr) => usr.id)
  user: User;
}
