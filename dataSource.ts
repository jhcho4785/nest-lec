import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import process from 'process';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

dotenv.config({
  path:
    process.env.NODE_ENV === 'production' ? '.env' : process.env.NODE_ENV === 'test' ? '.test.env' : '.development.env',
});

const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: (process.env.DB_PORT as unknown as number) ?? 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [__dirname + '/**/*.entity.{js,ts}'],
  migrations:
    process.env.NODE_ENV === 'test'
      ? [__dirname + '/src/migrations/*-migration-test.ts']
      : [__dirname + '/src/migrations/*-migration.{js,ts}'],
  charset: 'utf8mb4_general_ci',
  synchronize: false,
  logging: true,
  dateStrings: true,
  namingStrategy: new SnakeNamingStrategy(),
});

export default dataSource;
