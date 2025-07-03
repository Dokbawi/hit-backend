import * as request from 'supertest'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { AppModule } from '../src/app.module'
import { execSync } from 'child_process'

describe('Auth (e2e)', () => {
  let app: INestApplication
  let httpServer: any

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
  }, 30000) // 타임아웃 30초로 증가

  describe('식당 로그인 실패', () => {
    it('존재하지 않는 id', async () => {
      const res = await request(httpServer)
        .post('/auth/login/restaurant')
        .send({ userId: 'not_exist', password: 'password123' })
      expect(res.status).toBe(401)
    })
    it('비밀번호 불일치', async () => {
      const res = await request(httpServer)
        .post('/auth/login/restaurant')
        .send({ userId: 'restaurant001', password: 'wrongpw' })
      expect(res.status).toBe(401)
    })
    it('필수값 누락', async () => {
      const res = await request(httpServer)
        .post('/auth/login/restaurant')
        .send({ userId: 'restaurant001' })
      expect(res.status).toBe(400)
    })
  })

  describe('고객 로그인 실패', () => {
    it('존재하지 않는 id', async () => {
      const res = await request(httpServer)
        .post('/auth/login/customer')
        .send({ userId: 'not_exist', password: 'password123' })
      expect(res.status).toBe(401)
    })
    it('비밀번호 불일치', async () => {
      const res = await request(httpServer)
        .post('/auth/login/customer')
        .send({ userId: 'customer001', password: 'wrongpw' })
      expect(res.status).toBe(401)
    })
    it('필수값 누락', async () => {
      const res = await request(httpServer)
        .post('/auth/login/customer')
        .send({ userId: 'customer001' })
      expect(res.status).toBe(400)
    })
  })

  afterAll(async () => {
    await app.close()
  })
})
