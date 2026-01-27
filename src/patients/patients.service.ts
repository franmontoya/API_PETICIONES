import { Inject, Injectable, Logger } from '@nestjs/common';
import * as mssql from 'mssql';

export interface DatosPaciente {
  PAC_PAC_Nombre: string;
  PAC_PAC_ApellPater: string;
  PAC_PAC_APellMater: string;
  PAC_CAR_NumerFicha: string;
  PAC_PAC_Rut: string;
  PAC_PAC_Sexo: string;
  PAC_PAC_Prevision: string;
  PAC_PAC_TipoBenef: string;
  PAC_PAC_Edad: string;
  AÑOS: string;
  MESES: string;
  EDAD_MESES: string;
  PAC_PAC_Grupo: string;
  PAC_PAC_Sector: string;
  PAC_PAC_Color: string;
  PAC_PAC_RutResp: string;
  PAC_PAC_Clasificado: string;
  PAC_PAC_Prais: string;
  PAC_PAC_Nacionalidad: string;
}

@Injectable()
export class PatientsService {
  private readonly logger = new Logger(PatientsService.name);
  constructor(@Inject('DB_POOL') private dbPool: mssql.ConnectionPool) {}

  async buscarPorRut(rut: string): Promise<DatosPaciente | null> {
    if (!this.dbPool) {
      this.logger.warn('Database pool not configured (DB_HOST missing).');
      throw new Error('Database not configured');
    }
    try {
      const request = this.dbPool.request();
      request.input('PAC_PAC_Rut', mssql.VarChar(13), rut?.trim());
      const result = await request.execute('BD_PABELLON..MM_PAB_BuscarPorRut');
      const row = result.recordset && result.recordset[0];
      if (row) {
        return {
          PAC_PAC_Nombre: row.PAC_PAC_Nombre || null,
          PAC_PAC_ApellPater: row.PAC_PAC_ApellPater || null,
          PAC_PAC_APellMater: row.PAC_PAC_APellMater || null,
          PAC_CAR_NumerFicha: row.PAC_CAR_NumerFicha || null,
          PAC_PAC_Rut: row.PAC_PAC_Rut || null,
          PAC_PAC_Sexo: row.PAC_PAC_Sexo || null,
          PAC_PAC_Prevision: row.PAC_PAC_Prevision || null,
          PAC_PAC_TipoBenef: row.PAC_PAC_TipoBenef || null,
          PAC_PAC_Edad: row.PAC_PAC_Edad || null,
          AÑOS: row.AÑOS || null,
          MESES: row.MESES || null,
          EDAD_MESES: row.EDAD_MESES || null,
          PAC_PAC_Grupo: row.PAC_PAC_Grupo || null,
          PAC_PAC_Sector: row.PAC_PAC_Sector || null,
          PAC_PAC_Color: row.PAC_PAC_Color || null,
          PAC_PAC_RutResp: row.PAC_PAC_RutResp || null,
          PAC_PAC_Clasificado: row.PAC_PAC_Clasificado || null,
          PAC_PAC_Prais: row.PAC_PAC_Prais || null,
          PAC_PAC_Nacionalidad: row.PAC_PAC_Nacionalidad || null,
        };
      }
      return null;
    } catch (error) {
      this.logger.error('DB query failed', error as any);
      throw error;
    }
  }

  async buscarPorFicha(fileNumber: string): Promise<DatosPaciente | null> {
    if (!this.dbPool) {
      this.logger.warn('Database pool not configured (DB_HOST missing).');
      throw new Error('Database not configured');
    }
    try {
      const request = this.dbPool.request();
      request.input('PAC_CAR_NumerFicha', mssql.VarChar(13), fileNumber?.trim());
      const result = await request.execute('BD_PABELLON..MM_PAB_BuscarPorFicha');
      const row = result.recordset && result.recordset[0];
      if (row) {
        return {
          PAC_PAC_Nombre: row.PAC_PAC_Nombre || null,
          PAC_PAC_ApellPater: row.PAC_PAC_ApellPater || null,
          PAC_PAC_APellMater: row.PAC_PAC_APellMater || null,
          PAC_CAR_NumerFicha: row.PAC_CAR_NumerFicha || null,
          PAC_PAC_Rut: row.PAC_PAC_Rut || null,
          PAC_PAC_Sexo: row.PAC_PAC_Sexo || null,
          PAC_PAC_Prevision: row.PAC_PAC_Prevision || null,
          PAC_PAC_TipoBenef: row.PAC_PAC_TipoBenef || null,
          PAC_PAC_Edad: row.PAC_PAC_Edad || null,
          AÑOS: row.AÑOS || null,
          MESES: row.MESES || null,
          EDAD_MESES: row.EDAD_MESES || null,
          PAC_PAC_Grupo: row.PAC_PAC_Grupo || null,
          PAC_PAC_Sector: row.PAC_PAC_Sector || null,
          PAC_PAC_Color: row.PAC_PAC_Color || null,
          PAC_PAC_RutResp: row.PAC_PAC_RutResp || null,
          PAC_PAC_Clasificado: row.PAC_PAC_Clasificado || null,
          PAC_PAC_Prais: row.PAC_PAC_Prais || null,
          PAC_PAC_Nacionalidad: row.PAC_PAC_Nacionalidad || null,
        };
      }
      return null;
    } catch (error) {
      this.logger.error('DB query failed', error as any);
      throw error;
    }
  }
}
