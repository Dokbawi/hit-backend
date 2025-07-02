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
import { MenuCategory } from '@src/modules/menu/menu.enum'

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

  @Column()
  price: number

  @Column({
    type: 'enum',
    enum: MenuCategory,
  })
  category: MenuCategory

  @Column()
  description: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @Column({ type: 'timestamp', nullable: true })
  deletedAt: Date

  @ManyToOne(() => RestaurantEntity, (restaurant) => restaurant.menus)
  @JoinColumn({ name: 'restaurant_id' })
  restaurant: RestaurantEntity

  @OneToMany(
    () => ReservationMenuEntity,
    (reservationMenu) => reservationMenu.menu,
  )
  reservationMenus: ReservationMenuEntity[]
}
