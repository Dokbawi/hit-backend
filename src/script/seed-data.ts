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

// 상수 정의
const SEED_DATA = {
  customers: [
    { name: '김철수', userId: 'customer001', password: 'password123' },
    { name: '박영희', userId: 'customer002', password: 'password123' },
    { name: '이민수', userId: 'customer003', password: 'password123' },
  ],
  restaurants: [
    { userId: 'restaurant001', name: '맛있는 중식당', phone: '02-1234-5678' },
    {
      userId: 'restaurant002',
      name: '이탈리아 피자하우스',
      phone: '02-8765-4321',
    },
  ],
  menus: {
    chinese: [
      {
        name: '짜장면',
        price: 12000,
        category: '중식',
        description: '매콤한 짜장면',
      },
      {
        name: '짬뽕',
        price: 10000,
        category: '중식',
        description: '매콤달콤한 짬뽕',
      },
      {
        name: '탕수육',
        price: 15000,
        category: '중식',
        description: '바삭한 탕수육',
      },
      {
        name: '깐풍기',
        price: 13000,
        category: '중식',
        description: '달콤한 깐풍기',
      },
    ],
    western: [
      {
        name: '마르게리타 피자',
        price: 18000,
        category: '양식',
        description: '클래식 마르게리타',
      },
      {
        name: '페퍼로니 피자',
        price: 20000,
        category: '양식',
        description: '매콤한 페퍼로니',
      },
      {
        name: '까르보나라 파스타',
        price: 16000,
        category: '양식',
        description: '크림소스 파스타',
      },
      {
        name: '샐러드',
        price: 8000,
        category: '양식',
        description: '신선한 샐러드',
      },
    ],
  },
  reservations: [
    {
      customerIndex: 0,
      restaurantIndex: 0,
      date: '2024-12-25',
      startTime: '18:00',
      endTime: '19:00',
      memberSize: 2,
      phone: '010-1111-1111',
    },
    {
      customerIndex: 0,
      restaurantIndex: 1,
      date: '2024-12-26',
      startTime: '19:00',
      endTime: '20:00',
      memberSize: 3,
      phone: '010-1111-1111',
    },
    {
      customerIndex: 1,
      restaurantIndex: 0,
      date: '2024-12-27',
      startTime: '20:00',
      endTime: '21:00',
      memberSize: 4,
      phone: '010-2222-2222',
    },
    {
      customerIndex: 1,
      restaurantIndex: 1,
      date: '2024-12-28',
      startTime: '18:30',
      endTime: '19:30',
      memberSize: 2,
      phone: '010-2222-2222',
    },
    {
      customerIndex: 2,
      restaurantIndex: 0,
      date: '2024-12-29',
      startTime: '19:30',
      endTime: '20:30',
      memberSize: 5,
      phone: '010-3333-3333',
    },
    {
      customerIndex: 2,
      restaurantIndex: 1,
      date: '2024-12-30',
      startTime: '20:30',
      endTime: '21:30',
      memberSize: 2,
      phone: '010-3333-3333',
    },
  ],
}

// 예약별 메뉴 주문 데이터 (인덱스 기반)
const RESERVATION_MENU_ORDERS = [
  // 고객1 중식당 예약
  {
    reservationIndex: 0,
    orders: [
      { menuName: '짜장면', quantity: 1 },
      { menuName: '탕수육', quantity: 1 },
    ],
  },
  // 고객1 양식당 예약
  {
    reservationIndex: 1,
    orders: [
      { menuName: '마르게리타 피자', quantity: 1 },
      { menuName: '샐러드', quantity: 1 },
    ],
  },
  // 고객2 중식당 예약
  {
    reservationIndex: 2,
    orders: [
      { menuName: '짬뽕', quantity: 2 },
      { menuName: '깐풍기', quantity: 2 },
    ],
  },
  // 고객2 양식당 예약
  {
    reservationIndex: 3,
    orders: [
      { menuName: '페퍼로니 피자', quantity: 1 },
      { menuName: '까르보나라 파스타', quantity: 1 },
    ],
  },
  // 고객3 중식당 예약
  {
    reservationIndex: 4,
    orders: [
      { menuName: '짜장면', quantity: 2 },
      { menuName: '탕수육', quantity: 2 },
      { menuName: '깐풍기', quantity: 1 },
    ],
  },
  // 고객3 양식당 예약
  {
    reservationIndex: 5,
    orders: [
      { menuName: '마르게리타 피자', quantity: 1 },
      { menuName: '까르보나라 파스타', quantity: 1 },
    ],
  },
]

// 유틸리티 함수들
const hashPassword = (password) => bcrypt.hashSync(password, 10)

const clearAllTables = async () => {
  const tables = [
    'reservation_menus',
    'reservations',
    'menus',
    'customers',
    'restaurants',
  ]
  for (const table of tables) {
    await AppDataSource.query(`DELETE FROM ${table}`)
  }
  console.log('All tables cleared')
}

const insertCustomers = async () => {
  const customers = []
  for (const customer of SEED_DATA.customers) {
    const result = await AppDataSource.query(
      'INSERT INTO customers (name, userId, password, createdAt, updatedAt) VALUES (?, ?, ?, NOW(), NOW())',
      [customer.name, customer.userId, hashPassword(customer.password)],
    )
    customers.push({ ...customer, id: result.insertId })
  }
  console.log(`✓ ${customers.length} customers created`)
  return customers
}

