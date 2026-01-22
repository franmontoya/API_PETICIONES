import { Inject, Injectable, Logger } from '@nestjs/common';
import * as mssql from 'mssql';

@Injectable()
export class PatientsService {
  private readonly logger = new Logger(PatientsService.name);
  constructor(@Inject('DB_POOL') private dbPool: mssql.ConnectionPool) {}

  async findByRut(rut: string): Promise<number | null> {
    if (!this.dbPool) {
      this.logger.warn('Database pool not configured (DB_HOST missing).');
      throw new Error('Database not configured');
    }
    try {
      const request = this.dbPool.request();
      request.input('PAC_PAC_Rut', mssql.VarChar(13), rut?.trim());
      const result = await request.execute('BD_PABELLON..MM_PAB_BuscarPorRut');
      const row = result.recordset && result.recordset[0];
      if (row && typeof row.PAC_PAC_Numero !== 'undefined' && row.PAC_PAC_Numero !== null) {
        return Number(row.PAC_PAC_Numero);
      }
      return null;
    } catch (error) {
      this.logger.error('DB query failed', error as any);
      throw error;
    }
  }
}
