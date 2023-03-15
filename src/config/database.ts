import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';
import * as dotenv from 'dotenv';

dotenv.config(); // Load .env file
export const dbconfig = {
  type: 'pgsql',
  host: process.env.DATABASE_HOST || 66.29.130.87,
  port: 5433,
  database: process.env.DATABASE_NAME || 'arnikocms',
  username: process.env.DATABASE_USER || 'arniko' ,
  password: process.env.DATABASE_PASSWORD || 'Arn!ko123',
  synchronize: false',
  autoLoadEntities: true,
  bigNumberStrings: false,
  // logging: process.env.TYPEORM_QUERY_LOGGING === 'true',
  // extra: {
  //   max: (process.env.DB_CONNECTION_POOL_MAX && parseInt(process.env.DB_CONNECTION_POOL_MAX, 10)) || 5,
  // },
} as TypeOrmModuleOptions;

export const DATABASE_URL = process.env.DATABASE_URL;
export default dbconfig;
