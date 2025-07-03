# HIT 프로젝트

## 1. 환경 변수 파일 예시 (env/local.env)

```
NODE_ENV = local

TYPEORM_CONNECTION = mysql
TYPEORM_HOST = localhost
TYPEORM_USERNAME = user
TYPEORM_PASSWORD = password
TYPEORM_DATABASE = main
TYPEORM_PORT = 3307
TYPEORM_SYNCHRONIZE = false
TYPEORM_DROP_SCHEMA = false
TYPEORM_ENTITIES = dist/entity/**/*.entity.{ts,js}
TYPEORM_MIGRATIONS = src/migrations/*{.ts,.js}
TYPEORM_MIGRATION_DIR = src/migrations

JWT_SECRET=your_jwt_secret

```

## 2. 기초 데이터 생성 (seed)

더미 계정, 식당, 메뉴, 예약 등 임의 데이터를 생성합니다.

```bash
npm run seed
```

- 실행 시 기존 데이터가 모두 삭제되고, 새로운 더미 데이터가 생성됩니다.
- 생성되는 데이터: 고객 3명, 식당 2곳, 각 식당별 메뉴 4개, 고객별 예약 2개씩

---

## 3. 서버 실행

```bash
npm run start:dev

```

---

## 4. E2E 테스트 실행

```bash
# e2e 테스트 (더미 데이터 자동 생성)
npm run test:e2e:setup

```

## 5. Swagger API 문서

서버 실행 후 [http://localhost:3000/api-docs](http://localhost:3000/api-docs)에서 Swagger UI로 API 명세를 확인할 수 있습니다.

---

## 6. DB

```bash
docker-compose up -d

```
