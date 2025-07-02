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
@Index(['reservationId'], { unique: true })
@Index(['menuId'], { unique: true })
export class ReservationMenuEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ name: 'reservation_id' })
  reservationId: number

  @Column({ name: 'menu_id' })
  menuId: number

  @Column({ default: 1 })
  quantity: number

  @CreateDateColumn()
  createdAt: Date

  @ManyToOne(
    () => ReservationEntity,
    (reservation) => reservation.reservationMenus,
  )
  @JoinColumn({ name: 'reservation_id' })
  reservation: ReservationEntity

  @ManyToOne(() => MenuEntity, (menu) => menu.reservationMenus, {})
  @JoinColumn({ name: 'menu_id' })
  menu: MenuEntity
}
