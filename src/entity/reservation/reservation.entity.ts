import { ReservationStatus } from '@src/modules/reservation/reservation.enum'
import { CustomerEntity } from '@src/entity/customer/customer.entity'
import { RestaurantEntity } from '@src/entity/restaurant/restaurant.entity'
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  JoinColumn,
} from 'typeorm'
import { ReservationMenuEntity } from './reservation-menu.entity'

@Entity('reservations')
@Index(['customerId'])
@Index(['phone'])
@Index(['memberSize'])
@Index(['restaurantId', 'date', 'startTime', 'endTime'])
export class ReservationEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ name: 'customer_id' })
  customerId: number

  @Column({ name: 'restaurant_id' })
  restaurantId: number

  @Column({ type: 'date' })
  date: Date

  @Column({ type: 'time' })
  startTime: string

  @Column({ type: 'time' })
  endTime: string

  @Column({ length: 20 })
  phone: string

  @Column({ default: 1 })
  memberSize: number

  @Column({
    type: 'enum',
    enum: ReservationStatus,
    default: ReservationStatus.PENDING,
  })
  status: ReservationStatus

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @Column({ type: 'timestamp', nullable: true })
  deletedAt: Date

  @ManyToOne(() => CustomerEntity, (customer) => customer.reservations)
  @JoinColumn({ name: 'customer_id' })
  customer: CustomerEntity

  @ManyToOne(() => RestaurantEntity, (restaurant) => restaurant.reservations)
  @JoinColumn({ name: 'restaurant_id' })
  restaurant: RestaurantEntity

  @OneToMany(
    () => ReservationMenuEntity,
    (reservationMenu) => reservationMenu.reservation,
    { cascade: true },
  )
  reservationMenus: ReservationMenuEntity[]
}
