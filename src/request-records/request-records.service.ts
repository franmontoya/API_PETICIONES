import { Inject, Injectable, Logger } from '@nestjs/common';
import * as mssql from 'mssql';

export interface RegistroSolicitud {
  PAB_SOL_Estado: string;
  PAB_SOL_HoraSolicit: string;
  PACIENTE: string;
  SER_OBJ_Codigo: string;
  PRE_PRE_Descripcio: string;
  PAB_SOL_Numero: string;
  CIRUJANO?: string;
}

@Injectable()
export class RegistrosSolicitudesService {
  private readonly logger = new Logger(RegistrosSolicitudesService.name);
  constructor(@Inject('DB_POOL') private dbPool: mssql.ConnectionPool) {}

  async buscarPorPaciente(patientNumber: string, startDate: string, endDate: string): Promise<RegistroSolicitud[] | null> {
    if (!this.dbPool) {
      this.logger.warn('Database pool not configured (DB_HOST missing).');
      throw new Error('Database not configured');
    }
    try {
      const request = this.dbPool.request();
      request.input('FechaIni', mssql.VarChar(10), startDate?.trim());
      request.input('FechaFin', mssql.VarChar(10), endDate?.trim());
      request.input('PAC_PAC_Numero', mssql.VarChar(10), patientNumber?.trim());
      
      const result = await request.execute('BD_PABELLON..MM_PAB_ConsultaPorPaciente');
      const rows = result.recordset || [];
      
      if (rows.length === 0) {
        return null;
      }

      return rows.map(row => ({
        PAB_SOL_Estado: row.PAB_SOL_Estado || null,
        PAB_SOL_HoraSolicit: row.PAB_SOL_HoraSolicit || null,
        PACIENTE: row.PACIENTE || null,
        SER_OBJ_Codigo: row.SER_OBJ_Codigo || null,
        PRE_PRE_Descripcio: row.PRE_PRE_Descripcio || null,
        PAB_SOL_Numero: row.PAB_SOL_Numero || null,
        CIRUJANO: row.CIRUJANO || null,
      }));
    } catch (error) {
      this.logger.error('DB query failed', error as any);
      throw error;
    }
  }

  async buscarPorCirujano(surgeonRut: string, startDate: string, endDate: string): Promise<RegistroSolicitud[] | null> {
    if (!this.dbPool) {
      this.logger.warn('Database pool not configured (DB_HOST missing).');
      throw new Error('Database not configured');
    }
    try {
      const request = this.dbPool.request();
      request.input('FechaIni', mssql.VarChar(10), startDate?.trim());
      request.input('FechaFin', mssql.VarChar(10), endDate?.trim());
      request.input('SER_PRO_Rut', mssql.VarChar(10), surgeonRut?.trim());
      
      const result = await request.execute('BD_PABELLON..MM_PAB_ConsultaPorCirujano');
      const rows = result.recordset || [];
      
      if (rows.length === 0) {
        return null;
      }

      return rows.map(row => ({
        PAB_SOL_Estado: row.PAB_SOL_Estado || null,
        PAB_SOL_HoraSolicit: row.PAB_SOL_HoraSolicit || null,
        PACIENTE: row.PACIENTE || null,
        SER_OBJ_Codigo: row.SER_OBJ_Codigo || null,
        PRE_PRE_Descripcio: row.PRE_PRE_Descripcio || null,
        PAB_SOL_Numero: row.PAB_SOL_Numero || null,
        CIRUJANO: row.CIRUJANO || null,
      }));
    } catch (error) {
      this.logger.error('DB query failed', error as any);
      throw error;
    }
  }

  async buscarPorPrestacion(procedureCode: string, startDate: string, endDate: string): Promise<RegistroSolicitud[] | null> {
    if (!this.dbPool) {
      this.logger.warn('Database pool not configured (DB_HOST missing).');
      throw new Error('Database not configured');
    }
    try {
      const request = this.dbPool.request();
      request.input('FechaIni', mssql.VarChar(10), startDate?.trim());
      request.input('FechaFin', mssql.VarChar(10), endDate?.trim());
      request.input('INT_INT_Codigo', mssql.VarChar(10), procedureCode?.trim());
      
      const result = await request.execute('BD_PABELLON..MM_PAB_ConsultaPorPrestacion');
      const rows = result.recordset || [];
      
      if (rows.length === 0) {
        return null;
      }

      return rows.map(row => ({
        PAB_SOL_Estado: row.PAB_SOL_Estado || null,
        PAB_SOL_HoraSolicit: row.PAB_SOL_HoraSolicit || null,
        PACIENTE: row.PACIENTE || null,
        SER_OBJ_Codigo: row.SER_OBJ_Codigo || null,
        PRE_PRE_Descripcio: row.PRE_PRE_Descripcio || null,
        PAB_SOL_Numero: row.PAB_SOL_Numero || null,
        CIRUJANO: row.CIRUJANO || null,
      }));
    } catch (error) {
      this.logger.error('DB query failed', error as any);
      throw error;
    }
  }
}
