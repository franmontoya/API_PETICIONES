import { Inject, Injectable, Logger } from '@nestjs/common';
import * as mssql from 'mssql';

export interface DatosGeneralesPaciente {
  numero_paciente: string;
  numero_ficha: string;
  rut: string;
  nombres: string;
  apellido_paterno: string;
  apellido_materno: string;
  fecha_nacimiento: string;
  fecha_fallecimiento: string;
  edad: number;
  sexo: string;
  detalle_sexo: string;
  prevision_salud: string;
  convenio: string;
  fecha_ingreso: string;
  fecha_modificacion: string;
  pasaporte: string;
  nacionalidad: string;
  id_nacionalidad: string;
  detalle_nacionalidad: string;
  direccion: string;
  telefono: string;
  codigo_region: string;
  detalle_region: string;
  codigo_provincia: string;
  detalle_provincia: string;
  codigo_comuna: string;
  detalle_comuna: string;
  fecha_ultima_verificacion_fonasa: string;
}

@Injectable()
export class InfoGeneralPacienteService {
  private readonly logger = new Logger(InfoGeneralPacienteService.name);
  constructor(@Inject('DB_POOL') private dbPool: mssql.ConnectionPool) {}

  async buscarPorRut(rut: string): Promise<DatosGeneralesPaciente | null> {
    if (!this.dbPool) {
      this.logger.warn('Database pool not configured (DB_HOST missing).');
      throw new Error('Database not configured');
    }
    try {
      const request = this.dbPool.request();
      request.input('rut', mssql.VarChar(10), rut?.trim());
      request.input('numero_paciente', mssql.Float, null);
      request.input('numero_ficha', mssql.Float, null);
      
      const result = await request.execute('API_PACIENTES_ObtenerDatosGeneralesPaciente');
      const row = result.recordset && result.recordset[0];
      
      if (row) {
        return {
          numero_paciente: row.numero_paciente || null,
          numero_ficha: row.numero_ficha || null,
          rut: row.rut || null,
          nombres: row.nombres || null,
          apellido_paterno: row.apellido_paterno || null,
          apellido_materno: row.apellido_materno || null,
          fecha_nacimiento: row.fecha_nacimiento || null,
          fecha_fallecimiento: row.fecha_fallecimiento || null,
          edad: row.edad || null,
          sexo: row.sexo || null,
          detalle_sexo: row.detalle_sexo || null,
          prevision_salud: row.prevision_salud || null,
          convenio: row.convenio || null,
          fecha_ingreso: row.fecha_ingreso || null,
          fecha_modificacion: row.fecha_modificacion || null,
          pasaporte: row.pasaporte || null,
          nacionalidad: row.nacionalidad || null,
          id_nacionalidad: row.id_nacionalidad || null,
          detalle_nacionalidad: row.detalle_nacionalidad || null,
          direccion: row.direccion || null,
          telefono: row.telefono || null,
          codigo_region: row.codigo_region || null,
          detalle_region: row.detalle_region || null,
          codigo_provincia: row.codigo_provincia || null,
          detalle_provincia: row.detalle_provincia || null,
          codigo_comuna: row.codigo_comuna || null,
          detalle_comuna: row.detalle_comuna || null,
          fecha_ultima_verificacion_fonasa: row.fecha_ultima_verificacion_fonasa || null,
        };
      }
      return null;
    } catch (error) {
      this.logger.error('DB query failed', error as any);
      throw error;
    }
  }

