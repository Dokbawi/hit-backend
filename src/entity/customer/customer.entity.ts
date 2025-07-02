import { ReservationEntity } from '@src/entity/reservation/reservation.entity'
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  BeforeInsert,
} from 'typeorm'
import * as bcrypt from 'bcrypt'

@Entity('customers')
@Index(['userId'])
export class CustomerEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  userId: string

  @Column()
  password: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @OneToMany(() => ReservationEntity, (reservation) => reservation.customer)
  reservations: ReservationEntity[]

  @BeforeInsert()
  private beforeInsert() {
    this.password = bcrypt.hashSync(this.password, 10)
  }
}
