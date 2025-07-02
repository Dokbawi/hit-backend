import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import * as path from 'path'
import * as dotenv from 'dotenv'
import { DataSource } from 'typeorm'

const env = process.env.NODE_ENV?.trim() === 'test' ? 'test' : 'local'
const filePath = path.join(process.cwd(), `env/${env}.env`)
console.log(`Environment ${filePath}`)

export const dotEnvOptions = {
  path: filePath,
}

dotenv.config(dotEnvOptions)

export const mysqlConfig = {
  type: 'mysql',
  host: process.env.TYPEORM_HOST,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  port: parseInt(process.env.TYPEORM_PORT, 10),
  synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true',
  dropSchema: process.env.TYPEROM_DROP_SCHEMA === 'true',
  entities: [process.env.TYPEORM_ENTITIES],
  // migrations: [process.env.TYPEORM_MIGRATIONS],
  cli: {
    migrationsDir: process.env.TYPEORM_MIGRATION_DIR,
  },
} as TypeOrmModuleOptions

export const dataSource = new DataSource({
  type: 'mysql',
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  port: parseInt(process.env.TYPEORM_PORT, 10),
  synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true',
  dropSchema: process.env.TYPEROM_DROP_SCHEMA === 'true',
  entities: [process.env.TYPEORM_ENTITIES],
  migrations: [process.env.TYPEORM_MIGRATIONS],
})
