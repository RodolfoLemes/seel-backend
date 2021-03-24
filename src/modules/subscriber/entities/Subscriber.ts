import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('subscriber')
class Subscriber {
  @PrimaryGeneratedColumn()
  id: string;

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

  @Column({ nullable: true })
  membership?: string | null;

  @Column({ name: 'ticket_type', nullable: true })
  ticketType: string;

  @Column({ nullable: false })
  value: number;

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
