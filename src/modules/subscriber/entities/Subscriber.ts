import { Expose } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('subscribers')
class Subscriber {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  rg: string;

  @Column({ nullable: false })
  cpf: string;

  @Column({ nullable: false })
  cep: string;

  @Column({ nullable: false })
  address: string;

  @Column({ nullable: false })
  city: string;

  @Column({ nullable: false })
  university: string;

  @Column({ nullable: false })
  phone: string;

  @Column({ type: 'varchar', nullable: true })
  membership?: string | null;

  @Column({ nullable: false })
  value: number;

  @Expose({ name: 'hasKit' })
  getHasKit(): boolean {
    if (this.value === 25) return false;
    return true;
  }

  @Column({ name: 'is_paid', default: false })
  isPaid: boolean;

  @Column({ name: 'paid_at' })
  paidAt: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

export default Subscriber;