  async buscarPorNumeroPaciente(patientNumber: number): Promise<DatosGeneralesPaciente | null> {
    if (!this.dbPool) {
      this.logger.warn('Database pool not configured (DB_HOST missing).');
      throw new Error('Database not configured');
    }
    try {
      const request = this.dbPool.request();
      request.input('rut', mssql.VarChar(10), null);
      request.input('numero_paciente', mssql.Float, patientNumber);
      request.input('numero_ficha', mssql.Float, null);
      
      const result = await request.execute('API_PACIENTES_ObtenerDatosGeneralesPaciente');
      const row = result.recordset && result.recordset[0];
      
      if (row) {
        return {
          numero_paciente: row.numero_paciente || null,
          numero_ficha: row.numero_ficha || null,
          rut: row.rut || null,
          nombres: row.nombres || null,
          apellido_paterno: row.apellido_paterno || null,
          apellido_materno: row.apellido_materno || null,
          fecha_nacimiento: row.fecha_nacimiento || null,
          fecha_fallecimiento: row.fecha_fallecimiento || null,
          edad: row.edad || null,
          sexo: row.sexo || null,
          detalle_sexo: row.detalle_sexo || null,
          prevision_salud: row.prevision_salud || null,
          convenio: row.convenio || null,
          fecha_ingreso: row.fecha_ingreso || null,
          fecha_modificacion: row.fecha_modificacion || null,
          pasaporte: row.pasaporte || null,
          nacionalidad: row.nacionalidad || null,
          id_nacionalidad: row.id_nacionalidad || null,
          detalle_nacionalidad: row.detalle_nacionalidad || null,
          direccion: row.direccion || null,
          telefono: row.telefono || null,
          codigo_region: row.codigo_region || null,
          detalle_region: row.detalle_region || null,
          codigo_provincia: row.codigo_provincia || null,
          detalle_provincia: row.detalle_provincia || null,
          codigo_comuna: row.codigo_comuna || null,
          detalle_comuna: row.detalle_comuna || null,
          fecha_ultima_verificacion_fonasa: row.fecha_ultima_verificacion_fonasa || null,
        };
      }
      return null;
    } catch (error) {
      this.logger.error('DB query failed', error as any);
      throw error;
    }
  }

  async buscarPorFicha(fileNumber: number): Promise<DatosGeneralesPaciente | null> {
    if (!this.dbPool) {
      this.logger.warn('Database pool not configured (DB_HOST missing).');
      throw new Error('Database not configured');
    }
    try {
      const request = this.dbPool.request();
      request.input('rut', mssql.VarChar(10), null);
      request.input('numero_paciente', mssql.Float, null);
      request.input('numero_ficha', mssql.Float, fileNumber);
      
      const result = await request.execute('API_PACIENTES_ObtenerDatosGeneralesPaciente');
      const row = result.recordset && result.recordset[0];
      
      if (row) {
        return {
          numero_paciente: row.numero_paciente || null,
          numero_ficha: row.numero_ficha || null,
          rut: row.rut || null,
          nombres: row.nombres || null,
          apellido_paterno: row.apellido_paterno || null,
          apellido_materno: row.apellido_materno || null,
          fecha_nacimiento: row.fecha_nacimiento || null,
          fecha_fallecimiento: row.fecha_fallecimiento || null,
          edad: row.edad || null,
          sexo: row.sexo || null,
          detalle_sexo: row.detalle_sexo || null,
          prevision_salud: row.prevision_salud || null,
          convenio: row.convenio || null,
          fecha_ingreso: row.fecha_ingreso || null,
          fecha_modificacion: row.fecha_modificacion || null,
          pasaporte: row.pasaporte || null,
          nacionalidad: row.nacionalidad || null,
          id_nacionalidad: row.id_nacionalidad || null,
          detalle_nacionalidad: row.detalle_nacionalidad || null,
          direccion: row.direccion || null,
          telefono: row.telefono || null,
          codigo_region: row.codigo_region || null,
          detalle_region: row.detalle_region || null,
          codigo_provincia: row.codigo_provincia || null,
          detalle_provincia: row.detalle_provincia || null,
          codigo_comuna: row.codigo_comuna || null,
          detalle_comuna: row.detalle_comuna || null,
          fecha_ultima_verificacion_fonasa: row.fecha_ultima_verificacion_fonasa || null,
        };
      }
      return null;
    } catch (error) {
      this.logger.error('DB query failed', error as any);
      throw error;
    }
  }
}
