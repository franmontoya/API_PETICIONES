import { Global, Module } from '@nestjs/common';
import * as mssql from 'mssql';

@Global()
@Module({
  providers: [
    {
      provide: 'DB_POOL',
      useFactory: async () => {
            if (!process.env.DB_HOST) {
              // If no DB_HOST configured, skip creating a pool so the app can still start.
              return null;
            }
            const cfg = {
              user: process.env.DB_USER,
              password: process.env.DB_PASSWORD,
              server: process.env.DB_HOST,
              database: process.env.DB_NAME,
              options: {
                encrypt: false,
                trustServerCertificate: true,
              },
            } as mssql.config;
            const pool = await new mssql.ConnectionPool(cfg).connect();
            return pool;
      },
    },
  ],
  exports: ['DB_POOL'],
})
export class DatabaseModule {}
