import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  Index,
  JoinColumn,
} from 'typeorm'
import { MenuEntity } from '@src/entity/restaurant/menu.entity'
import { ReservationEntity } from './reservation.entity'

@Entity('reservation_menus')
@Index(['reservationId'])
@Index(['menuId'])
@Index(['reservationId', 'menuId'], { unique: true })
export class ReservationMenuEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  reservationId: number

  @Column()
  menuId: number

  @Column({ default: 1 })
  quantity: number

  @CreateDateColumn()
  createdAt: Date

  @ManyToOne(
    () => ReservationEntity,
    (reservation) => reservation.reservationMenus,
  )
  @JoinColumn()
  reservation: ReservationEntity

  @ManyToOne(() => MenuEntity, (menu) => menu.reservationMenus)
  @JoinColumn()
  menu: MenuEntity
}
