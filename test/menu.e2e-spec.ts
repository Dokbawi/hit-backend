import * as request from 'supertest'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { AppModule } from '../src/app.module'
import { execSync } from 'child_process'

describe('Menu (e2e)', () => {
  let app: INestApplication
  let restaurantToken: string
  let httpServer: any
  let createdMenuIds: number[] = []

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

    // 식당 로그인 후 토큰 발급 (seed 데이터의 실제 userId 사용)
    const res = await request(httpServer)
      .post('/auth/login/restaurant')
      .send({ userId: 'restaurant001', password: 'password123' })
    restaurantToken = res.body.access_token

    // 더미 메뉴 1개 생성 (중복 테스트용)
    const menuRes = await request(httpServer)
      .post('/menu')
      .set('Authorization', `Bearer ${restaurantToken}`)
      .send({
        name: '중복메뉴',
        price: 1000,
        category: '한식',
        description: 'desc',
      })
    if (menuRes.body && menuRes.body.id) createdMenuIds.push(menuRes.body.id)
  }, 30000)

  describe('메뉴 추가 실패', () => {
    it('중복 이름', async () => {
      // 같은 이름으로 추가 시도
      const res = await request(httpServer)
        .post('/menu')
        .set('Authorization', `Bearer ${restaurantToken}`)
        .send({
          name: '중복메뉴',
          price: 2000,
          category: '한식',
          description: 'desc2',
        })
      expect(res.status).toBe(400)
    })
    it('필수값 누락', async () => {
      const res = await request(httpServer)
        .post('/menu')
        .set('Authorization', `Bearer ${restaurantToken}`)
        .send({ name: '메뉴1' })
      expect(res.status).toBe(400)
    })
    it('토큰 없음', async () => {
      const res = await request(httpServer).post('/menu').send({
        name: '메뉴2',
        price: 1000,
        category: '한식',
        description: 'desc',
      })
      expect(res.status).toBe(401)
    })
    it('잘못된 토큰', async () => {
      const res = await request(httpServer)
        .post('/menu')
        .set('Authorization', 'Bearer wrongtoken')
        .send({
          name: '메뉴3',
          price: 1000,
          category: '한식',
          description: 'desc',
        })
      expect(res.status).toBe(401)
    })
  })

  describe('메뉴 조회 실패', () => {
    it('토큰 없음', async () => {
      const res = await request(httpServer).get('/menu')
      expect(res.status).toBe(401)
    })
    it('잘못된 토큰', async () => {
      const res = await request(httpServer)
        .get('/menu')
        .set('Authorization', 'Bearer wrongtoken')
      expect(res.status).toBe(401)
    })
    it('필터 이상치(minPrice > maxPrice)', async () => {
      const res = await request(httpServer)
        .get('/menu?minPrice=5000&maxPrice=1000')
        .set('Authorization', `Bearer ${restaurantToken}`)
      expect([400, 200]).toContain(res.status)
    })
  })

  describe('메뉴 삭제 실패', () => {
    it('없는 메뉴', async () => {
      const res = await request(httpServer)
        .delete('/menu/999999')
        .set('Authorization', `Bearer ${restaurantToken}`)
      expect(res.status).toBe(400)
    })
    it('토큰 없음', async () => {
      const res = await request(httpServer).delete('/menu/1')
      expect(res.status).toBe(401)
    })
    it('잘못된 토큰', async () => {
      const res = await request(httpServer)
        .delete('/menu/1')
        .set('Authorization', 'Bearer wrongtoken')
      expect(res.status).toBe(401)
    })
  })

  afterAll(async () => {
    // 생성된 메뉴 삭제
    for (const id of createdMenuIds) {
      await request(httpServer)
        .delete(`/menu/${id}`)
        .set('Authorization', `Bearer ${restaurantToken}`)
    }
    await app.close()
  })
})
