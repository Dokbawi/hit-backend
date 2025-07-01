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
import { RestaurantEntity } from './restaurant.entity'
import { ReservationMenuEntity } from '@src/entity/reservation/reservation-menu.entity'
import { MenuCategory } from '@src/modules/restaurant/restaurant.enum'

@Entity('menus')
@Index(['restaurantId'])
@Index(['category'])
@Index(['price'])
@Index(['name'])
export class MenuEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ name: 'restaurant_id' })
  restaurantId: number

  @Column({ length: 100 })
  name: string

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number

  @Column({
    type: 'enum',
    enum: MenuCategory,
  })
  category: MenuCategory

  @Column({ type: 'text', nullable: true })
  description: string

  @Column({ default: true })
  isAvailable: boolean

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @UpdateDateColumn()
  deletedAt: Date

  @ManyToOne(() => RestaurantEntity, (restaurant) => restaurant.menus, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'restaurant_id' })
  restaurant: RestaurantEntity

  @OneToMany(
    () => ReservationMenuEntity,
    (reservationMenu) => reservationMenu.menu,
  )
  reservationMenus: ReservationMenuEntity[]
}
