/* eslint-disable prettier/prettier */
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Produk {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  barcode: string;

  @Column()
  nama_produk: string;

  @Column()
  deskripsi_produk: string;

  @Column()
  harga_beli: number;

  @Column()
  harga_jual: number;

  @Column()
  foto: string;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn({ onUpdate: 'CURRENT_TIMESTAMP(6)' })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.id)
  user: User;
}
