import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  Index,
} from 'typeorm'
import { RestaurantEntity } from './restaurant.entity'
import { AccountRole } from '@src/modules/restaurant/restaurant.enum'

@Entity('restaurant_accounts')
@Index(['username'], {
  unique: true,
})
export class RestaurantAccountEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ name: 'restaurant_id' })
  restaurantId: number

  @Column({ length: 50 })
  username: string

  @Column({ length: 255 })
  password: string

  @Column({
    type: 'enum',
    enum: AccountRole,
    default: AccountRole.OWNER,
  })
  role: AccountRole

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @ManyToOne(() => RestaurantEntity, (restaurant) => restaurant.accounts)
  @JoinColumn({ name: 'restaurant_id' })
  restaurant: RestaurantEntity
}
