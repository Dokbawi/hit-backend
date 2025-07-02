import { DataSource } from 'typeorm'
import * as bcrypt from 'bcrypt'

const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3307,
  username: 'user',
  password: 'password',
  database: 'main',
})

async function seedWithSQL() {
  await AppDataSource.initialize()

  try {
    // 기존 데이터 삭제
    await AppDataSource.query('DELETE FROM customers')
    await AppDataSource.query('DELETE FROM restaurants')

    // 고객 데이터 삽입
    const customerInserts = [
      {
        name: '김철수',
        userId: 'customer001',
        password: bcrypt.hashSync('password123', 10),
      },
      {
        name: '박영희',
        userId: 'customer002',
        password: bcrypt.hashSync('password123', 10),
      },
      {
        name: '이민수',
        userId: 'customer003',
        password: bcrypt.hashSync('password123', 10),
      },
    ]

    for (const customer of customerInserts) {
      await AppDataSource.query(
        'INSERT INTO customers (name, userId, password, createdAt, updatedAt) VALUES (?, ?, ?, NOW(), NOW())',
        [customer.name, customer.userId, customer.password],
      )
    }

    // 식당 데이터 삽입
    const restaurantInserts = [
      {
        userId: 'restaurant001',
        password: bcrypt.hashSync('password123', 10),
        name: '맛있는 한식당',
        phone: '02-1234-5678',
      },
      {
        userId: 'restaurant002',
        password: bcrypt.hashSync('password123', 10),
        name: '이탈리아 피자하우스',
        phone: '02-8765-4321',
      },
    ]

    for (const restaurant of restaurantInserts) {
      await AppDataSource.query(
        'INSERT INTO restaurants (userId, password, name, phone, createdAt, updatedAt) VALUES (?, ?, ?, ?, NOW(), NOW())',
        [
          restaurant.userId,
          restaurant.password,
          restaurant.name,
          restaurant.phone,
        ],
      )
    }

    console.log('SQL seed data created ')
  } catch (error) {
    console.error('Error:', error)
  } finally {
    await AppDataSource.destroy()
  }
}

seedWithSQL()
