import { ReservationEntity } from '@src/entity/reservation/reservation.entity'
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm'

@Entity('customers')
export class CustomerEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 100 })
  @Index()
  name: string

  @Column({ length: 20, nullable: true })
  phone: string

  @Column({ length: 100, nullable: true })
  email: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @OneToMany(() => ReservationEntity, (reservation) => reservation.customer)
  reservations: ReservationEntity[]
}
