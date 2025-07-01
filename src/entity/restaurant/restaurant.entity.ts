import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm'
import { ReservationEntity } from '@src/entity/reservation/reservation.entity'
import { MenuEntity } from './menu.entity'
import { RestaurantAccountEntity } from './restaurant-account.entity'

@Entity('restaurants')
export class RestaurantEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 100 })
  @Index()
  name: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @OneToMany(() => MenuEntity, (menu) => menu.restaurant, { cascade: true })
  menus: MenuEntity[]

  @OneToMany(() => ReservationEntity, (reservation) => reservation.restaurant)
  reservations: ReservationEntity[]

  @OneToMany(() => RestaurantAccountEntity, (account) => account.restaurant, {
    cascade: true,
  })
  accounts: RestaurantAccountEntity[]
}
