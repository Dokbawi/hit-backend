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
import { ReservationEntity } from '@src/entity/reservation/reservation.entity'
import { MenuEntity } from './menu.entity'
import * as bcrypt from 'bcrypt'

@Entity('restaurants')
@Index(['phone'])
@Index(['userId'])
export class RestaurantEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  userId: string

  @Column()
  password: string

  @Column()
  name: string

  @Column()
  phone: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @OneToMany(() => MenuEntity, (menu) => menu.restaurant)
  menus: MenuEntity[]

  @OneToMany(() => ReservationEntity, (reservation) => reservation.restaurant)
  reservations: ReservationEntity[]

  @BeforeInsert()
  private beforeInsert() {
    this.password = bcrypt.hashSync(this.password, 10)
  }
}
