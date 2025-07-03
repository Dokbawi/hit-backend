import * as request from 'supertest'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { AppModule } from '../src/app.module'
import { execSync } from 'child_process'

describe('Reservation (e2e)', () => {
  let app: INestApplication
  let customerToken: string
  let otherCustomerToken: string
  let restaurantToken: string
  let httpServer: any
  let restaurantId: number
  let menuId: number
  let reservationId: number

  beforeAll(async () => {
    // 테스트 전에 seed 데이터 생성

    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()
    app = moduleFixture.createNestApplication()
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    )
    await app.init()
    httpServer = app.getHttpServer()

    // 식당 로그인 및 id 추출 (seed 데이터의 실제 userId 사용)
    const resR = await request(httpServer)
      .post('/auth/login/restaurant')
      .send({ userId: 'restaurant001', password: 'password123' })
    restaurantToken = resR.body.access_token
    restaurantId = resR.body.user.id

    // 고객1 로그인
    const res1 = await request(httpServer)
      .post('/auth/login/customer')
      .send({ userId: 'customer001', password: 'password123' })
    customerToken = res1.body.access_token

    // 고객2 로그인
    const res2 = await request(httpServer)
      .post('/auth/login/customer')
      .send({ userId: 'customer002', password: 'password123' })
    otherCustomerToken = res2.body.access_token

    // 더미 메뉴 생성 및 id 추출
    const menuRes = await request(httpServer)
      .post('/menu')
      .set('Authorization', `Bearer ${restaurantToken}`)
      .send({
        name: '테스트메뉴',
        price: 1000,
        category: '한식',
        description: 'desc',
      })
    menuId = menuRes.body.id

    // 정상 예약 1건 생성 (겹치기 테스트용)
    const res3 = await request(httpServer)
      .post('/reservation')
      .set('Authorization', `Bearer ${customerToken}`)
      .send({
        restaurantId,
        date: '2099-12-31',
        startTime: '18:00',
        endTime: '19:00',
        memberSize: 2,
        phone: '010-1111-1111',
        menus: [{ menuId, quantity: 1 }],
      })
    reservationId = res3.body.id
  }, 30000)

  describe('예약 생성 실패', () => {
    it('겹치는 시간', async () => {
      const res = await request(httpServer)
        .post('/reservation')
        .set('Authorization', `Bearer ${customerToken}`)
        .send({
          restaurantId,
          date: '2099-12-31',
          startTime: '18:30',
          endTime: '19:30',
          memberSize: 2,
          phone: '010-2222-2222',
          menus: [{ menuId, quantity: 1 }],
        })
      expect(res.status).toBe(400)
    })
    it('존재하지 않는 식당', async () => {
      const res = await request(httpServer)
        .post('/reservation')
        .set('Authorization', `Bearer ${customerToken}`)
        .send({
          restaurantId: 999999,
          date: '2099-12-31',
          startTime: '20:00',
          endTime: '21:00',
          memberSize: 2,
          phone: '010-3333-3333',
          menus: [{ menuId, quantity: 1 }],
        })
      expect([400, 404]).toContain(res.status)
    })
    it('존재하지 않는 메뉴', async () => {
      const res = await request(httpServer)
        .post('/reservation')
        .set('Authorization', `Bearer ${customerToken}`)
        .send({
          restaurantId,
          date: '2099-12-31',
          startTime: '20:00',
          endTime: '21:00',
          memberSize: 2,
          phone: '010-4444-4444',
          menus: [{ menuId: 999999, quantity: 1 }],
        })
      expect(res.status).toBe(400)
    })
    it('필수값 누락', async () => {
      const res = await request(httpServer)
        .post('/reservation')
        .set('Authorization', `Bearer ${customerToken}`)
        .send({ restaurantId })
      expect(res.status).toBe(400)
    })
    it('토큰 없음', async () => {
      const res = await request(httpServer)
        .post('/reservation')
        .send({
          restaurantId,
          date: '2099-12-31',
          startTime: '20:00',
          endTime: '21:00',
          memberSize: 2,
          phone: '010-5555-5555',
          menus: [{ menuId, quantity: 1 }],
        })
      expect(res.status).toBe(401)
    })
    it('잘못된 토큰', async () => {
      const res = await request(httpServer)
        .post('/reservation')
        .set('Authorization', 'Bearer wrongtoken')
        .send({
          restaurantId,
          date: '2099-12-31',
          startTime: '20:00',
          endTime: '21:00',
          memberSize: 2,
          phone: '010-6666-6666',
          menus: [{ menuId, quantity: 1 }],
        })
      expect(res.status).toBe(401)
    })
  })

  describe('예약 조회 실패', () => {
    it('토큰 없음', async () => {
      const res = await request(httpServer).get('/reservation')
      expect(res.status).toBe(401)
    })
    it('잘못된 토큰', async () => {
      const res = await request(httpServer)
        .get('/reservation')
        .set('Authorization', 'Bearer wrongtoken')
      expect(res.status).toBe(401)
    })
  })

  describe('예약 수정 실패', () => {
    it('본인 예약 아님', async () => {
      const res = await request(httpServer)
        .put(`/reservation/${reservationId}`)
        .set('Authorization', `Bearer ${otherCustomerToken}`)
        .send({ memberSize: 4 })
      expect([400, 403, 404]).toContain(res.status)
    })
    it('존재하지 않는 예약', async () => {
      const res = await request(httpServer)
        .put('/reservation/999999')
        .set('Authorization', `Bearer ${customerToken}`)
        .send({ memberSize: 4 })
      expect([400, 404]).toContain(res.status)
    })
    it('겹치는 시간', async () => {
      // 이미 예약된 시간과 겹치게 수정
      const res = await request(httpServer)
        .put(`/reservation/${reservationId}`)
        .set('Authorization', `Bearer ${customerToken}`)
        .send({ startTime: '18:30', endTime: '19:30' })
      expect(res.status).toBe(400)
    })
    it('토큰 없음', async () => {
      const res = await request(httpServer)
        .put(`/reservation/${reservationId}`)
        .send({ memberSize: 4 })
      expect(res.status).toBe(401)
    })
    it('잘못된 토큰', async () => {
      const res = await request(httpServer)
        .put(`/reservation/${reservationId}`)
        .set('Authorization', 'Bearer wrongtoken')
        .send({ memberSize: 4 })
      expect(res.status).toBe(401)
    })
  })

  describe('예약 삭제 실패', () => {
    it('본인 예약 아님', async () => {
      const res = await request(httpServer)
        .delete(`/reservation/${reservationId}`)
        .set('Authorization', `Bearer ${otherCustomerToken}`)
      expect([400, 403, 404]).toContain(res.status)
    })
    it('존재하지 않는 예약', async () => {
      const res = await request(httpServer)
        .delete('/reservation/999999')
        .set('Authorization', `Bearer ${customerToken}`)
      expect([400, 404]).toContain(res.status)
    })
    it('토큰 없음', async () => {
      const res = await request(httpServer).delete(
        `/reservation/${reservationId}`,
      )
      expect(res.status).toBe(401)
    })
    it('잘못된 토큰', async () => {
      const res = await request(httpServer)
        .delete(`/reservation/${reservationId}`)
        .set('Authorization', 'Bearer wrongtoken')
      expect(res.status).toBe(401)
    })
  })

  afterAll(async () => {
    // 생성된 예약 삭제
    await request(httpServer)
      .delete(`/reservation/${reservationId}`)
      .set('Authorization', `Bearer ${customerToken}`)
    // 생성된 메뉴 삭제
    await request(httpServer)
      .delete(`/menu/${menuId}`)
      .set('Authorization', `Bearer ${restaurantToken}`)
    await app.close()
  })
})