const insertRestaurants = async () => {
  const restaurants = []
  for (const restaurant of SEED_DATA.restaurants) {
    const result = await AppDataSource.query(
      'INSERT INTO restaurants (userId, password, name, phone, createdAt, updatedAt) VALUES (?, ?, ?, ?, NOW(), NOW())',
      [
        restaurant.userId,
        hashPassword('password123'),
        restaurant.name,
        restaurant.phone,
      ],
    )
    restaurants.push({ ...restaurant, id: result.insertId })
  }
  console.log(`✓ ${restaurants.length} restaurants created`)
  return restaurants
}

const insertMenus = async (restaurants) => {
  const allMenus = { chinese: [], western: [] }

  // 중식당 메뉴 삽입
  for (const menu of SEED_DATA.menus.chinese) {
    const result = await AppDataSource.query(
      'INSERT INTO menus (restaurantId, name, price, category, description, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, NOW(), NOW())',
      [
        restaurants[0].id,
        menu.name,
        menu.price,
        menu.category,
        menu.description,
      ],
    )
    allMenus.chinese.push({
      ...menu,
      id: result.insertId,
      restaurantId: restaurants[0].id,
    })
  }

  // 양식당 메뉴 삽입
  for (const menu of SEED_DATA.menus.western) {
    const result = await AppDataSource.query(
      'INSERT INTO menus (restaurantId, name, price, category, description, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, NOW(), NOW())',
      [
        restaurants[1].id,
        menu.name,
        menu.price,
        menu.category,
        menu.description,
      ],
    )
    allMenus.western.push({
      ...menu,
      id: result.insertId,
      restaurantId: restaurants[1].id,
    })
  }

  console.log(
    `✓ ${allMenus.chinese.length + allMenus.western.length} menus created`,
  )
  return allMenus
}

const insertReservations = async (customers, restaurants) => {
  const reservations = []
  for (const reservation of SEED_DATA.reservations) {
    const result = await AppDataSource.query(
      'INSERT INTO reservations (customerId, restaurantId, date, startTime, endTime, memberSize, phone, status, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())',
      [
        customers[reservation.customerIndex].id,
        restaurants[reservation.restaurantIndex].id,
        reservation.date,
        reservation.startTime,
        reservation.endTime,
        reservation.memberSize,
        reservation.phone,
        'CONFIRMED',
      ],
    )
    reservations.push({
      ...reservation,
      id: result.insertId,
      customerId: customers[reservation.customerIndex].id,
      restaurantId: restaurants[reservation.restaurantIndex].id,
    })
  }
  console.log(`✓ ${reservations.length} reservations created`)
  return reservations
}

const insertReservationMenus = async (reservations, menus) => {
  let totalMenuItems = 0

  for (const menuOrder of RESERVATION_MENU_ORDERS) {
    const reservation = reservations[menuOrder.reservationIndex]
    const isChineseRestaurant =
      reservation.restaurantId === reservations[0].restaurantId ||
      reservation.restaurantId === reservations[2].restaurantId ||
      reservation.restaurantId === reservations[4].restaurantId

    const menuCollection = isChineseRestaurant ? menus.chinese : menus.western

    for (const order of menuOrder.orders) {
      const menu = menuCollection.find((m) => m.name === order.menuName)
      if (!menu) {
        throw new Error(
          `Menu '${order.menuName}' not found in ${isChineseRestaurant ? 'chinese' : 'western'} collection`,
        )
      }

      await AppDataSource.query(
        'INSERT INTO reservation_menus (reservationId, menuId, quantity, createdAt) VALUES (?, ?, ?, NOW())',
        [reservation.id, menu.id, order.quantity],
      )
      totalMenuItems++
    }
  }

  console.log(`✓ ${totalMenuItems} reservation menu items created`)
}

// 메인 시드 함수
async function seedWithSQL() {
  console.log('🌱 Starting database seeding...')

  await AppDataSource.initialize()
  console.log('✓ Database connection established')

  try {
    await clearAllTables()

    const customers = await insertCustomers()
    const restaurants = await insertRestaurants()
    const menus = await insertMenus(restaurants)
    const reservations = await insertReservations(customers, restaurants)
    await insertReservationMenus(reservations, menus)

    console.log('\n🎉 Database seeding completed successfully!')
    console.log('\n📊 Summary:')
    console.log(`   • ${customers.length} customers`)
    console.log(`   • ${restaurants.length} restaurants`)
    console.log(`   • ${menus.chinese.length + menus.western.length} menus`)
    console.log(`   • ${reservations.length} reservations`)
    console.log(
      `   • ${RESERVATION_MENU_ORDERS.reduce((sum, order) => sum + order.orders.length, 0)} reservation menu items`,
    )
  } catch (error) {
    console.error('❌ Seeding failed:', error)
    throw error
  } finally {
    await AppDataSource.destroy()
    console.log('✓ Database connection closed')
  }
}

// 실행
seedWithSQL().catch(console.error)
